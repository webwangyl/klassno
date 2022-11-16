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
	<Timeline class="page"></Timeline>
	<div class="last">
        <span class="page-title">About</span>
        <div class="last-icon">
            <div v-for="item in iconList" :key="item.label" class="last-container" @click="toLink(item.link)">
                <img class="icon" :src="required(item.url)" alt="">
                <span class="info-text">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, reactive, watchEffect } from "vue";
import { ElProgress } from "element-plus";
import Profile from '@/components/home/profile.vue';
import Introduce from '@/components/home/introduce.vue';
import Book from '@/components/home/book.vue';
import Timeline from '@/components/home/timeline.vue';
import { useStore } from "../store";

gsap.registerPlugin(ScrollTrigger);

const store = useStore()

const iconList = store.state.iconList
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

const required = (name: string) => {
  return new URL(name, import.meta.url).href
}

const toLink = (link: string) => {
    window.open(link, '_target')
}

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

<style lang="scss">
.progress {
	position: fixed;
	top: 160px;
	right: 80px;
	z-index: 199;
	& .el-progress-circle__track {
		stroke: var(--placeholder-color);
		opacity: 0.3;
	}
}
.page {
	height: calc(100vh - 120px);
	padding: 16px;
}
.last {
    .page-title {
        padding: 60px;
        text-align: right;
    }
    .last-icon {
        padding: 60px 60px 100px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        .last-container {
            height: 20px;
            display: inline-block;
            margin-right: 40px;
        }
        .icon {
            height: 25px;
            margin-right: 10px;
        }
        .last-container:hover .info-text{
            @include hover-text;
        }
    }
}
</style>
