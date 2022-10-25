<template>
    <div class="three"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import  { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue';

onMounted(() => {
    const el:HTMLElement = document.getElementsByClassName('three')[0] as HTMLElement
    const w = el.offsetWidth
    const h = el.offsetHeight
    /**
     * 创建场景对象Scene
     */
     var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
      color: 0x00ff88,
      opacity: .7,
      transparent: true,
    //   wireframe: true,
    }); //材质对象Material
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xff88,
        specular: 0x4488ee,
        shininess: 12,
    })
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中

    const cyGeometry = new THREE.CylinderGeometry(10,10,20,32)
    const cyMaterial = new THREE.MeshLambertMaterial({
        color: 0x00ff88,
          opacity: .7,
          transparent: true,
    })
    const cyMesh = new THREE.Mesh(cyGeometry, cyMaterial)
    cyMesh.position.set(0, -70, 0)
    scene.add(cyMesh)
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 相机设置
     */
    var k = w / h; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(0, 0, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    el.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    function animate() {
        mesh.rotation.y += 0.001
        mesh.rotation.x += 0.001
        renderer.render(scene, camera);
        requestAnimationFrame(animate)
    }
    animate()
    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.addEventListener('change', animate)
})
</script>

<style lang="scss">
.three {
    height: 100%;
}
</style>
