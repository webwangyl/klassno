<template>
	<div class="case">
		<div class="my-container">
			<component :is="componentMap[activeKey]"></component>
		</div>
		<div class="horbar">
			<p
				v-for="(item, index) in caseList"
				:key="item.key"
                :class="{'is-active': activeKey === item.key}"
				@mouseenter="handleMouseEnter(item, index)"
                @click="handleClick(item, index)"
			>
                {{ index + 1 }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, defineAsyncComponent } from "vue";
import { throttle } from "../utils";
import { router } from '../router'
import { useStore } from '../store'

interface ICaseItem {
	title: string;
	key: string;
}

const store = useStore()

const caseList = store.state.caseList

const componentMap = {
	RunningBall: defineAsyncComponent(() => import('../components/case/RunningBall.vue')),
	Thunderstorm: defineAsyncComponent(() => import('../components/case/Thunderstorm.vue')),
	DomMatrix: defineAsyncComponent(() => import('../components/case/DomMatrix.vue')),
	MagicCard: defineAsyncComponent(() => import('../components/case/MagicCard.vue')),
	VolumeSound: defineAsyncComponent(() => import('../components/case/VolumeSound.vue')),
	StarNight: defineAsyncComponent(() => import('../components/case/StarNight.vue')),
	MutiLayer: defineAsyncComponent(() => import('../components/case/MutiLayer.vue')),
	ColorTriangle: defineAsyncComponent(() => import('../components/case/ColorTriangle.vue')),
	CircleLayout: defineAsyncComponent(() => import('../components/case/CircleLayout.vue')),
	AutoFind: defineAsyncComponent(() => import('../components/case/AutoFind.vue'))
}

if (caseList.length < 30) {
	for (let i = 0; i < 30; i++) {
		caseList.push({
				title: i + '',
				key: i + '',
		})
	}
}

let activeKey = ref<string>('RunningBall');

const handleMouseEnter = async (item: ICaseItem, index: number) => {
	if (isNaN(Number(item.key))) {
    activeKey.value = item.key
	}
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
    overflow-x: hidden;
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
		p:hover, p.is-active {
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
