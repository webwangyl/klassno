<template>
    <div class="auto-find">
        <div class="cell-container" :style="{ width: r * 20 + 1 + 'px' }">
            <div class="x axis">
                <span>0</span>
                <span>{{ r - 1 }}</span>
            </div>
            <div class="y axis">
                <span>0</span>
                <span>{{ c - 1 }}</span>
            </div>
            <Record :list="recordList.data" v-show="showRecord" @remove="remove"></Record>
            <div
                class="cell"
                v-for="(cell, index) in data"
                :key="index"
                :class="getCellClass(index)"
            >
                <i v-if="getShow(index, 'start')" class="knofont knopoker-spade"></i>
                <i v-if="getShow(index, 'end')" class="knofont knostar"></i>
            </div>
        </div>
        <Operator :searching="searching" @reset="init" @search="search" @clear="clear"></Operator>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Operator from "./autoFind/Operator.vue";
import Record from './autoFind/Record.vue'
import { RecordList } from './autoFind/record'
import { IOperator, IPoint } from "./autoFind/type";
import { Queue, Stack, Sorted, seedToMap } from './autoFind/dataStructure'
import { sleep } from '../../utils'

/**
 * 0 - init
 * 1 - wall
 * 2 - path
 * 3 - start
 * other - search
 */
const myOperator = {
    type: '',
    useVisual: true,
    seed: 0,
}

const recordList = ref(new RecordList())

const times = {
    begin: 0,
    end: 0,
}
let showRecord = ref(false);
let data = ref([]),
    r = ref(0),
    c = ref(0),
    start = { x: 0, y: 0 },
    end = { x: 0, y: 0 };
let record = null
let searching = ref(false);


const index2Point = (i: number) => {
    return { x: i % r.value, y: Math.floor(i / r.value) }
}

const point2Index = ({ x, y }: IPoint) => {
    return y * r.value + x
}

const remove = (key: string) => {
    recordList.value.remove(key)
}

const getShow = (i: number, key: string) => {
    const { x, y } = index2Point(i)
    const c = key === 'start' ? start : end
    if (x === c.x && y === c.y) {
        return true
    } else {
        return false
    }
};

const getCellClass = (i: number) => {
    let classArr = []
    data.value[i] === 2 && classArr.push('path')
    data.value[i] === 3 && classArr.push('start')
    if (myOperator.useVisual) {
        data.value[i] !== 0 && data.value[i] !== 1 && data.value[i] !== 2 && data.value[i] !== 3 && classArr.push('search')
    }
    const { x, y } = index2Point(i)
    const isEnd = x === end.x && y === end.y
    isEnd && classArr.push('end')
    data.value[i] === 1 && !isEnd && classArr.push('wall')
    return classArr
}

const checkPointInside = ({ x, y }: IPoint, pre: IPoint) => {
    const xInside = x >= 0 && x < r.value
    const yInside = y >= 0 && y < c.value
    const isInitCell = data.value[point2Index({ x, y })] === 0
    const pass = xInside && yInside && isInitCell
    if (pass) {
        data.value[point2Index({ x, y })] = pre
    }
    return xInside && yInside && isInitCell
}

const getInsertPoint = ({ x, y }: IPoint) => {
    const effectPoint = []
    const left = { x: x - 1, y }
    const top = { x, y: y - 1 }
    const right = { x: x + 1, y }
    const bottom = { x: x, y: y + 1 }
    checkPointInside(left, { x, y }) && effectPoint.push(left)
    checkPointInside(top, { x, y }) && effectPoint.push(top)
    checkPointInside(right, { x, y }) && effectPoint.push(right)
    checkPointInside(bottom, { x, y }) && effectPoint.push(bottom)
    return effectPoint
}

const getPath = async (point: IPoint) => {
    let x = point.x
    let y = point.y
    let road = 1
    while(x !== start.x || y !== start.y) {
        const i = point2Index({ x, y })
        const pre = data.value[i]
        x = pre.x
        y = pre.y
        data.value[i] = 2
        road++
        if (myOperator.useVisual) {
            await sleep(50)
        }
    }
    record = {
        ...myOperator,
        road,
        useTime: times.end - times.begin,
        key: Math.random(),
    }
    recordList.value.insert(record)
    showRecord.value = true
}

const setData = ({ row, col, startx, starty, endx, endy, dataType, visual, seed }: IOperator) => {
    if (seed) {
        myOperator.seed = parseInt(seed)
    }
    myOperator.type = dataType
    myOperator.useVisual = visual
    r.value = Math.max(Math.min(parseInt(row), 30), 5);
    c.value = Math.max(Math.min(parseInt(col), 30), 5);
    start.x = Math.max(Math.min(parseInt(startx), r.value - 1), 0)
    start.y = Math.max(Math.min(parseInt(starty), c.value - 1), 0)
    end.x = Math.max(Math.min(parseInt(endx), r.value), 0)
    end.y = Math.max(Math.min(parseInt(endy), c.value), 0)
};

const init = (operator: IOperator) => {
    showRecord.value = false
    myOperator.seed = 0
    setData(operator)
    if (!myOperator.seed) {
        myOperator.seed = parseInt(Math.random().toString().split('.')[1])
    }
    data.value = seedToMap(myOperator.seed, r.value, c.value);
    data.value[point2Index(start)] = 3
    data.value[point2Index(end)] = 0
}
const search = async (operator: IOperator) => {
    searching.value = true
    setData(operator)
    let structure
    if (myOperator.type === 'DFS') {
        structure = new Stack()
    } else if (myOperator.type === 'BFS') {
        structure = new Queue()
    } else if (myOperator.type === 'AStar') {
        structure = new Sorted(end)
    }
    times.begin = Date.now()
    structure.insert(start)
    while(structure.length) {
        const point = structure.take()
        structure.insert(getInsertPoint(point))
        if (point.x === end.x && point.y === end.y) {
            times.end = Date.now()
            getPath(point)
            searching.value = false
            break
        }
        if (myOperator.useVisual) {
            await sleep(50)
        }
    }
    searching.value = false
}
const clear = (operator: IOperator) => {
    showRecord.value = false
    setData(operator)
    data.value.forEach((el, index) => {
        if (el !== 1 && el !== 3) {
            data.value[index] = 0
        }
    })
}
</script>

<style lang="scss">
.auto-find {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    .cell-container {
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid var(--placeholder-color);
        border-left: 1px solid var(--placeholder-color);
        position: relative;
        .cell {
            width: 20px;
            height: 20px;
            border-right: 1px solid var(--placeholder-color);
            border-bottom: 1px solid var(--placeholder-color);
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 16px;
                font-weight: 600;
                color: var(--noice-text);
                &.knostar {
                    color: darkred;
                }
            }
            &.wall {
                background-color: var(--placeholder-color);
            }
            &.search {
                background-color: var(--noice-text);
            }
            &.path {
                background-color: palevioletred;
            }
            &.start {
                background-color: darkred;
            }
            &.end {
                background-color: var(--noice-text);
            }
        }
        .axis {
            position: absolute;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 100;
            color: var(--placeholder-color);
            &.x {
                top: -20px;
                left: 0;
                width: 100%;
            }
            &.y {
                top: 0;
                left: -22px;
                height: 100%;
                flex-direction: column;
                text-align: right;
            }
        }
    }
}
</style>
