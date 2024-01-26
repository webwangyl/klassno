import { IPoint } from './type'

function getD(a: IPoint, b: IPoint) {
    return (b.x - a.x) + (b.y - a.y)
}

class dataBase {
    arr: IPoint[] = []

    get length() {
        return this.arr.length
    }
}

export class Queue extends dataBase {
    
    take() {
        return this.arr.shift()
    }

    insert(points: IPoint | IPoint[]) {
        if (Array.isArray(points)) {
            this.arr.push(...points)
        } else {
            this.arr.push(points)
        }
    }
}

export class Stack extends dataBase {
    
    take() {
        return this.arr.pop()
    }

    insert(points: IPoint | IPoint[]) {
        if (Array.isArray(points)) {
            this.arr.push(...points)
        } else {
            this.arr.push(points)
        }
    }
}

export class Sorted extends dataBase {

    end: IPoint = { x: 0, y: 0 }

    constructor(end: IPoint) {
        super()
        this.end = end
    }
    
    take() {
        let minIndex = 0
        for(let i = 1; i < this.arr.length; i++) {
            if(getD(this.arr[i], this.end) - getD(this.arr[minIndex], this.end) < 0) {
                minIndex = i
            }
        }
        return this.arr.splice(minIndex, 1)[0]
    }

    insert(points: IPoint | IPoint[]) {
        if (Array.isArray(points)) {
            this.arr.push(...points)
        } else {
            this.arr.push(points)
        }
    }
}

// 根据（种子，行，列）生成唯一地图
export function seedToMap(seed = Date.now(), row = 10, col = 10) {
    if (typeof seed !== 'number') {
        console.warn('seed use number')
        return
    }
    if (seed < 10000000) {
        seed = seed * 1000000000
    }
    const owner = parseInt((seed + '').slice(0, 8))
    return Array.from({ length: row * col }).map((_, index) => {
        const x = index % row
        const y = Math.floor(index / row)
        const value = (owner / (x + 13) / (y + 7) * 9301 + 49297) % 233280 % 9301
        return value < 2434 ? 1 : 0
    })
}
