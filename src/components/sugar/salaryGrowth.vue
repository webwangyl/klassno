<template>
    <div class="salary-growth">
        <Chart :options="options"></Chart>
    </div>
</template>

<script lang="ts" setup>
import Chart from '../chart.vue'
import { ECOption } from '../chart'

const options: ECOption = {
    yAxis: {},
    xAxis: {
        type: 'category',
        data: ['2019.7', '2020.7', '2020.9', '2021.5', '2022.8']
    },
    series: [
        {
            type: 'line',
            data: [
                { name: '2019.7', value: 3000 },
                { name: '2020.7', value: 6000 },
                { name: '2020.9', value: 8000 },
                { name: '2021.5', value: 11000 },
                { name: '2022.8', value: 15000 },
            ],
        }
    ],
}
</script>

<style scoped>
.salary-growth {
    width: 100%;
    height: 100%;
}
</style>
