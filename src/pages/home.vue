<template>
	<el-progress
		class="progress"
		type="circle"
		:percentage="progress.percentage"
		:stroke-width="2"
		color="#ffe660"
		:width="60"
		:format="progress.format"
	></el-progress>
	<div class="home page">
		<div class="glass"></div>
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
	<div class="introduce page">
        <div class="frosted-glass">
            <p class="page-title">ABOUT PROFESSION</p>
            <p class="info-text">
                I graduated in July 2020. Before graduation, I had practiced in AsiaInfo for about half a year and started my Vue journey here.<br/>
                The first company to officially work is in Kelan, but it is not suitable for me. It uses Vue and weex technologies and does most mobile projects.
            </p>
        </div>
	</div>
	<div class="page home"></div>
	<div class="page last"></div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, reactive } from "vue";
import { useStore } from "../store";
import { ElProgress } from "element-plus";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
const store = useStore();
const progress = reactive({
	percentage: 0,
	format: () => {
		return "x";
	},
});

const noices = store.state.noices;
const templateText = noices.reduce((pre, cur) => {
	const template = `<span class="text">${cur}</span>`;
	return pre + template;
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
	gsap.fromTo(
		"span.text",
		{ opacity: 0.3 },
		{ opacity: 1, rotation: 45, duration: 0.25, stagger: 0.2 }
	);
	gsap.to(".glass", {
		x: 0,
		duration: 0.5,
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
.home {
	width: 100%;
	color: $color-inside;
	display: flex;
	align-items: center;
	z-index: 0;
	.glass {
		flex: 4;
		height: 600px;
		background-color: mix($color-inside, $color-theme, 30%);
		filter: blur(10px) sepia(40%);
		transform: translateX(calc(-100% - 30px));
	}
	.content {
		flex: 3;
		height: 100%;
		padding-left: 60px;
		position: relative;
		.grow {
			position: absolute;
			height: 120px;
			right: 100px;
			top: calc(50% - 100px);
			.grow-background {
				background-color: $noice-text;
				width: 1px;
				height: 100%;
				position: absolute;
				transform-origin: bottom;
				animation: grow-line 4s infinite;
			}
			.triangle {
				display: block;
				position: absolute;
				bottom: -4px;
				left: -4px;
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid $noice-text;
				animation: hidden-triangle 4s infinite;
			}
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

.introduce {
	position: relative;
    .frosted-glass {
        position: absolute;
        width: 60%;
        height: 60%;
        display: flex;
        flex-direction: column;
        padding: 12px;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(closest-side, rgba($color-theme, .2), rgba($color-inside, .2));
        box-shadow: 8px 8px 4px 0 rgba($color-inside, .2);
    }
    .frosted-glass::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        filter: blur(12px);
    }
}

@keyframes grow-line {
	0% {
		height: 0;
		transform: translateY(0);
	}
	15% {
		height: 100%;
		transform: translateY(0);
	}
	85% {
		height: 100%;
		transform: translateY(0);
	}
	100% {
		height: 0;
		transform-origin: bottom;
		transform: translateY(200px);
	}
}
@keyframes hidden-triangle {
	0% {
		transform: scale(1);
	}
	70% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}
</style>
