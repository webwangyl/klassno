<template>
    <div class="case-show">
        <div class="flex-1 code-space">
            <div class="code-inner info-text" @click="copy"></div>
        </div>
        <div class="flex-1">
            <Case1 v-if="activeIndex === 0"></Case1>
            <Case2 v-if="activeIndex === 1"></Case2>
            <Case3 v-if="activeIndex === 2"></Case3>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { router } from '../router'
import Case1Text from '@/components/case/RunningBall.vue?raw'
import Case1 from '@/components/case/RunningBall.vue'
import Case2Text from '@/components/case/Thunderstorm.vue?raw'
import Case2 from '@/components/case/Thunderstorm.vue'
import Case3Text from '@/components/case/DomMatrix.vue?raw'
import Case3 from '@/components/case/DomMatrix.vue'

const arr = [
    Case1Text, Case2Text, Case3Text
]

const { index } = router.currentRoute.value.query

const activeIndex = ref<number>(0)
activeIndex.value = Number(index)

const copy = () => {
    if (!document.getElementById('copyTarget')) {
        const copyTarget = document.createElement('input')
        copyTarget.setAttribute(
            'style',
            'position:fixed;top:0;left:0;opacity:0;z-index:-1000;'
        )
        copyTarget.setAttribute('id', 'copyTarget')
        document.body.appendChild(copyTarget)
    }
    const input = document.getElementById('copyTarget') as HTMLInputElement
    input.value = Case1Text
    input.select()
    document.execCommand('copy')
}

onMounted(() => {
    const el = document.querySelector('.code-inner') as HTMLElement
    el.innerText = arr[activeIndex.value]
    const icon = document.createElement('i')
    icon.className = 'copy knofont knocopy'
    el.appendChild(icon)
})

</script>

<style lang="scss">
.case-show {
    height: 100%;
    display: flex;
    overflow-x: hidden;
    .flex-1 + .flex-1 {
        border-left: 3px solid var(--placeholder-color);
    }
    .code-space {
        padding: 40px;
        height: 100%;
        position: relative;
        .code-inner {
            height: 100%;
            overflow: auto;
            background-color: var(--color-background-2);
            padding: 20px;
            cursor: pointer;
            text-indent: 0;
            .copy {
                position: absolute;
                top: 60px;
                right: 60px;
                display: none;
                font-size: 20px;
                color: var(--color-inside);
            }
        }
        .code-inner:hover .copy {
            display: block;
        }
    }
}
</style>
