<template>
    <div class="power-balance">
        <Chart :options="options"></Chart>
    </div>
</template>

<script lang="ts" setup>
import Chart from '../chart.vue';
import { ECOption } from '../chart'

const options: ECOption = {
    tooltip: {},
    legend: {},
    dataset: {
        source: [
            ['y', 'vue3', 'vue2', 'react'],
            ['Number Of Project', 1, 10, 1],
            ['Proficiency', 5, 8, 2],
            ['Preference', 9, 5, 5]
        ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
}
</script>

<style scoped>
.power-balance {
    width: 600px;
    height: 300px;
}
</style>
