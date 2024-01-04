<template>
    <div class="case-show">
        <div class="flex-1 code-space">
            <div class="code-inner info-text" @click="copy"></div>
        </div>
        <div class="flex-1">
            <Case1 v-if="activeIndex === 0"></Case1>
            <Case2 v-if="activeIndex === 1"></Case2>
            <Case3 v-if="activeIndex === 2"></Case3>
            <div v-if="activeIndex === 3" class="pos-center">
                <div style="width: 300px;height: 500px;">
                    <Case4 v-if="activeIndex === 3"></Case4>
                </div>
            </div>
            <div v-if="activeIndex === 4" class="pos-center">
                <div style="width: 600px;height: 250px">
                    <Case5 v-if="activeIndex === 4"></Case5>
                </div>
            </div>
            <Case6 v-if="activeIndex === 5"></Case6>
            <Case7 v-if="activeIndex === 6"></Case7>
            <Case8 v-if="activeIndex === 7"></Case8>
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
import Case4Text from '@/components/case/MagicCard.vue?raw'
import Case4 from '@/components/case/MagicCard.vue'
import Case5Text from '@/components/case/VolumeSound.vue?raw'
import Case5 from '@/components/case/VolumeSound.vue'
import Case6Text from '@/components/case/StarNight.vue?raw'
import Case6 from '@/components/case/StarNight.vue'
import Case7Text from '@/components/case/MutiLayer.vue?raw'
import Case7 from '@/components/case/MutiLayer.vue'
import Case8Text from '@/components/case/ColorTriangle.vue?raw'
import Case8 from '@/components/case/ColorTriangle.vue'

const arr = [
    Case1Text, Case2Text, Case3Text, Case4Text, Case5Text, Case6Text, Case7Text, Case8Text
]

let activeIndex = ref<number>(0)

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
    const { index } = router.currentRoute.value.query
    activeIndex.value = Number(index)
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
        flex-shrink: 0;
        .code-inner {
            height: 100%;
            overflow: auto;
            background-color: var(--color-background-2);
            padding: 20px;
            cursor: pointer;
            text-indent: 0;
            white-space: break-spaces;
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
