<template>
	<svg
		id="music"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 800 300"
		width="40px"
		height="30px"
		@click="changeStatus"
	>
		<path
			id="line"
			:style="{ stroke: strokeColor, fill: strokeColor }"
			stroke-width="10"
			d="M -200 150 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0"
		></path>
	</svg>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, watch, computed, ref } from "vue";
import { useStore } from "../../store";

const store = useStore();

const status = computed(() => store.state.audioStatus);
watch(status, (nval) => {
	if (nval) {
		timeline.play();
	} else {
		timeline.pause();
	}
});

const theme = computed(() => store.state.theme);
let strokeColor = ref('')
watch(theme, () => {
	const app = document.documentElement
	strokeColor.value = app.style.getPropertyValue('--color-inside')
})

let timeline: any = "";

onMounted(() => {
	timeline = gsap.timeline({ repeat: -1, ease: "none", repeatDelay: 0 });
	timeline.to("#line", { x: -400, duration: 1 });
	timeline.timeScale(1.8);
	timeline.pause();
});

const changeStatus = (): void => {
	store.commit('SET_STATUS', !store.state.audioStatus)
};
</script>

<style lang="scss" scoped>
svg {
	cursor: pointer;
}
</style>
