<template>
    <div class="power-balance">
        <Chart :options="options"></Chart>
    </div>
</template>

<script lang="ts" setup>
import Chart from '../chart.vue';
import { ECOption } from '../chart'
import { IKeyTheme } from '../../theme/Itheme'
import { reactive, watch } from 'vue';
import { LegendOption } from 'echarts/types/dist/shared'

const prop = defineProps<{
    theme: IKeyTheme
}>()

const options: ECOption = reactive({
    tooltip: {},
    legend: {
        textStyle: {
            color: prop.theme.colorInside
        },
    },
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
})

watch(prop.theme, (nval) => {
    (options.legend as LegendOption).textStyle.color = nval.colorInside
})
</script>

<style scoped>
.power-balance {
    width: 100%;
    height: 100%;
}
</style>
