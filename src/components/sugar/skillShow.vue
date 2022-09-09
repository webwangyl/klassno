<template>
    <div class="skill-show">
        <Chart :options="options"></Chart>
    </div>
</template>

<script lang="ts" setup>
import Chart from '../chart.vue'
import { ECOption } from '../chart'
import { IKeyTheme } from '../../theme/Itheme';
import { reactive, watch } from 'vue';

const prop = defineProps<{
    theme: IKeyTheme
}>()

const options: ECOption = reactive({
    series: [
        {
            type: 'funnel',
            funnelAlign: 'left',
            sort: 'ascending',
            label: {
                color: prop.theme.colorInside
            },
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
})

watch(prop.theme, (nval) => {
    options.series[0].label.color = nval.colorInside
})
</script>

<style scoped>
.skill-show {
    width: 400px;
    height: 200px;
}
</style>
