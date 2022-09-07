<template>
    <div class="sugar-container">
        <SkillShow></SkillShow>
        <PowerBalance></PowerBalance>
        <SalaryGrowth></SalaryGrowth>
        <KnowledgeGraph></KnowledgeGraph>
    </div>
</template>

<script lang="ts" setup>
import SkillShow from '../components/sugar/skillShow.vue'
import PowerBalance from '../components/sugar/powerBalance.vue';
import SalaryGrowth from '../components/sugar/salaryGrowth.vue'
import KnowledgeGraph from '../components/sugar/knowledgeGraph.vue';
</script>

<style lang="scss" scoped>
.sugar-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
}
</style>
