<template>
    <div class="sugar-container">
        <SkillShow :theme="keyTheme"></SkillShow>
        <PokerCard></PokerCard>
        <PowerBalance :theme="keyTheme"></PowerBalance>
        <SalaryGrowth :theme="keyTheme"></SalaryGrowth>
        <KnowledgeGraph :theme="keyTheme"></KnowledgeGraph>
    </div>
</template>

<script lang="ts" setup>
import SkillShow from '../components/sugar/skillShow.vue'
import PowerBalance from '../components/sugar/powerBalance.vue';
import SalaryGrowth from '../components/sugar/salaryGrowth.vue'
import KnowledgeGraph from '../components/sugar/knowledgeGraph.vue';
import PokerCard from '../components/sugar/pokerCard.vue';
import { IKeyTheme } from '../theme/Itheme';
import { computed, reactive, watch } from 'vue';
import { useStore } from '../store';

const keyTheme: IKeyTheme = reactive({
    colorTheme: '#131517',
    backgroundBlod: '#333',
    colorInside: '#fff',
    primarySecondTitle: '#e7e8e8',
    primaryText: '#d0d0d1',
    placeholderColor: '#808080',
    noiceText: '#ffe660',
})

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
</script>

<style lang="scss" scoped>
.sugar-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    // padding: 12px;
}
</style>
