<template>
	<div class="case">
		<div class="my-container">
			<div
				v-for="(item, index) in caseList"
				:key="item.key"
				:id="item.key"
				class="case-container"
			>
                <div class="viewport">
                    <RunningBall v-if="activeIndex === 0"></RunningBall>
                </div>
			</div>
		</div>
		<div class="nav-list">
			<nav v-for="(item, index) in caseList" :key="item.key">
				<p :class="{ 'active': index === activeIndex }">{{ item.title }}</p>
			</nav>
		</div>
	</div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { onMounted, onUnmounted, ref } from "vue";
import RunningBall from "../components/case/RunningBall.vue";
import { throttle } from '../utils'

interface ICaseItem {
	title: string;
	key: string;
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const caseList: ICaseItem[] = [
	{
		title: "Running Ball",
		key: "a1",
	},
	{
		title: "Running Ball",
		key: "s1",
	},
	{
		title: "Running Ball",
		key: "s2",
	},
];

let activeIndex = ref<number>(0)

onMounted(() => {
	gsap.to(".case-container:not(:last-child)", {
		yPercent: -100,
		ease: "none",
		stagger: 0.5,
		scrollTrigger: {
			trigger: ".my-container",
			start: "top top",
			end: "+=200%",
			scrub: true,
			pin: true,
            onUpdate: throttle(({ progress }) => {
                if (progress > 1) {
                    activeIndex.value = 0
                } else {
                    activeIndex.value = Math.round(progress * (caseList.length - 1))
                    console.log(Math.round(progress * (caseList.length - 1)))
                }
            })
		},
	});
	gsap.set(".case-container", {
		zIndex: (i, target, targets) => targets.length - i,
	});
    const nav: HTMLElement[] = gsap.utils.toArray('nav p')
    nav.forEach((el, index) => {
        el.addEventListener('click', () => {
            const section = document.getElementById(caseList[index].key)
            gsap.to(window, {
                scrollTo: section.scrollHeight * index,
            })
        })
    })
});
onUnmounted(() => ScrollTrigger.killAll());
</script>

<style lang="scss">
.case {
	width: 100%;
	height: 100%;
	background-color: var(--color-theme);
	.my-container {
		height: 100%;
		overflow: hidden;
		position: absolute;
		width: 100%;
	}
	.case-container {
		@include circle-image;

		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		background-color: #131517;
        .viewport {
            width: 500px;
            height: 473px;
            background-color: #ffe660;
            animation: jelly-box 10s infinite linear;
            overflow: hidden;
        }
	}
	.case-container:nth-child(2n) {
		background-color: rgb(117, 117, 117);
	}
    .nav-list {
        position: fixed;
        right: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: .2;
        p {
            color: #fff;
            line-height: 30px;
            cursor: pointer;
        }
        p.active, p:hover {
            color: #ffe660;
            text-decoration: underline;
        }
    }
    .nav-list:hover {
        opacity: .8;
    }
}
</style>
