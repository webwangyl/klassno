<template>
    <div class="sugar-container">
        <SkillShow></SkillShow>
        <PokerCard></PokerCard>
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
import PokerCard from '../components/sugar/pokerCard.vue';

</script>

<style lang="scss" scoped>
.sugar-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    padding: 12px;
}
</style>
