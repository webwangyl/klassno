<template>
	<el-progress
		class="progress"
		type="circle"
		:percentage="progress.percentage"
		:stroke-width="2"
		:show-text="false"
		:color="progress.progressColor"
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
import { onMounted, reactive, computed, watchEffect } from "vue";
import { ElProgress } from "element-plus";
import Profile from '@/components/home/profile.vue';
import Introduce from '@/components/home/introduce.vue';
import Book from '@/components/home/book.vue';
import { useStore } from "../store";

gsap.registerPlugin(ScrollTrigger);

const store = useStore()
const progress = reactive({
	percentage: 0,
	progressColor: '',
});

let theme:string;
watchEffect(() => {
	theme = store.state.theme
	const app = document.documentElement
	progress.progressColor = app.style.getPropertyValue('--noice-text')
})

const init = () => {
	const sections = gsap.utils.toArray(".page");
	const app = document.documentElement
	progress.progressColor = app.style.getPropertyValue('--noice-text')
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
		stroke: var(--primary-text);
		opacity: 0.3;
	}
}
.page {
	height: calc(100vh - 120px);
	padding: 16px;
}
</style>
