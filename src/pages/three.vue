<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import three from '../assets/images/node.png'
import { Material } from 'three'
import { onMounted } from 'vue';

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

onMounted(() => {
    const el: HTMLElement = document.getElementsByClassName('three')[0] as HTMLElement
    const w = el.offsetWidth
    const h = el.offsetHeight

    // 场景、相机、渲染器
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w/h, 1, 1000)
    camera.position.set(0, 0, 400)
    camera.lookAt(scene.position)
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
    const renderer = new THREE.WebGLRenderer()
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
            camera.position.set(x, y, z + 400)
        }
    })

    const animate = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }
    animate()
    
})
</script>

<style lang="scss">
.three {
    height: 100%;
}
</style>
