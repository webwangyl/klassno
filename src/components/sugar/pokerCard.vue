<template>
    <div class="poker-card">
        <div class=""></div>
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
</style>
