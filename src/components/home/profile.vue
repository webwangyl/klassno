<template>
    <div class="profile">
		<div class="glass" v-if="!preview">
			<img class="home-bg" src="@/assets/images/home.png" alt="">
		</div>
		<div class="content">
			<div class="grow">
				<span class="grow-background"></span>
				<span class="triangle"></span>
			</div>
			<div>
				<p class="noice-text noice-position" v-html="templateText"></p>
				<p class="page-title title-position">Personal profile</p>
				<p class="info-text info-position">
					I am an ordinary web developer.<br />
					My favorite game is Minecraft. I like cool things.<br />
					And I think cool is the soul of the web.
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import gsap from "gsap"
import { onMounted, ref } from 'vue'
import { useStore } from "../../store";

const prop = defineProps<{
    preview?: boolean,
}>()

console.log(prop)

const preview = ref(prop.preview || false)
console.log(preview.value)

const store = useStore();

const noices = store.state.noices;
const templateText = noices.reduce((pre, cur) => {
	const template = `<span class="text">${cur}</span>`;
	return pre + template;
});

const init = () => {
    gsap.fromTo(
		"span.text",
		{ opacity: 0.3 },
		{ opacity: 1, rotation: 45, duration: 0.25, stagger: 0.2 }
	);
    gsap.to(".glass", {
		x: 0,
		duration: 0.5,
	});
}

onMounted(() => {
    init()
})
</script>

<style lang="scss" scoped>
.profile {
	display: flex;
	align-items: center;
	height: 100%;
	.glass {
		flex: 4;
		height: 600px;
		transform: translateX(calc(-100% - 30px));
		text-align: center;
		.home-bg {
			height: 100%;
			animation: slow-rotate 10s infinite;
		}
	}
	.content {
		flex: 3;
		height: 100%;
		padding-left: 60px;
		position: relative;
		.grow {
			height: 120px;
			right: 100px;
			top: calc(50% - 100px);
		}
		.noice-position {
			position: absolute;
			right: 160px;
			top: calc(50% - 1em);
		}
		.title-position {
			position: absolute;
			right: calc(160px - 0.2em);
			top: calc(50% + 1em);
		}
		.info-position {
			position: absolute;
			right: calc(160px - 0.2em);
			top: calc(50% + 180px);
			text-align: right;
		}
	}
}
</style>
