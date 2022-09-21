<template>
    <div class="sugar-bg">
        <div class="sugar-container" :style="computedStyle">
            <!-- <img
				class="logo-content"
				src="@/assets/logo.svg"
				alt=""
				@click="toHome"
			/> -->
            <PokerCard></PokerCard>
            <SalaryGrowth :theme="keyTheme"></SalaryGrowth>
            <SkillShow :theme="keyTheme"></SkillShow>
            <PowerBalance :theme="keyTheme"></PowerBalance>
            <KnowledgeGraph :theme="keyTheme"></KnowledgeGraph>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SkillShow from '../components/sugar/skillShow.vue'
import PowerBalance from '../components/sugar/powerBalance.vue';
import SalaryGrowth from '../components/sugar/salaryGrowth.vue'
import KnowledgeGraph from '../components/sugar/knowledgeGraph.vue';
import PokerCard from '../components/sugar/pokerCard.vue';
import { IKeyTheme } from '../theme/Itheme';
import { computed, reactive, watch, onMounted, onBeforeUnmount, ref } from 'vue';
import { useStore } from '../store';
import { debounce } from '../utils'
import router from '../router';

const keyTheme: IKeyTheme = reactive({
    colorTheme: '#131517',
    backgroundBlod: '#333',
    colorInside: '#fff',
    primarySecondTitle: '#e7e8e8',
    primaryText: '#d0d0d1',
    placeholderColor: '#808080',
    noiceText: '#ffe660',
})
const p0:number = 1.98 // 1920 / (1080 - 110) 1920分辨率下去掉浏览器工具栏高度保留两位小数
const w0:number = 1920
const h0:number = 970
let zoom = ref<Number>(0)

const computedZoom = () => {
    const h:number = window.innerHeight
    const w:number = window.innerWidth
    const p:number = w / h
    if (p < p0) {
        // 高度比基准比例更大
        zoom.value = w / w0
    } else {
        zoom.value = h / h0
    }
    console.log(zoom.value)
}

computedZoom()

const computedStyle = computed(() => ({
    zoom: zoom.value
}))

const store = useStore()

const theme = computed(() => store.state.theme);
watch(theme, () => {
	const app = document.documentElement
    keyTheme.colorTheme = app.style.getPropertyValue('--color-theme')
    keyTheme.backgroundBlod = app.style.getPropertyValue('--background-blod')
    keyTheme.colorInside = app.style.getPropertyValue('--color-inside')
    keyTheme.primarySecondTitle = app.style.getPropertyValue('--primary-second-title')
    keyTheme.primaryText = app.style.getPropertyValue('--primary-text')
    keyTheme.placeholderColor = app.style.getPropertyValue('--placeholder-color')
    keyTheme.noiceText = app.style.getPropertyValue('--noice-text')
})

const toHome = () => {
    router.push('/home')
}

onMounted(() => {
    window.addEventListener('resize', debounce(computedZoom))
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', debounce(computedZoom))
})
</script>

<style lang="scss" scoped>
.sugar-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}
.sugar-container {
    width: 1920px;
    height: 970px;
    display: grid;
    gap: 20px;
    // zoom: var(--zoom);
    grid-template-rows: 300px 1fr;
    grid-template-columns: 300px repeat(2, 1fr);
    padding: 12px 12px 60px;
    overflow: hidden;
    .knowledge-graph {
        grid-column-start: 2;
        grid-column-end: 4;
    }
}
</style>
