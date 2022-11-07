<template>
    <div class="case-show">
        <div class="flex-1">{{ code }}</div>
        <div class="flex-1">
            <Case1></Case1>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '../store'
import { router } from '../router'
import Case1Text from '@/components/case/RunningBall.vue?raw'
import Case1 from '@/components/case/RunningBall.vue'

console.log(Case1Text)

const store = useStore()
const caseList = store.state.caseList

const { index } = router.currentRoute.value.query

const activeIndex = ref<number>(0)
activeIndex.value = Number(index)

const code = ref<string>('')
console.log(JSON.stringify(Case1Text, null, 4))
code.value = JSON.parse(JSON.stringify(Case1Text, null, 4))
</script>

<style lang="scss">
.case-show {
    height: 100%;
    display: flex;
    .flex-1 + .flex-1 {
        border-left: 3px solid var(--placeholder-color);
    }
}
</style>
