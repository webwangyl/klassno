<template>
    <div ref="mutiLayer" class="muti-layer">
        <p class="noice-text noice-position" v-html="'scroll'"></p>
        <div class="grow">
            <span class="grow-background"></span>
            <span class="triangle"></span>
        </div>
        <div class="cc">
            <div ref="layers" v-for="item in layerList" :key="item.depth" :data-depth="item.depth" :style="{ backgroundImage: `url(${required(item.src)})` }" class="t"></div>
        </div>
        <div class="hh"></div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import throttle from '../../utils/throttle'

const mutiLayer = ref(null)
const layers = ref(null)
const layerList = [
    { src: 'ilu_bg.jpeg', depth: 0.9 },
    { src: 'ilu_03.png', depth: 0.7 },
    { src: 'ilu_02.png', depth: 0.5 },
    { src: 'ilu_man.png', depth: 0.3 },
    { src: 'ilu_overlay.png', depth: 0.2 },
    { src: 'ilu_01.png', depth: 0 },
]

const required = (icon: string) => {
  return new URL(`/src/assets/images/case7/${icon}`, import.meta.url).href
}

const cutLayer = (e: Event) => {
    layers.value.forEach((el: HTMLElement) => {
        const depth = parseFloat(el.dataset.depth)
        el.style.transform = `translateY(${depth * (e.target as HTMLElement).scrollTop}px)`
    })
}

const f = throttle(cutLayer)

onMounted(() => {
    if (mutiLayer.value.scrollHeight > mutiLayer.value.clientHeight) {
        mutiLayer.value.addEventListener('scroll', f)
    }
})

onBeforeUnmount(() => {
    mutiLayer.value.removeEventListener('scroll', f)
})
</script>

<style lang="scss">
.muti-layer {
    height: 100%;
    position: relative;
    overflow: auto;
    .noice-position {
        position: absolute;
        z-index: 999;
        right: 110px;
        bottom: 150px;
    }
    .grow {
        height: 120px;
        right: 100px;
        bottom: 100px;
        z-index: 999;
    }
    .hh {
        height: 100vh;
        background-color: #140e0b;
        position: relative;
        z-index: 200;
    }
    .cc {
        height: 100vh;
        width: 100%;
        position: relative;
    }
    .t {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        background-repeat: no-repeat;
        background-position: bottom center;
    }
}
</style>
