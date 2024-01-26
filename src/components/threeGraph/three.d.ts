export interface INode {
    name: string,
    label?: string,
    radius?: number,
    material?: Material,
    id?: string | number,
    color?: number,
    x?: number,
    y?: number,
    z?: number,
    wireframe?: boolean,
    points?: THREE.Vector3[],
    velocity?: number,
    progress?: number,
}

export interface IRelation {
    source: string,
    target: string,
    name?: string,
    color?: number,
}
