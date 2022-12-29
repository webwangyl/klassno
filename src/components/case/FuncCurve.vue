<template>
    <div class="func-curve">
        <div class="show-case" v-breakup="{ classname: 'curve-text' }">000000000000000000000</div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

const funcCurve = (func: Function, range: number[], nums: number = 10, width: number) => {
    const piece = (range[1] - range[0]) / (nums - 1) // 每一个点x间隔
    const scale = width / (range[1] - range[0]) // 宽度比
    const result = []
    for (let i = 0; i < nums; i++) {
        result.push(-func(i * piece + range[0]) * scale)
    }
    return result
}

onMounted(() => {
    const el = document.querySelector('.show-case')
    console.log(el.clientWidth)
    const result = funcCurve((x: number) => Math.sin(x), [0, 2 * Math.PI], el.children.length, 100)
    console.log(result)
    for (let i = 0; i < el.children.length; i++) {
        (el.children[i] as HTMLElement).style.setProperty('transform', `translateY(${result[i]}px)`)
    }
})
</script>

<style lang="scss">
.func-curve {
    height: 100%;
    .show-case {
        margin: 100px;
    }
    .curve-text {
        display: inline-block;
    }
}
</style>
