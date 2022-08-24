<template>
    <div class="container" v-if="mainShow">
        <div class="header">
            <div class="logo">logo</div>
            <div class="tab" @click="expandTab" @mouseenter="getGridTransform" @mouseleave="reverseGridTransform">
                导航
                <div class="icon"></div>
            </div>
        </div>
        <div class="main">
            <RouterView></RouterView>
        </div>
    </div>
    <div v-else class="menu">
        <div>菜单</div>
        <div>菜单</div>
        <div>菜单</div>
        <div>菜单</div>
        <div>菜单</div>
        <div @click="expandTab">返回</div>
    </div>
    <div class="grid">
        <div class="parallax" style="transform: translateY(0)">
            <div class="line horizontal" style="transform: translateY(-15px)"></div>
            <div class="line horizontal" style="transform: translateY(318px)"></div>
            <div class="line horizontal" style="transform: translateY(651px)"></div>
            <div class="line horizontal" style="transform: translateY(984px)"></div>
            <div class="line horizontal" style="transform: translateY(1317px)"></div>
            <div class="line horizontal" style="transform: translateY(1650px)"></div>
            <div class="line horizontal" style="transform: translateY(1983px)"></div>
            <div class="line horizontal" style="transform: translateY(2316px)"></div>
            <div class="line horizontal" style="transform: translateY(2649px)"></div>
            <div class="line horizontal" style="transform: translateY(2982px)"></div>
            <div class="line horizontal" style="transform: translateY(3315px)"></div>
            <div class="line horizontal" style="transform: translateY(3648px)"></div>
        </div>
        <div class="line vertical" style="transform: translateX(193px)"></div>
        <div class="line vertical" style="transform: translateX(526px)"></div>
        <div class="line vertical" style="transform: translateX(859px)"></div>
        <div class="line vertical" style="transform: translateX(1192px)"></div>
        <div class="line vertical" style="transform: translateX(1525px)"></div>
        <div class="line vertical" style="transform: translateX(1826px)"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
let mainShow = ref<boolean>(true)
const expandTab = () => {
    mainShow.value = !mainShow.value
}
let horizontalY = []
let verticalX = []
let horizontal:HTMLCollection
let vertical:HTMLCollection
let tl = gsap.timeline()
onMounted(() => {
    horizontal = document.getElementsByClassName('horizontal')
    vertical = document.getElementsByClassName('vertical')
    Array.from(horizontal).forEach(el => {
        const rect = el.getBoundingClientRect()
        horizontalY.push(rect.y)
    })
    Array.from(vertical).forEach(el => {
        const rect = el.getBoundingClientRect()
        verticalX.push(rect.x)
    })
})
const getGridTransform = (e: MouseEvent) => {
    const { width, height, x, y } = (e.target as HTMLElement).getBoundingClientRect()
    const yIndex = []
    const xIndex = []
    try {
        horizontalY.forEach((el, index) => {
            if (el >= y) {
                yIndex.push(index - 1)
                yIndex.push(index)
                throw new Error()
            }
        })
    } catch (error) {}
    try {   
        verticalX.forEach((el, index) => {
            if (el >= x) {
                xIndex.push(index - 1)
                xIndex.push(index)
                throw new Error()
            }
        })
    } catch (error) {}
    console.log(horizontal[yIndex[0]],horizontalY[yIndex[0]])
    const offsetx = x + width + 20
    const offsety = y + height + 20
    tl.to(vertical[xIndex[0]], { translateX: x - 20, duration: .5 })
    tl.to(vertical[xIndex[1]], { translateX: offsetx, duration: .5 }, '<')
    tl.to(horizontal[yIndex[0]], { translateY: y - 20, duration: .5 }, '<')
    tl.to(horizontal[yIndex[1]], { translateY: offsety, duration: .5 }, '<')
}
const reverseGridTransform = () => {
    tl.reverse()
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .header {
        height: 120px;
        width: 100%;
        padding: 0 60px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            color: $color-inside;
            font-size: 16px;
        }
        .tab {
            cursor: pointer;
            color: $color-inside;
            height: 40px;
            line-height: 40px;
            .icon {
                width: 22px;
                height: 16px;
                display: inline-block;
                vertical-align: middle;
                background-color: $color-inside;
            }
        }
    }
    .main {
        flex: 1;
        width: 100%;
        padding-bottom: 50px;
    }
}
.menu {
    color: $color-inside;
}
.grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    pointer-events: none;
    opacity: 0.8;
    transition: opacity 0.3s;
    will-change: transform;
    .parallax {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        will-change: transform;
        .line.horizontal {
            height: 1px;
            width: 100vw;
            left: 0;
        }
    }
    .line {
        position: absolute;
        opacity: 0.2;
        transition: transform .6s cubic-bezier(.75, 0, .25, 1);
        background-color: $color-inside;
    }
    .vertical {
        left: 0;
        width: 1px;
        height: 100vh;
    }
}
</style>