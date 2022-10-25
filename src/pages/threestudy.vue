<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue';

onMounted(() => {
    const el:HTMLElement = document.getElementsByClassName('three')[0] as HTMLElement
    const scene = new THREE.Scene() // 场景
    
    const camera = new THREE.PerspectiveCamera(75, el.offsetWidth/el.offsetHeight, 0.1, 1000)
                            // 透视摄像机     视野角度   长宽比                  近截面      远截面
    
    const renderer = new THREE.WebGLRenderer() // 渲染器
    renderer.setSize(el.offsetWidth, el.offsetHeight) // 设置大小
    el.appendChild(renderer.domElement) // 添加dom元素
    
    const geometry = new THREE.BoxGeometry() // 创建立方体
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // 材质
    const cube = new THREE.Mesh(geometry, material) // 创建网格，包含一个几何体、材质（可选）
    scene.add(cube) // 向场景添加网格，默认被添加到（0,0,0）位置，与相机位置相同，所以需要移动相机位置
    camera.position.z = 5 // 相机位置z方向+5，threejs采用右手坐标系，z轴由内向外
    
    const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff })
    const points = []
    points.push(new THREE.Vector3(-20, 10, 10))
    points.push(new THREE.Vector3(10, 20, 10))
    points.push(new THREE.Vector3(20, 10, 10)) // 定义点坐标
    const geometryLine = new THREE.BufferGeometry().setFromPoints(points) // 画线，在每一个连续顶点之间
    const line = new THREE.Line(geometryLine, materialLine)
    // scene.add(line)
    // camera.position.set(0,0,100)
    // camera.lookAt(0,0,0)

    const geometrySphere = new THREE.SphereGeometry(10, 10, 10) // 网格几何体，对一个几何体以线框形式查看
    const wireframe = new THREE.WireframeGeometry(geometrySphere)
    const wireframeLine = new THREE.LineSegments(wireframe)
    // wireframeLine.material.opacity = 0.25
    // wireframeLine.material.transparent = true
    // scene.add(wireframeLine)

    // 创建光源
    const pointLight = new THREE.PointLight(0xffffff, 1, 0) // 点光源
    pointLight.position.set(50, 50, 50)
    pointLight.castShadow = true
    scene.add(pointLight)

    const sphereLight = new THREE.HemisphereLight()
    // scene.add(sphereLight)

    const animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        // wireframeLine.rotation.x += 0.01
        // wireframeLine.rotation.y += 0.01
        renderer.render(scene, camera) // 使用渲染器渲染当前场景及相机
    }
    animate()
})
</script>

<style lang="scss">
.three {
    height: 100%;
}
</style>
