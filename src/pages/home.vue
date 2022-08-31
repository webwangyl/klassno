<template>
	<el-progress
		class="progress"
		type="circle"
		:percentage="progress.percentage"
		:stroke-width="2"
		:show-text="false"
		color="#ffe660"
		:width="60"
	></el-progress>
	<Profile class="page"></Profile>
	<Introduce class="page"></Introduce>
	<Book class="page"></Book>
	<div class="page last"></div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, reactive } from "vue";
import { ElProgress } from "element-plus";
import Profile from '@/components/home/profile.vue';
import Introduce from '@/components/home/introduce.vue';
import Book from '@/components/home/book.vue';

gsap.registerPlugin(ScrollTrigger);

const progress = reactive({
	percentage: 0,
});

const init = () => {
	const sections = gsap.utils.toArray(".page");
	gsap.to(sections, {
		ease: "none",
		scrollTrigger: {
			scroller: ".main",
			onUpdate: (self) => {
				progress.percentage = Math.round(self.progress * 100);
			},
		},
		duration: 1,
	});
};

onMounted(() => {
	init();
});
</script>

<style lang="scss" scoped>
.progress {
	position: fixed;
	top: 160px;
	right: 80px;
	&:deep(.el-progress-circle__track) {
		stroke: mix($color-theme, $color-inside, 80%);
	}
}
.page {
	height: calc(100vh - 120px);
	padding: 16px;
}
</style>
