<template>
    <div class="skill-show">
        <Chart :options="options"></Chart>
    </div>
</template>

<script lang="ts" setup>
import Chart from '../chart.vue'
import { ECOption } from '../chart'

const options: ECOption = {
    series: [
        {
            type: 'funnel',
            funnelAlign: 'left',
            sort: 'ascending',
            width: '40%',
            data: [
                { value: 20, name: 'node' },
                { value: 40, name: 'nginx/docker' },
                { value: 60, name: 'vite/webpack/qiankun' },
                { value: 80, name: 'vue/react/nuxt/typescript' },
                { value: 100, name: 'html/css/js' },
            ],
        }
    ],
}

</script>

<style scoped>
.skill-show {
    width: 400px;
    height: 200px;
}
</style>
