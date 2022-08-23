<template>
    <div class="container" v-if="mainShow">
        <div class="header">
            <div class="logo">logo</div>
            <div class="tab" @click="expandTab">
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
let mainShow = ref<boolean>(true)
const expandTab = () => {
    mainShow.value = !mainShow.value
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
        height: 60px;
        width: 100%;
        padding: 0 20px;
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
</style>