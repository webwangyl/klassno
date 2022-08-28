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
	<div class="home page">
		<div class="glass">
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
	<div class="introduce page">
		<div class="glass-container">
			<div class="frosted-glass glass-1">
				<p class="page-title">PROFESSION</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'profession-first' }">
					I graduated in July 2020. Before graduation, I had practiced in AsiaInfo for about half a year and started my Vue journey here.<br/>
				</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'profession-second' }">
					The first company to officially work is in Kelan, but it is not suitable for me. It uses Vue and weex technologies and does most mobile projects.
					In terms of work arrangement, I will do more work on weex. I think that working on weex will affect my future development, so I came to another company, huaun, in May 2021.
				</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'profession-third' }">
					This is a start-up company in network security. My colleagues and leaders are very nice. Because is start-up companies, I can independently take charge of the whole Web project, from framework construction to specific business. This is a good training opportunity for me who has just graduated. The technology used here is nuxt, and all projects are on the PC side. Most of them are on the management, and there are also some SaaS side projects, The company's architecture is developing in the direction of cloud nativity. For this reason, I also learned docker and qiankun technologies.Although it can't satisfy my persistent pursuit of cool web, I still like it here.
				</p>
				<div v-if="skipProfession" class="skip-text" @click="skip('profession')">skip</div>
				<easy-button class="button-p" @touch="next"></easy-button>
			</div>
			<div class="frosted-glass glass-2">
				<p class="page-title">HOBBY</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'hobby-first' }">
					Like the music you hear, my favorite game is minecraft.I like its freedom, creativity, expansibility and powerful Redstone Technology(although I am a novice in Redstone).I like to listen to comfortable music, make a cup of tea and enjoy the process of creating something I want in a leisurely afternoon.
				</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'hobby-second' }">
					My favorite cartoon is one piece. I have seen it since junior high school and have seen it at least four times. I've been crying for countless times. If my friends have not seen it, they will usually be recommended by me to see it many times. Ha ha.
				</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'hobby-third' }">
					On the web, there is no doubt that I like cool, animation, etc. a cool page will stimulate my desire to explore and make me want to complete it myself (most of them will fail haha)
				</p>
				<div v-if="skipHobby" class="skip-text" @click="skip('hobby')">skip</div>
				<easy-button class="button-bp" type="left" @touch="back"></easy-button>
			</div>
		</div>
		<img class="introduce-bg" src="@/assets/images/introduce.png" alt="">
	</div>
	<div class="page home"></div>
	<div class="page last"></div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "../store";
import { ElProgress } from "element-plus";
import EasyButton from '@/components/base/easyButton.vue'

gsap.registerPlugin(ScrollTrigger);

const store = useStore();
const progress = reactive({
	percentage: 0,
});
let isFirst = false // 首次播放动画
let skipProfession = ref(true)
let skipHobby = ref(true)

const noices = store.state.noices;
const templateText = noices.reduce((pre, cur) => {
	const template = `<span class="text">${cur}</span>`;
	return pre + template;
});

let profession
let hobby

const init = () => {
	const sections = gsap.utils.toArray(".page");
	profession = gsap.timeline({
		scrollTrigger: {
			trigger: '.glass-container',
			scroller: '.main',
			start: 'top 60%',
			end: 'bottom top',
			toggleActions: 'play pause resume pause',
		},
		onComplete: () => skipProfession.value = false
	});
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
	gsap.from('.glass-container', {
		scrollTrigger: {
			trigger: '.glass-container',
			scroller: '.main',
			scrub: 1,
			start: 'top bottom',
			end: 'bottom 60%',
			toggleActions: 'restart pause resume pause',
		},
		x: 200,
		scale: 0.1,
		rotation: 180,
		duration: 1,
	})
	profession.from('.profession-first', { opacity: 0, duration: .1, stagger: .1 }).from('.profession-second', {
		opacity: 0, duration: .1, stagger: .1
	}, '+=.2').from('.profession-third', {
		opacity: 0, duration: .1, stagger: .1
	}, '+=.2')
};

const next = () => {
	gsap.to('.frosted-glass', {
		x: '-=' + (document.querySelector('.frosted-glass') as HTMLElement).offsetWidth,
		duration: .5,
	})
	if (!isFirst) {
		isFirst = true
		hobby = gsap.timeline({
			scrollTrigger: {
				trigger: '.glass-container',
				scroller: '.main',
				start: 'top 60%',
				end: 'bottom top',
				toggleActions: 'play pause resume pause',
			},
			onComplete: () => skipHobby.value = false
		});
		hobby.from('.hobby-first', {
			opacity: 0, duration: .1, stagger: .1
		}, '+=.5').from('.hobby-second', {
			opacity: 0, duration: .1, stagger: .1
		}, '+=.2').from('.hobby-third', {
			opacity: 0, duration: .1, stagger: .1
		}, '+=.2')
	}
}

const back = () => {
	gsap.to('.frosted-glass', {
		x: '+=' + (document.querySelector('.frosted-glass') as HTMLElement).offsetWidth,
		duration: .5,
	})
}

const skip = (key) => {
	switch (key) {
		case 'profession':
			if (profession) profession.timeScale(20)
			break;
		case 'hobby':
			if (hobby) hobby.timeScale(20)
			break;
	}
}

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
		filter: sepia(40%);
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
	.introduce-bg {
		position: absolute;
		top: 20%;
		transform: translateY(-50%);
		right: 100px;
		height: 600px;
		animation: slow-translate 10s infinite;
	}
	.glass-container {
		position: absolute;
		width: 800px;
        height: 500px;
		overflow: hidden;
		top: 50%;
        left: 100px;
		display: flex;
        transform: translate(0, -50%);
		box-shadow: 8px 8px 4px 0 rgba($color-inside, .2);
	}
    .frosted-glass {
		width: 100%;
        height: 500px;
        display: flex;
		flex-shrink: 0;
        flex-direction: column;
		position: relative;
        padding: 12px;
        align-items: center;
        background: radial-gradient(closest-side, rgba($color-theme, .2), rgba($color-inside, .2));
		.button-p {
			position: absolute;
			bottom: 20px;
			right: 20px;
		}
		.button-bp {
			position: absolute;
			bottom: 20px;
			left: 20px;
		}
		.skip-text {
			width: 40px;
			height: 20px;
			border-radius: 10px;
			background-color: rgba($color-theme, .5);
			line-height: 20px;
			text-align: center;
			font-weight: 100;
			letter-spacing: .5px;
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
			color: $primary-text;
			cursor: pointer;
		}
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

@media screen and (min-width: 1680px) {
	.introduce-bg {
		right: 10% !important;
	}
}
</style>
