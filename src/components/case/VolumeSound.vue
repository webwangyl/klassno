<template>
    <div ref="container" v-resize="setVols" class="mp3-container pos-center">
        <div ref="volume" :style="computedStyle[0]" class="volume-block"></div>
        <div v-for="num in vols" :key="num" :style="computedStyle[num]" class="volume-block"></div>
    </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap';
import { nextTick, onMounted, reactive, ref } from 'vue';
import { throttle } from '../../utils';

let width = 0, height = 0, windowh = 0, prey = 0
let scale = ref(0.2)
const container = ref(null)
const volume = ref(null)

let vols = reactive([])

const computedStyle = reactive([])

const setVols = () => {
    if (volume.value) {
        height = container.value.clientHeight
        width = container.value.clientWidth
        const vol = volume.value.clientWidth
        const num = Math.min(Math.floor(width / (vol + 4)), 100)
        let i = 1
        vols.splice(0, vols.length)
        computedStyle.splice(0, computedStyle.length)
        while(i < num) {
            vols.push(i)
            computedStyle.push({
                '--min': 0,
                '--max': 0,
                '--delay': 0,
            })
            i++
        }
        computedStyle.push({
            '--min': 0,
            '--max': 0,
            '--delay': 0,
        })
    }
}

const curveFunc = (x: number, o?: number) => {
    return Math.sin(x + o) + 1
}

const getMaxHeight = (i: number) => {
    let val = curveFunc(i / 10, i * Math.random()) * height / 2 - 20
    if (val <= 0) val = 10 * Math.random()
    if (val > height) val = height
    return Math.floor(val)
}

const getMinHeight = (i: number) => {
    let val = curveFunc(i / 10, i * Math.random()) * 40 / 2 - 20
    if (val <= 20) val = 20 * (Math.random() + 1)
    if (val > height) val = height
    return Math.floor(val)
}

const transformVols = () => {
    const volsEl = gsap.utils.toArray('.volume-block')
    volsEl.forEach((el: HTMLElement, i) => {
        const max = getMaxHeight(i)
        const min = getMinHeight(i)
        const mid = (max + min) / 2
        el.setAttribute('range', Math.abs(max - mid) - 1 + '')
        el.setAttribute('init', mid + '')
        el.style.height = mid + 'px'
    })
    render()
}

const render = () => {
    const volsEl = gsap.utils.toArray('.volume-block')
    volsEl.forEach((el: HTMLElement, i) => {
        const range = Number(el.getAttribute('range')) * scale.value
        computedStyle[i]['--min'] = Number(el.getAttribute('init')) - range + 'px'
        computedStyle[i]['--max'] = Number(el.getAttribute('init')) + range + 'px'
        computedStyle[i]['--delay'] = i * 0.03 + 's'
    })
}

const changeScale = ({ y }: MouseEvent) => {
    if (prey === 0) {
        prey = y
    } else {
        const value = Math.max(Math.abs(y - prey) / windowh, 0.2)
        scale.value = Math.min(value, value)
        render()
    }
}

onMounted(() => {
    setVols()
    windowh = window.innerHeight
    nextTick(() => {
        transformVols()
        window.addEventListener('mousemove', throttle(changeScale))
    })
})
</script>

<style lang="scss">
.mp3-container {
    width: 100%;
    height: 100%;
    .volume-block {
        width: 4px;
        height: 40px;
        background-color: var(--noice-text);
        margin-right: 4px;
        animation: voice-load 1s var(--delay) infinite;
        @keyframes voice-load {
            0% {
                height: var(--min);
            }
            50% {
                height: var(--max);
            }
            100% {
                height: var(--min);
            }
        }
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
