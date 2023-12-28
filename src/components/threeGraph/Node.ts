import { INode } from "./three";
import Text from './Text'
import * as THREE from "three";

export default function (node: INode) {
	this.name = node.name;
	this.id = node.id || node.name;
	this.x = node.x || 0;
	this.y = node.y || 0;
	this.z = node.z || 0;
	this.radius = node.radius || 20;
	this.wireframe = node.wireframe || false;
	this.color = node.color || "#1890ff";
	this.mesh = {};
    let material = node.material
    if (!node.material) {
        let v = `
            varying vec3 vNormal;
                void main() {
                    //将attributes的normal通过varying赋值给了向量vNormal
                vNormal = normal;
                    //projectionMatrix是投影变换矩阵 modelViewMatrix是相机坐标系的变换矩阵
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, position.z, 1.0 );
            }
        `;
        let f = `
            //片元着色器同样需要定义varying vec3 vNormal；
            varying vec3 vNormal;
            void main() {
                //vNormal是一个已经归一化的三维向量
                float pr = (vNormal.x + 0.1) / 4.0; //pr红色通道值范围为0~1
                float pg = (vNormal.y + 0.1) / 2.0; //pg绿色通道值范围为0~1
                float pb = (vNormal.z + 0.5) / 1.0; //pb蓝色通道值范围为0~1
                gl_FragColor=vec4(pr, 0, pb, 1.0); //最后设置顶点颜色，点与点之间会自动插值
            }
        `;
        material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 2.0 },
                resolution: { value: new THREE.Vector2() },
            },
            vertexShader: v,
            fragmentShader: f,
        });
        // material = new THREE.MeshLambertMaterial({
        //     color: this.color
        // })
    }
    // if (node.label) {
    //     const loader = new THREE.FontLoader()
    //     loader.load('/json/helvetiker_regular.typeface.json', (font) => {
    //         const geometry = new THREE.TextGeometry( 'Hello three.js!', {
    //             font: font,
    //             size: 80,
    //             height: 40,
    //         });
    //         this.mesh.label = new THREE.Mesh(geometry)
    //         this.mesh.label.position.set(this.x, this.y - this.radius, this.z)
    //     })
    //     const text = new Text(node.label, { name: this.name, x: this.x, y: this.y })
    //     this.el = text.el
    // }
    this.mesh.point = new THREE.PointLight(0xffffaf);
    this.mesh.point.position.set(this.x, this.y, this.z); //点光源位置
    const sphereGeometry = new THREE.SphereGeometry(this.radius);
    this.mesh.node = new THREE.Mesh(sphereGeometry, material);
    this.mesh.node.name = this.name;
    this.mesh.node.position.set(this.x, this.y, this.z);
}
