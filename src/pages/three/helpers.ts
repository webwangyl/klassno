// 辅助函数
import * as THREE from 'three'

// 计算与坐标轴的弧度与角度
export const calcAxisAngles = (x: number, y: number, z: number) => {
    // 弧度
    const radianX = Math.PI - Math.acos(z / Math.sqrt(y**2 + z**2))
    const radianY = Math.acos(z / Math.sqrt(x**2 + z**2))
    const radianZ = Math.PI - Math.acos(y / Math.sqrt(x**2 + y ** 2))

    // 角度
    const thetaX = (180 / Math.PI) * radianX
    const thetaY = (180 / Math.PI) * radianY
    const thetaZ = (180 / Math.PI) * radianZ
    return {
        radianX,
        radianY,
        radianZ,
        thetaX,
        thetaY,
        thetaZ
    };
}

// 计算三维坐标点与原点的距离
export const calcNodeDistance = ({ x, y, z }: THREE.Vector3) => {
    return Math.floor(Math.sqrt(x**2 + y**2 + z**2))
}

// 三维坐标转为屏幕left，top
export const vector3ToScreen = (vector3: THREE.Vector3, camera: THREE.Camera) => {
    const sv = vector3.project(camera)
    const w = window.innerWidth / 2
    const h = window.innerHeight / 2
    const left = sv.x * w + w
    const top = -sv.y * h + h
    return { left, top }
}

// 获取三维坐标经过（z方向的平移，旋转）后的坐标
export const getTransformPosition = (vector3: THREE.Vector3, rotate: THREE.Euler, d: number) => {
    const originalPosition = vector3
    const hasRotate = rotate.x > 0 || rotate.y > 0 || rotate.z > 0
    const Matrix4 = new THREE.Matrix4().makeTranslation(0, 0, hasRotate ? -d : 0).multiply(new THREE.Matrix4().makeRotationFromEuler(rotate))
    originalPosition.applyMatrix4(Matrix4)
    return originalPosition
}

export default {
    calcAxisAngles,
    calcNodeDistance,
    vector3ToScreen,
    getTransformPosition,
}
