<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import gsap from 'gsap'
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import three from '../assets/images/node.png'
import { onMounted, watchEffect } from 'vue';
import { INode, IRelation } from '../components/threeGraph/three'
import Node from '../components/threeGraph/Node'
import { useStore } from "../store";

const TreeNode: INode[] = [
    {
        name: 'center',
        radius: 40,
        wireframe: true,
        material: new THREE.MeshLambertMaterial({
            color: '#ff9100'
        }),
        label: 'test'
    },
    {
        name: 'fff',
        radius: 30,
        x: 240,
        y: 67,
        z: -200,
        label: 'fff'
    },
    {
        name: 'ccc',
        radius: 30,
        x: -200,
        y: -78,
        z: -150,
        label: 'ccc'
    },
]

const relations: IRelation[] = [
    { source: 'center', target: 'fff' },
    { source: 'center', target: 'ccc' },
]

const store = useStore()

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
let w
let h
let dbclickTimer = 0
let control = {
    speed: 0.01,
    aoMapIntensity: 0,
    emissiveIntensity: 0.3,
    lightMapIntensity: 1,
}
if (import.meta.env.MODE === 'development') {
    // let gui = new dat.GUI()
    // gui.add(control, 'speed', 0.01, 1)
    // gui.add(control, 'aoMapIntensity', 0, 1)
    // gui.add(control, 'emissiveIntensity', 0, 1)
    // gui.add(control, 'lightMapIntensity', 0, 1000)
}

let theme: string;
watchEffect(() => {
	theme = store.state.theme
	const app = document.documentElement
    if (scene) {
        scene.background = new THREE.Color(app.style.getPropertyValue('--color-theme'))
    }
})



onMounted(() => {
    const app = document.documentElement
    const el: HTMLElement = document.getElementsByClassName('three')[0] as HTMLElement
    w = el.offsetWidth
    h = el.offsetHeight

    // 场景、相机、渲染器
    scene = new THREE.Scene()
    scene.background = new THREE.Color(app.style.getPropertyValue('--color-theme'))
    camera = new THREE.PerspectiveCamera(75, w/h, 1, 1000)
    camera.position.set(0, 0, 400)
    cameraPosition = camera.position
    camera.lookAt(_lookAt.x, _lookAt.y, _lookAt.z)
    const texture = new THREE.TextureLoader().load(three)
    texture.repeat.set(2,1)
    TreeNode.forEach(item => {
        const node = new Node(item)
        scene.add(node.mesh.node)
        scene.add(node.mesh.point)
        if (item.label) {
            // el.appendChild(node.el)
        }
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
    point.position.set(0, 0, 300); //点光源位置
    // scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x999999);
    scene.add(ambient);
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(w,h)
    el.appendChild(renderer.domElement)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    window.addEventListener('click', (e) => {
        if (dbclickTimer) {
			clearTimeout(dbclickTimer);
			dbclickTimer = null;
			return;
		}
		dbclickTimer = window.setTimeout(() => {
            mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
            mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(scene.children)
            if (intersects.length) {
                const { x, y, z } = intersects[0].object.position
                if (intersects[0].object.name === 'center') {
                    gsap.to(camera.position, {
                        x: 0,y: 0,z: 400,duration: 2,
                    })
                } else {
                    gsap.to(camera.position, {
                        x: x * 2,y: y,z: z * 2,duration: 2,
                    })
                }
            }
		}, 300);
    })

    window.addEventListener('dblclick', (e) => {
        console.log(e)
        const p = document.createElement('p')
        p.innerHTML = 'asdasd'
        p.className = 'append-text'
        p.style.left = e.offsetX + 'px'
        p.style.top = e.offsetY + 'px'
        document.body.appendChild(p)
        mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
        mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length) {
            const { x, y, z } = intersects[0].object.position
            console.log(x, y, mouse)
        }
    })

    window.addEventListener('resize', () => {
        w = el.offsetWidth
        h = el.offsetHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
    })
    
    function animate() {
        camera.lookAt(0,0,0)
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
</style>
