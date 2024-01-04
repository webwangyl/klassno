// 基础数据

import * as THREE from 'three'
import { INode, IRelation } from "../../components/threeGraph/three"

// 相机位置
export const _camera_pos = {
    x: 0, y: 0, z: 600
}

// 相机lookAt
export const _lookAt = {
    x: 0, y: 0, z: 0
}

// 节点数据
export const nodes: INode[] = [
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

// 关系数据
export const relations: IRelation[] = [
    { source: 'center', target: 'fff' },
    { source: 'center', target: 'ccc' },
    { source: 'center', target: 'ddd' },
    { source: 'ccc', target: 'ddd' }
]

export default {
    nodes, relations, _lookAt, _camera_pos
}
