<template>
    <div class="my-collection">

    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const cateList = [
    { name: 'Official documents', key: 'documents' },
]

const websiteList = [
    { url: 'https://threejs.org/', name: 'Three.js', icon: '', cate: 'documents' }
]

onMounted(() => {
    console.log(window)
})
</script>

<style lang="scss">
.my-collection {
    height: 100%;
}
</style>
