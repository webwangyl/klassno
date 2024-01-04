<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect } from 'vue';
import * as THREE from 'three'
import gsap from 'gsap'
import { nodes, relations, _lookAt, _camera_pos } from './data'
import { calcAxisAngles, calcNodeDistance, vector3ToScreen, getTransformPosition } from './helpers'

import Node from '../../components/threeGraph/Node'
import { useStore } from "../../store";
import { throttle } from '../../utils'
import useEventListener from '../../hooks/useEventListener'
// import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'
// import three from '@/assets/images/node.png'
// import { INode, IRelation } from '../../components/threeGraph/three'



const store = useStore()
let isMove = false;

let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
// let controls
let graphGroup: THREE.Group;

let w = 0
let h = 0

// let control = {
//     speed: 0.01,
//     aoMapIntensity: 0,
//     emissiveIntensity: 0.3,
//     lightMapIntensity: 1,
// }
// if (import.meta.env.MODE === 'development') {
//     let gui = new dat.GUI()
//     gui.add(control, 'speed', 0.01, 1)
//     gui.add(control, 'aoMapIntensity', 0, 1)
//     gui.add(control, 'emissiveIntensity', 0, 1)
//     gui.add(control, 'lightMapIntensity', 0, 1000)
// }

let theme: string;
let div: HTMLElement | null = null;
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

watchEffect(() => {
	theme = store.state.theme
	const app = document.documentElement
    if (scene) {
        scene.background = new THREE.Color(app.style.getPropertyValue('--color-theme'))
    }
})

// 初始化windows参数
const initWindowsParam = () => {
    const app = document.documentElement
    const el = document.getElementsByClassName('three')[0] as HTMLElement
    w = el.offsetWidth
    h = el.offsetHeight
    return { app, el }
}

// 初始化三维世界
const initThreeWorld = (app: HTMLElement, el: HTMLElement) => {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(app.style.getPropertyValue('--color-theme'))
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 2000)
    camera.position.set(_camera_pos.x, _camera_pos.y, _camera_pos.z)
    camera.lookAt(_lookAt.x, _lookAt.y, _lookAt.z)
    const point = new THREE.PointLight(0xffffaf);
    point.position.set(200, 200, 800)
    scene.add(point)
    const ambient = new THREE.AmbientLight(0x999999);
    scene.add(ambient);
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(w, h)
    el.appendChild(renderer.domElement)
    return { scene, camera, point, ambient, renderer }
}

// 加载数据，绘图
const loadData = (scene: THREE.Scene) => {
    graphGroup = new THREE.Group()
    nodes.forEach(item => {
        const node = new Node(item)
        graphGroup.add(node.mesh.node)
    })
    relations.forEach(relation => {
        let points: THREE.Vector3[] = []
        nodes.forEach(el => {
            if (el.name === relation.source) {
                points.push(new THREE.Vector3(el.x, el.y, el.z))
            }
            if (el.name === relation.target) {
                points.push(new THREE.Vector3(el.x, el.y, el.z))
            }
        })
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color: '#fff',
            linewidth: 200,
            linecap: 'round'
        })
        const line = new THREE.Line(geometry, material)
        graphGroup.add(line)
    })
    scene.add(graphGroup)
}

useEventListener(window, 'click', (e: MouseEvent) => {
    if (isMove) return
    mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
    mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length) {
        for (let i = 0; i < intersects.length; i++) {
            const el = intersects[i];
            const { x, y, z } = el.object.position
            isMove = true
            if (el.object.name === 'center') {
                gsap.to(graphGroup.position, {
                    x: 0, y: 0, z: 0, duration: 2,
                    onComplete:() => {
                        isMove = false
                    }
                })
                gsap.to(graphGroup.rotation, {
                    x: 0,y: 0,z: 0,duration: 2,
                })
            } else {
                const angle = calcAxisAngles(x, y, z)
                const d = calcNodeDistance(new THREE.Vector3(x, y, z))
                gsap.to(graphGroup.position, {
                    z: -d, duration: 2
                })
                gsap.to(graphGroup.rotation, {
                    x: x < 0 ? -angle.radianX : angle.radianX, y:  y < 0 ? angle.radianY : -angle.radianY, z: z === 0 ? angle.radianZ : 0, duration: 2,
                    onComplete: () => {
                        isMove = false;
                    }
                })
            }
            document.body.style.cursor = 'default'
            if (div) {
                document.body.removeChild(div)
                div = null;
            }
        }
    }
})

useEventListener(window, 'resize', () => {
    if (document) {
        const el = document.getElementsByClassName('three')[0] as HTMLElement
        w = el.offsetWidth
        h = el.offsetHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
    }
})

useEventListener(window, 'mousemove', throttle((e: MouseEvent) => {
    if (isMove) return
    mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
    mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length) {
        if (div) return
        for (let i = 0; i < intersects.length; i++) {
            document.body.style.cursor = 'pointer'
            const { x, y, z } = intersects[i].object.position
            const { left, top } = vector3ToScreen(getTransformPosition(new THREE.Vector3(x, y, z), graphGroup.rotation, calcNodeDistance(new THREE.Vector3(x, y, z))), camera)
            div = document.createElement('div')
            div.style.left = left + (intersects[i].object as any).radius + 'px'
            div.style.top = top + (intersects[i].object as any).radius + 'px'
            div.className = 'test-global'
            div.innerHTML = (intersects[i].object as any).label
            document.body.appendChild(div)
        }
    } else if (div) {
        document.body.style.cursor = 'default'
        document.body.removeChild(div)
        div = null;
    }
}))

onMounted(() => {
    const { app, el } = initWindowsParam()
    const { scene } = initThreeWorld(app, el)
    loadData(scene)
    
    function animate() {
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
    .three-text {
        position: fixed;
        z-index: 100;
        transform: translate(-50%, -50%);
    }
}
.append-text {
    color: #fff;
    position: absolute;
}
.test-global {
    width: 100px;
    height: 200px;
    border: 3px solid #fff;
    position: fixed;
    color: #fff;
}
</style>
