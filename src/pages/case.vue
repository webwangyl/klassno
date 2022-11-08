<template>
	<div class="case">
		<div class="my-container">
            <RunningBall
                v-if="activeIndex === 0"
            ></RunningBall>
            <Thunderstorm
                v-if="activeIndex === 1"
            ></Thunderstorm>
            <DomMatrix
                v-if="activeIndex === 2"
            ></DomMatrix>
		</div>
		<div class="horbar">
			<p
				v-for="(item, index) in caseList"
				:key="item.key"
				@mouseenter="handleMouseEnter(index)"
                @click="handleClick(item, index)"
			>
                {{ index + 1 }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import RunningBall from "../components/case/RunningBall.vue";
import Thunderstorm from "../components/case/Thunderstorm.vue";
import DomMatrix from "../components/case/DomMatrix.vue";
import { throttle } from "../utils";
import { router } from '../router'
import { useStore } from '../store'

interface ICaseItem {
	title: string;
	key: string;
}

const store = useStore()

const caseList = store.state.caseList

for (let i = 0; i < 30; i++) {
    caseList.push({
        title: i + '',
        key: i + '',
    })
}

let activeIndex = ref<number>(0);

const handleMouseEnter = (index: number) => {
    activeIndex.value = index
}

const handleClick = (item: ICaseItem, index: number) => {
    if (isNaN(Number(item.key))) {
        router.push({
            path: 'caseShow',
            query: {
                index,
            },
        })
    }
}

onMounted(() => {
	const h = window.innerWidth;
	const horbar = document.querySelector(".horbar") as HTMLElement;
	window.addEventListener(
		"mousemove",
		throttle((e: MouseEvent) => {
			const { clientX } = e;
			const i = -((clientX * horbar.scrollWidth) / h - h / 2);
			horbar.style.transform = `translateX(${i}px)`;
		})
	);
});
onUnmounted(() => {

});
</script>

<style lang="scss">
.case {
	width: 100%;
	height: 100%;
	background-color: var(--color-theme);
	position: relative;
	.horbar {
		position: absolute;
		top: 50%;
		display: flex;
        height: 40px;
        align-items: center;
		p {
			width: 100px;
			text-align: center;
			cursor: pointer;
            font-size: 18px;
		}
		p:hover {
			font-size: 28px;
			color: var(--noice-text);
            text-shadow: 0 0 10px var(--noice-text);
		}
	}
	.my-container {
		height: 100%;
		overflow: hidden;
		position: absolute;
		width: 100%;
        opacity: .3;
	}
}
</style>
