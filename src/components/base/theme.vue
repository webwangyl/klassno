<template>
    <p class="" @click="choose">Theme</p>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

const dark = [
    { key: '--color-theme', value: '#131517' }
]

const choose = () => {

}

onMounted(() => {
    const app = document.getElementById('app') as HTMLElement
    dark.forEach(item => {
        app.style.setProperty(item.key, item.value)
    })
})
</script>

<style></style>