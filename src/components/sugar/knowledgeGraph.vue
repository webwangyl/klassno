<template>
	<div class="knowledge-graph">
		<Chart :options="options"></Chart>
	</div>
</template>

<script lang="ts" setup>
import Chart from "../chart.vue";
import { ECOption } from "../chart";

const data = [
	{ name: "html" },
	{ name: "javascript", x: "50%", y: "50%" },
	{ name: "css" },
	{ name: "vue" },
	{ name: "react" },
	{ name: "typescript" },
	{ name: "node" },
	{ name: "nginx" },
	{ name: "docker" },
	{ name: "vite" },
	{ name: "webpack" },
	{ name: "qiankun" },
	{ name: "nuxt" },
	{ name: "weex" },
	{ name: "vuex" },
	{ name: "redux" },
	{ name: "pinia" },
	{ name: "sass" },
	{ name: "stylus" },
];

const links = [
	{ source: "html", target: "css" },
	{ source: "html", target: "javascript" },
	{ source: "javascript", target: "css" },
	{ source: "javascript", target: "vue" },
	{ source: "javascript", target: "react" },
	{ source: "javascript", target: "typescript" },
	{ source: "javascript", target: "node" },
	{ source: "vue", target: "nuxt" },
	{ source: "vue", target: "weex" },
	{ source: "vue", target: "vuex" },
	{ source: "react", target: "redux" },
	{ source: "css", target: "sass" },
	{ source: "css", target: "stylus" },
];

const options: ECOption = {
	animationDuration: (idx: number) => idx * 100,
	animationDurationUpdate: 1500,
	animationEasingUpdate: "quinticInOut",
	series: [
		{
			type: "graph",
			layout: "force",
			force: {
				initLayout: "circular",
				edgeLength: 160,
				repulsion: 180,
				friction: 0.2,
				gravity: 0.1,
			},
			symbolSize: 50,
			draggable: true,
			autoCurveness: true,
			roam: true,
			label: {
				show: true,
			},
			data: [
	{ name: "html" },
	{ name: "javascript", x: 200, y: 200, fixed: true },
	{ name: "css" },
	{ name: "vue" },
	{ name: "react" },
	{ name: "typescript" },
	{ name: "node" },
	{ name: "nginx" },
	{ name: "docker" },
	{ name: "vite" },
	{ name: "webpack" },
	{ name: "qiankun" },
	{ name: "nuxt" },
	{ name: "weex" },
	{ name: "vuex" },
	{ name: "redux" },
	{ name: "pinia" },
	{ name: "sass" },
	{ name: "stylus" },
],
			links,
		},
	],
};
</script>

<style scoped>
.knowledge-graph {
	width: 100%;
	height: 100%;
}
</style>
