<template>
    <Chart :id="id" :options="options"></Chart>
</template>

<script lang="ts" setup>
import Chart from '../chart.vue'
import { ECOption } from '../chart'
import uuid from '../../utils/uuid'

const id = uuid()
const options: ECOption = {

}
</script>
