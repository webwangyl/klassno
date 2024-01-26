
export interface IRecord {
    key?: string;
    type: 'DFS' | 'BFS' | 'AStar';
    useVisual: boolean;
    useTime: number;
    seed: string;
    road: number;
}

export class RecordList {
    data: IRecord[] = []

    constructor() {
        this.data = []
    }

    insert(record: IRecord) {
        this.data.push(record)
    }

    remove(key: string) {
        this.data = this.data.filter(item => item.key !== key)
    }

    clear() {
        this.data = []
    }
}
