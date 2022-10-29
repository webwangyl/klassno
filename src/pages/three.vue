<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import gsap from 'gsap'
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import three from '../assets/images/node.png'
import { Material } from 'three'
import { onMounted } from 'vue';
import { INode, IRelation } from '../components/threeGraph/three'
import Node from '../components/threeGraph/Node'

const TreeNode: INode[] = [
    {
        name: 'asd',
        radius: 30,
        wireframe: true,
    },
    {
        name: 'fff',
        radius: 30,
        x: 200,
        y: 100,
        z: -200,
    },
    {
        name: 'ccc',
        radius: 30,
        x: -200,
        y: -100,
        z: -150,
    },
]

const relations: IRelation[] = [
    { source: 'asd', target: 'fff' },
    { source: 'asd', target: 'ccc' },
    { source: 'ccc', target: 'fff' },
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

let gui = new dat.GUI()

let control = {
    speed: 0.01,
    aoMapIntensity: 0,
    emissiveIntensity: 0.3,
    lightMapIntensity: 1,
}

gui.add(control, 'speed', 0.01, 1)
gui.add(control, 'aoMapIntensity', 0, 1)
gui.add(control, 'emissiveIntensity', 0, 1)
gui.add(control, 'lightMapIntensity', 0, 1000)

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
        const node = new Node(el)
        if (el.wireframe) scene.add(node.mesh.grid)
        scene.add(node.mesh.node)
    })
    relations.forEach(relation => {
        let points = []
        TreeNode.forEach(el => {
            if (el.name === relation.source) {
                points.push(new THREE.Vector3(el.x, el.y, el.z))
            }
            if (el.name === relation.target) {
                points.push(new THREE.Vector3(el.x, el.y, el.z))
            }
        })
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color: '#999999',
            linewidth: 7,
        })
        const line = new THREE.Line(geometry, material)
        scene.add(line)
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
            // gsap.to(scene.position, {
            //     x:-x,y:-y,z:-z,duration: 2,
            // })
            gsap.to(camera.position, {
                x: x * 2,y: y,z: z * 2,duration: 2,
            })
        }
    })

    function animate() {
    //     TreeNode.forEach(el => {
    //     const geometrySphere = new THREE.SphereGeometry(el.radius + 10, 16, 8) // 网格几何体，对一个几何体以线框形式查看
    //     const wireframe = new THREE.WireframeGeometry(geometrySphere)
    //     const material = new THREE.MeshLambertMaterial({
    //       color: '#ffffaf',
    //       emissive: '#ffffaf',
    //       emissiveIntensity: control.emissiveIntensity,
    //       aoMapIntensity: control.aoMapIntensity,
    //       lightMapIntensity: control.lightMapIntensity
    //     //   map: texture,
    //     })
    //     const wireframeLine = new THREE.LineSegments(wireframe)
    //     wireframeLine.position.set(el.x || 0, el.y || 0, el.z || 0)
    //     scene.add(wireframeLine)
    //     const geometry = new THREE.SphereGeometry(el.radius)
    //     const mesh = new THREE.Mesh(geometry, material)
    //     mesh.position.set(el.x || 0, el.y || 0, el.z || 0)
    //     scene.add(mesh)
    // })
        camera.lookAt(0,0,0)
        // scene.position.x += control.speed
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }
    animate()
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
