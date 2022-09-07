<template>
	<div class="chart" :id="id" v-resize="resize"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts/core";
import { LineChart, FunnelChart, BarChart, GraphChart } from "echarts/charts";
import { GridComponent, TooltipComponent, GraphicComponent, DatasetComponent, LegendComponent } from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { onMounted } from "vue";
import { ECOption } from "./chart";
import uuid from '../utils/uuid'

echarts.use([
	LineChart,
	FunnelChart,
	BarChart,
	GraphChart,
	GridComponent,
	TooltipComponent,
	DatasetComponent,
	LegendComponent,
	LabelLayout,
	UniversalTransition,
	SVGRenderer,
	GraphicComponent,
]);

const prop = defineProps<{
	options: ECOption;
}>();

const emit = defineEmits<{
	(event: "getValue", e): void;
}>();

const id = uuid();

let chart;
let bedounceTimer: number;
let dbclickTimer: number;

const init = () => {
	chart = echarts.init(document.getElementById(id) as HTMLElement);
	chart.setOption(prop.options);
	if (chart._$handlers && chart._$handlers.click) {
		// echarts绑定事件前清除绑定，防止重复触发
		chart._$handlers.click.length = 0;
	}
	chart.on("click", (params) => {
		if (dbclickTimer) {
			//针对双击事件处理
			clearTimeout(dbclickTimer);
			dbclickTimer = null;
			return;
		}
		dbclickTimer = window.setTimeout(() => {
			emit("getValue", params);
		}, 300);
	});
};

const resize = () => {
	if (chart) {
		// 避免疯狂触发echarts重绘
		if (bedounceTimer) clearTimeout(bedounceTimer);
		bedounceTimer = window.setTimeout(() => {
			chart.resize({
				animation: {
					duration: 1000,
				},
			});
		}, 300);
	}
};

onMounted(init);
</script>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
