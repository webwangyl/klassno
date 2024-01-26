// 基础数据

import * as THREE from 'three'
import { INode, IRelation } from "../../components/threeGraph/three"

const Sun = new THREE.TextureLoader().load(new URL('/src/assets/images/texture_1.jpg', import.meta.url).href)
const earth = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/earth.jpeg', import.meta.url).href)
const Mercury = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Mercury.jpg', import.meta.url).href)
const Venus = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Venus.jpeg', import.meta.url).href)
const Mars = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Mars.jpeg', import.meta.url).href)
const Jupiter = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Jupiter.jpeg', import.meta.url).href)
const Neptune = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Neptune.jpeg', import.meta.url).href)
const Uranus = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Uranus.jpeg', import.meta.url).href)
const Saturn = new THREE.TextureLoader().load(new URL('/src/assets/images/galaxy/Saturn.jpeg', import.meta.url).href)

// 相机位置
export const _camera_pos = {
    x: 0, y: 0, z: 2000
}

// 相机lookAt
export const _lookAt = {
    x: 0, y: 0, z: 0
}

// 节点数据
export const nodes: INode[] = [
    {
        name: '太阳',
        radius: 100,
        wireframe: true,
        material: new THREE.MeshLambertMaterial({
            map: Sun
        }),
        label: '太阳'
    },
    {
        name: '水星',
        radius: 8,
        x: 120,
        y: 10,
        z: 0,
        label: '水星',
        velocity: 0.002,
        progress: 0.2,
        points: [new THREE.Vector3(120, 0, 0), new THREE.Vector3(0, 0, 160), new THREE.Vector3(-120, 0, 0), new THREE.Vector3(0, 0, -160)],
        material: new THREE.MeshPhongMaterial({
            map: Mercury
        })
    },
    {
        name: '金星',
        radius: 20,
        x: 170,
        y: -10,
        z: 0,
        label: '金星',
        points: [new THREE.Vector3(170, 0, 0), new THREE.Vector3(0, 0, 210), new THREE.Vector3(-170, 0, 0), new THREE.Vector3(0, 0, -210)],
        velocity: 0.0016,
        progress: 0.35,
        material: new THREE.MeshPhongMaterial({
            map: Venus
        })
    },
    {
        name: '地球',
        radius: 25,
        x: 230,
        y: -20,
        z: 0,
        label: '地球',
        points: [new THREE.Vector3(230, 0, 0), new THREE.Vector3(0, 0, 270), new THREE.Vector3(-230, 0, 0), new THREE.Vector3(0, 0, -270)],
        velocity: 0.0014,
        material: new THREE.MeshPhongMaterial({
            map: earth
        })
    },
    {
        name: '火星',
        radius: 14,
        x: 290,
        y: -20,
        z: 0,
        label: '火星',
        velocity: 0.001,
        progress: 0.4,
        points: [new THREE.Vector3(290, 0, 0), new THREE.Vector3(0, 0, 330), new THREE.Vector3(-290, 0, 0), new THREE.Vector3(0, 0, -330)],
        material: new THREE.MeshPhongMaterial({
            map: Mars
        })
    },
    {
        name: '木星',
        radius: 80,
        x: 390,
        y: 30,
        z: 0,
        label: '木星',
        velocity: 0.0008,
        progress: 0.7,
        points: [new THREE.Vector3(390, 0, 0), new THREE.Vector3(0, 0, 430), new THREE.Vector3(-390, 0, 0), new THREE.Vector3(0, 0, -430)],
        material: new THREE.MeshPhongMaterial({
            map: Jupiter
        })
    },
    {
        name: '土星',
        radius: 70,
        x: 580,
        y: -30,
        z: 0,
        label: '土星',
        velocity: 0.0006,
        progress: 0.62,
        points: [new THREE.Vector3(580, 0, 0), new THREE.Vector3(0, 0, 520), new THREE.Vector3(-580, 0, 0), new THREE.Vector3(0, 0, -520)],
        material: new THREE.MeshPhongMaterial({
            map: Saturn
        })
    },
    {
        name: '天王星',
        radius: 40,
        x: 690,
        y: 40,
        z: 0,
        label: '天王星',
        velocity: 0.0004,
        progress: 0.42,
        points: [new THREE.Vector3(690, 0, 0), new THREE.Vector3(0, 0, 630), new THREE.Vector3(-690, 0, 0), new THREE.Vector3(0, 0, -630)],
        material: new THREE.MeshPhongMaterial({
            map: Uranus
        })
    },
    {
        name: '海王星',
        radius: 38,
        x: 850,
        y: -40,
        z: 0,
        label: '海王星',
        progress: 0.07,
        velocity: 0.0002,
        points: [new THREE.Vector3(850, 0, 0), new THREE.Vector3(0, 0, 790), new THREE.Vector3(-850, 0, 0), new THREE.Vector3(0, 0, -790)],
        material: new THREE.MeshPhongMaterial({
            map: Neptune
        })
    },
]

// 关系数据
export const relations: IRelation[] = [
    // { source: 'center', target: 'fff' },
    // { source: 'center', target: 'ccc' },
    // { source: '太阳', target: '地球' },
    // { source: '太阳', target: '水星' }
]

export default {
    nodes, relations, _lookAt, _camera_pos
}
