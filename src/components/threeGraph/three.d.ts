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
}

export interface IRelation {
    source: string,
    target: string,
}
