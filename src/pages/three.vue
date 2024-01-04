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
import {Text} from 'troika-three-text'
import { throttle } from '../utils'

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
    {
        name: 'ddd',
        radius: 20,
        x: -300,
        y: 100,
        z: 0,
        label: 'ddd'
    },
]

const relations: IRelation[] = [
    { source: 'center', target: 'fff' },
    { source: 'center', target: 'ccc' },
    { source: 'center', target: 'ddd' },
    { source: 'ccc', target: 'ddd' }
]

const store = useStore()
let isMove = false;

let camera
let cameraPosition
let renderer
let scene
let controls
let curName = 'center';
let graphGroup
let _lookAt = {
    x: 0,
    y: 0,
    z: 0
}
let w
let h
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
let div: HTMLElement;
watchEffect(() => {
	theme = store.state.theme
	const app = document.documentElement
    if (scene) {
        scene.background = new THREE.Color(app.style.getPropertyValue('--color-theme'))
    }
})

const calculateAngles = (x: number, y: number, z: number) => {
    const ty = Math.acos(z / Math.sqrt(x**2 + z**2))
    const tx = Math.PI - Math.acos(z / Math.sqrt(y**2 + z**2))
    const tz = Math.PI - Math.acos(y / Math.sqrt(x**2 + y ** 2))

    // 计算与 z 轴的夹角（弧度）
    const thetaZ = Math.acos(z / Math.sqrt(x**2 + y**2 + z**2));

    return {
        thetaZ,
        tx,
        ty,
        tz
    };
}

const calcNodeDistance = (x: number, y: number, z: number) => {
    return Math.floor(Math.sqrt(x**2 + y**2 + z**2))
}

const threeToScreen = (vector3: THREE.Vector3) => {
    const sv = vector3.project(camera)
    const w = window.innerWidth / 2
    const h = window.innerHeight / 2
    const left = sv.x * w + w
    const top = -sv.y * h + h
    return { left, top }
}

const getRotatePosition = (x: number, y: number, z: number, rotate: THREE.Euler, d: number) => {
    const originalPosition = new THREE.Vector3(x, y, z)
    const hasRotate = rotate.x > 0 || rotate.y > 0 || rotate.z > 0
    const Matrix4 = new THREE.Matrix4().makeTranslation(0 ,0, hasRotate ? -d : 0).multiply(new THREE.Matrix4().makeRotationFromEuler(rotate))
    originalPosition.applyMatrix4(Matrix4)
    // console.log('旋转后坐标', originalPosition)
    return originalPosition
}

onMounted(() => {
    const app = document.documentElement
    const el: HTMLElement = document.getElementsByClassName('three')[0] as HTMLElement
    w = el.offsetWidth
    h = el.offsetHeight

    // 场景、相机、渲染器
    scene = new THREE.Scene()
    graphGroup = new THREE.Group()
    scene.background = new THREE.Color(app.style.getPropertyValue('--color-theme'))
    camera = new THREE.PerspectiveCamera(45, w/h, 1, 1000)
    camera.position.set(0, 0, 600)
    cameraPosition = camera.position
    camera.lookAt(_lookAt.x, _lookAt.y, _lookAt.z)
    TreeNode.forEach(item => {
        const node = new Node(item)
        graphGroup.add(node.mesh.node)
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
            color: '#fff',
            linewidth: 200,
            linecap: 'round'
        })
        const line = new THREE.Line(geometry, material)
        graphGroup.add(line)
    })
    scene.add(graphGroup)
    var point = new THREE.PointLight(0xffffaf);
    point.position.set(200, 200, 800); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x999999);
    scene.add(ambient);
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(w,h)
    el.appendChild(renderer.domElement)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    window.addEventListener('click', (e) => {
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
                    const angle = calculateAngles(x, y, z)
                    const d = calcNodeDistance(x, y, z)
                    gsap.to(graphGroup.position, {
                        z: -d, duration: 2
                    })
                    gsap.to(graphGroup.rotation, {
                        x: x < 0 ? -angle.tx : angle.tx, y:  y < 0 ? angle.ty : -angle.ty, z: z === 0 ? angle.tz : 0, duration: 2,
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

    window.addEventListener('mousemove', throttle((e) => {
        if (isMove) return
        mouse.x = e.clientX / renderer.domElement.clientWidth * 2 - 1
        mouse.y = -(e.clientY / renderer.domElement.clientHeight * 2) + 1
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length) {
            for (let i = 0; i < intersects.length; i++) {
                document.body.style.cursor = 'pointer'
                const { x, y, z } = intersects[i].object.position
                const { left, top } = threeToScreen(getRotatePosition(x, y, z, graphGroup.rotation, calcNodeDistance(x, y, z)))
                if (!div) {
                    div = document.createElement('div')
                    div.style.left = left + (intersects[i].object as any).radius + 'px'
                    div.style.top = top + (intersects[i].object as any).radius + 'px'
                    div.className = 'test-global'
                    document.body.appendChild(div)
                }
            }
        } else if (div) {
            document.body.removeChild(div)
            div = null;
        }
    }))

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
.test-global {
    width: 100px;
    height: 200px;
    border: 3px solid #fff;
    position: fixed;
}
</style>
