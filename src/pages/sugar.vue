<template>
    <div class="sugar-container">
        <Chart id="linechart" :options="lineOptions"></Chart>
    </div>
</template>

<script lang="ts" setup>
import Chart from '../components/chart.vue'
import { ECOption } from '../components/chart';
import { onMounted } from 'vue';

const lineOptions: ECOption = {
    graphic: {
        elements: [
            {
                type: 'group',
                children: [
                    {
                        type: 'polyline',
                        shape: {
                            points: [[0,0],[100,100],[200,300]],
                        },
                        style: {
                            stroke: '#fff',
                        },
                        keyframeAnimation: [
                            {
                                loop: true,
                                duration: 4000,
                                keyframes: [
                                    {
                                        percent: 0,
                                        style: {
                                            stroke: '#000'
                                        },
                                    },
                                    {
                                        percent: 1,
                                        easing: 'circularOut',
                                        style: {
                                            stroke: '#fff'
                                        },
                                    }
                                ],
                            }
                        ],
                    }
                ],
            }
        ],
    },
}
</script>

<style lang="scss" scoped>
.sugar-container {
    width: 100vw;
    height: 100vh;
}
</style>
