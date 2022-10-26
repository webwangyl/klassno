<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import three from '../assets/images/node.png'
import { Material } from 'three'
import { onMounted } from 'vue';
import  * as TWEEN from '@tweenjs/tween.js'

export interface INode {
    name: string,
    radius?: number,
    material?: Material,
    id?: string | number,
    color?: number,
    x?: number,
    y?: number,
    z?: number,
}

const TreeNode: INode[] = [
    {
        name: 'asd',
        radius: 60,
    },
    {
        name: 'fff',
        radius: 60,
        x: 200,
        y: 100,
        z: -200,
    },
    {
        name: 'fff',
        radius: 60,
        x: -200,
        y: -100,
        z: -150,
    },
]

let camera
let cameraPosition
let renderer
let scene
let controls
let _lookAt = {
    x: 0,
    y: 0,
    z: 0
}
let preLookAt = JSON.parse(JSON.stringify(_lookAt))

// const setCamera = (dx1, dy1, dz1, dx2, dy2, dz2) => {
//     camera.position.x = dx1
//     camera.position.y = dy1
//     camera.position.z = dz1
//     camera.lookAt(dx2, dy2, dz2)
//     renderer.render(scene, camera)
// }

// const renderScene = () => {
// 	TWEEN.update();
// 	orbit.update();
// 	// 使用requestAnimationFrame函数进行渲染
// 	requestAnimationFrame(renderScene);
// 	renderer.render(scene, camera);
// }

const transformCamera = (source1, target1, source2, target2) => {
    var tween = new TWEEN.Tween({
        x1: source1.x,
        y1: source1.y,
        z1: source1.z,
        x2: source2.x,
        y2: source2.y,
        zz: source2.z,
    })
    tween.to({
        x1: target1.x,
        y1: target1.y,
        z1: target1.z,
        x2: target2.x,
        y2: target2.y,
        zz: target2.z,
    }, 3000)
    tween.onUpdate(function () {
        camera.position.x = this.x1
        camera.position.y = this.y1
        camera.position.z = this.z1
        controls.target.x = this.x2
        controls.target.y = this.y2
        controls.target.z = this.z2
        controls.update()
    })
    tween.easing(TWEEN.Easing.Cubic.InOut)
    tween.start()
    // console.log(tween)
    // const dx1 = (target1.x - source1.x) / (60 * 3)
    // const dy1 = (target1.y - source1.y) / (60 * 3)
    // const dz1 = (target1.z - source1.z) / (60 * 3)
    // const dx2 = (target2.x - source2.x) / (60 * 3)
    // const dy2 = (target2.y - source2.y) / (60 * 3)
    // const dz2 = (target2.z - source2.z) / (60 * 3)
    // let time = 1
    // const timer = setInterval(() => {
    //     setCamera(time * dx1, time * dy1, time * dz1, time * dx2, time * dy2, time * dz2)
    //     time++
    // }, 16.67)
    // setTimeout(() => {
    //     clearInterval(timer)
    // }, 3000)
}

const move = (x: number, y: number, z:number) => {
    const source1 = camera.position // 相机的变幻
    const source2 = JSON.parse(JSON.stringify(preLookAt)) // 视野方向的变幻
    const target2 = { x, y, z }
    const flagx = x > source2.x
    const flagy = y > source2.y
    const flagz = z > source2.z
    const dx = flagx ? x - 400 : x + 400
    const dy = flagy ? y - 400 : y + 400
    const dz = flagz ? z - 400 : z + 400
    const target1 = { x: dx, y: dy, z: dz }
    transformCamera(source1, target1, source2, target2)
}

onMounted(() => {
    const el: HTMLElement = document.getElementsByClassName('three')[0] as HTMLElement
    const w = el.offsetWidth
    const h = el.offsetHeight

    // 场景、相机、渲染器
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, w/h, 1, 1000)
    camera.position.set(0, 0, 400)
    cameraPosition = camera.position
    camera.lookAt(_lookAt.x, _lookAt.y, _lookAt.z)
    const texture = new THREE.TextureLoader().load(three)
    texture.repeat.set(2,1)
    TreeNode.forEach(el => {
        const geometrySphere = new THREE.SphereGeometry(el.radius + 10, 16, 8) // 网格几何体，对一个几何体以线框形式查看
        const wireframe = new THREE.WireframeGeometry(geometrySphere)
        const material = new THREE.MeshLambertMaterial({
          color: 0xffffaf,
        //   map: texture,
        })
        const wireframeLine = new THREE.LineSegments(wireframe)
        wireframeLine.position.set(el.x || 0, el.y || 0, el.z || 0)
        scene.add(wireframeLine)
        const geometry = new THREE.SphereGeometry(el.radius)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(el.x || 0, el.y || 0, el.z || 0)
        scene.add(mesh)
    })
    var point = new THREE.PointLight(0xffffaf);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(w,h)
    el.appendChild(renderer.domElement)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    window.addEventListener('click', (e) => {
        mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
        mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length) {
            const { x, y, z } = intersects[0].object.position
            move(x, y, z)
        }
    })

    renderer.render(scene, camera)
    // controls = new OrbitControls(camera, renderer.domElement)
    // controls.autoRotate = true
    // controls.addEventListener('change', () => {
    //     renderer.render(scene, camera)
    // })
})
</script>

<style lang="scss">
.three {
    height: 100%;
}
</style>
