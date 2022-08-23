<template>
    <div class="welcome">
        <p class="welcome-text" @click="changeAudio">开启沉浸式体验</p>
        <p class="ignore-text" @click="toHome">下次一定！</p>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store'
import { onMounted } from 'vue'
import { router } from '../router'
const store = useStore()
let timer = null
const changeAudio = () => {
    store.commit('SET_STATUS', !store.state.audioStatus)
    toHome()
}
const toHome = () => {
    if (timer) clearTimeout(timer)
    router.replace('/home')
}
onMounted(() => {
    timer = setTimeout(() => {
        router.replace('/home')
    }, 3000)
})
</script>

<style lang="scss" scoped>
.welcome-text {
    font-size: 40px;
    color: $primary-first-title;
    cursor: pointer;
    margin-bottom: 16px;
}
.ignore-text {
    font-size: 12px;
    color: $primary-text;
    cursor: pointer;
    text-align: center;
}
</style>
