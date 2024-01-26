<template>
    <div class="circle-layout">
        <div class="layout-container">
            <div v-for="i in [1,2,3,4, 5, 6]" :key="i" class="card"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'


</script>

<style lang="scss">
.circle-layout {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .layout-container {
        width: 400px;
        height: 400px;
        border-radius: 50%;
        border: 1px solid #fff;
        display: flex;
        justify-content: center;
        position: relative;
        .card {
            @include circle-image;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--color-theme);
            transform-origin: center 200px;
            position: absolute;
        }
        .card:nth-child(2) {
            transform: rotate(60deg);
        }
        .card:nth-child(3) {
            transform: rotate(120deg);
        }
        .card:nth-child(4) {
            transform: rotate(180deg);
        }
        .card:nth-child(5) {
            transform: rotate(240deg);
        }
        .card:nth-child(6) {
            transform: rotate(300deg);
        }
    }
}
</style>
