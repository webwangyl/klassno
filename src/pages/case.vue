<template>
	<div class="case">
		<el-tabs v-model="activeName">
			<el-tab-pane v-for="item in caseList" :key="item.key" :label="item.title" :name="item.key"></el-tab-pane>
		</el-tabs>
		<div class="my-container" :style="caseStyle">
			<div
				v-for="item in caseList"
				:key="item.key"
                :id="item.key"
				class="case-container"
			>
				<RunningBall v-if="item.key === '1'"></RunningBall>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { ElTabs, ElTabPane } from "element-plus";
import RunningBall from '../components/case/RunningBall.vue'

interface ICaseItem {
    title: string,
    key: string,
}

gsap.registerPlugin(ScrollTrigger);

let sections: HTMLElement[]

const caseList: ICaseItem[] = [
    {
        title: 'Running Ball',
        key: '1',
    }
];

let caseStyle = reactive({ width: "100%" });

let activeName = ref<string>('1')

onMounted(() => {
	sections = gsap.utils.toArray(".case-container");
	caseStyle.width = sections.length * 100 + "%";
	gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
		ease: "none",
        scrollTrigger: {
            trigger: ".case",
    		pin: true,
    		scrub: 1,
    		snap: 1 / (sections.length - 1),
        }
	});
});
onUnmounted(() => ScrollTrigger.killAll())
</script>

<style lang="scss">
.case {
	width: 100%;
	height: 100%;
	background-color: var(--color-theme);
	.my-container {
		height: calc(100% - 40px);
		display: flex;
		flex-wrap: nowrap;
	}
	.case-container {
        @include circle-image;

		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.case-container:nth-child(2n) {
		background-color: rebeccapurple;
	}
    .case-container:nth-child(3n) {
		background-color: #e7e7e7;
	}
    .case-container:nth-child(4n) {
		background-color: aqua;
	}
    .case-container:nth-child(5n) {
		background-color: burlywood;
	}
    .case-container:nth-child(6n) {
		background-color: gray;
	}
    .el-tabs {
        .el-tabs__header {
            margin: 0;
        }
        .el-tabs__nav-wrap::after {
            background-color: transparent;
        }
        .el-tabs__active-bar {
            background-color: var(--noice-text);
        }
        .el-tabs__item {
            color: var(--color-inside);
        }
        .el-tabs__item.is-active {
            color: var(--noice-text);
        }
    }
}
</style>
