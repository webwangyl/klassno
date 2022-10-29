import { INode } from './three'
import * as THREE from 'three'

export default function(node: INode) {
    this.name = node.name
    this.id = node.id || node.name
    this.x = node.x || 0
    this.y = node.y || 0
    this.z = node.z || 0
    this.radius = node.radius || 20
    this.wireframe = node.wireframe || false
    this.color = node.color || '#ffffaf'
    this.mesh = {}
    if (this.wireframe === true) {
        const wireframeGeometry = new THREE.SphereGeometry(this.radius + 10, 16, 8)
        const wireframe = new THREE.WireframeGeometry(wireframeGeometry)
        this.mesh.grid = new THREE.LineSegments(wireframe)
        this.mesh.grid.position.set(this.x, this.y, this.z)
    }
    const sphereGeometry = new THREE.SphereGeometry(this.radius)
    const material = new THREE.MeshLambertMaterial({
        color: this.color
    })
    this.mesh.node = new THREE.Mesh(sphereGeometry, material)
    this.mesh.node.position.set(this.x, this.y, this.z)
}
