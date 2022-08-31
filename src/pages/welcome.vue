<template>
    <div class="welcome">
        <Smoke class="smoke">
            <p class="welcome-text" @mouseenter="onenter('.welcome-text')" @mouseleave="onleave('.welcome-text')" @click="changeAudio">开启沉浸式体验</p>
        </Smoke>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store'
import { onMounted } from 'vue'
import { router } from '../router'
import gsap from 'gsap'
import Smoke from '@/components/base/smoke.vue'
const store = useStore()
let timer = null
const tl = gsap.timeline()
const changeAudio = () => {
    store.commit('SET_STATUS', true)
    toHome()
}
const toHome = () => {
    if (timer) clearTimeout(timer)
    router.replace('/home')
}
const onenter = (classname: string) => {
    gsap.to(classname, { background: 'radial-gradient(closest-side, #fff 0%, #fffa 40%, #fff0 100%)', duration: .3 })
}
const onleave = (classname: string) => {
    gsap.to(classname, { background: 'none', duration: 0 })
}
onMounted(() => {
    tl.from('.smoke', { opacity: 0, duration: 2, ease: 'slow' })
    .to('.smoke', { opacity: 1, duration: 2, ease: 'none' }, '>-0.5')
    .to('.text-area', { opacity: 0.6, duration: 2 }, '>-4')
    .to('.text-area', { opacity: 1, duration: 1 })
})
</script>

<style lang="scss" scoped>
.welcome {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.welcome-text {
    font-size: 40px;
    color: var(--color-inside);
    cursor: pointer;
    margin-bottom: 16px;
    text-align: center;
}
.ignore-text {
    font-size: 12px;
    color: var(--primary-text);
    cursor: pointer;
    text-align: center;
}
</style>
