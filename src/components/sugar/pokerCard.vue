<template>
    <div class="poker-card">
        <div class="shape-row"></div>
        <div class="shape-row"></div>
        <div class="shape-col"></div>
        <div class="shape-col"></div>
        <div class="pocker-cut normal">
            <span class="cut-num">7</span>
            <i class="knofont knopoker-spade"></i>
        </div>
        <div class="pocker-cut reverse">
            <span class="cut-num">7</span>
            <i class="knofont knopoker-spade"></i>
        </div>
        <img class="header-img" src="@/assets/images/blog/header.jpeg" />
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.poker-card {
    width: 200px;
    height: 300px;
    border: 1px solid var(--placeholder-color);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pocker-cut {
        position: absolute;
        color: red;
        .cut-num {
            font-size: 12px;
            zoom: 0.8;
            position: absolute;
        }
        .knofont {
            font-size: 24px;
            margin: 4px;
        }
    }
    .pocker-cut.normal {
        left: 6px;
        top: 6px;
    }
    .pocker-cut.reverse {
        right: 6px;
        bottom: 6px;
        transform: rotate(180deg);
    }
    .header-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-top: 12px;
    }
}
.shape-row:nth-child(1) {
    width: 100%;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right,var(--placeholder-color) 40%, var(--noice-text));
}
.shape-row:nth-child(2) {
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to left,var(--placeholder-color) 40%, var(--noice-text));
}
.shape-col:nth-child(3) {
    height: 100%;
    width: 1px;
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(to top, var(--placeholder-color) 40%, var(--noice-text));
}
.shape-col:nth-child(4) {
    height: 100%;
    width: 1px;
    position: absolute;
    right: 0;
    top: 0;
    background-image: linear-gradient(var(--placeholder-color) 40%, var(--noice-text));
}
</style>
