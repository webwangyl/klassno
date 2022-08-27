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
		<div class="glass-container">
			<div class="frosted-glass glass-1">
				<p class="page-title">PROFESSION</p>
				<p class="info-text" v-breakup="{ num: 10, classname: 'profession-first' }">
					I graduated in July 2020. Before graduation, I had practiced in AsiaInfo for about half a year and started my Vue journey here.<br/>
				</p>
				<p class="info-text">
					The first company to officially work is in Kelan, but it is not suitable for me. It uses Vue and weex technologies and does most mobile projects.
					In terms of work arrangement, I will do more work on weex. I think that working on weex will affect my future development, so I came to another company, huaun, in May 2021.
				</p>
				<p class="info-text">
					This is a start-up company in network security. My colleagues and leaders are very nice. Because is start-up companies, I can independently take charge of the whole Web project, from framework construction to specific business. This is a good training opportunity for me who has just graduated. The technology used here is nuxt, and all projects are on the PC side. Most of them are on the management, and there are also some SaaS side projects, The company's architecture is developing in the direction of cloud nativity. For this reason, I also learned docker and qiankun technologies.Although it can't satisfy my persistent pursuit of cool web, I still like it here.
				</p>
				<easy-button class="button-p" @touch="next"></easy-button>
			</div>
			<div class="frosted-glass glass-2">
				<p class="page-title">HOBBY</p>
				<p class="info-text">
					Like the music you hear, my favorite game is minecraft.I like its freedom, creativity, expansibility and powerful Redstone Technology(although I am a novice in Redstone).I like to listen to comfortable music, make a cup of tea and enjoy the process of creating something I want in a leisurely afternoon.
				</p>
				<p class="info-text">
					My favorite cartoon is one piece. I have seen it since junior high school and have seen it at least four times. I've been crying for countless times. If my friends have not seen it, they will usually be recommended by me to see it many times. Ha ha.
				</p>
				<p class="info-text">
					On the web, there is no doubt that I like cool, animation, etc. a cool page will stimulate my desire to explore and make me want to complete it myself (most of them will fail haha)
				</p>
				<easy-button class="button-bp" type="left" @touch="back"></easy-button>
			</div>
		</div>
	</div>
	<div class="page home"></div>
	<div class="page last"></div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, reactive, Directive } from "vue";
import { useStore } from "../store";
import { ElProgress } from "element-plus";
import EasyButton from '@/components/base/easyButton.vue'

const vBreakup:Directive<HTMLElement> = {
    created: function(el, binding) {
        // 拆碎段落
        const source = el.innerText
        let num = 1
        let classname = ''
        if (binding.value) {
            num = binding.value.num
            classname = binding.value.classname
        }
        const len = el.innerText.length
        let template = ''
        for (let i = 0; i < len; i+=num) {
            template += '<span' + (classname ? ` class='${classname}'>` : '>') + source.slice(i, i + num) + '</span>'
        }
        el.innerHTML = template
    }
}

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
};

const next = () => {
	gsap.to('.frosted-glass', {
		x: '-=' + (document.querySelector('.frosted-glass') as HTMLElement).offsetWidth,
		duration: .5,
	})
}

const back = () => {
	gsap.to('.frosted-glass', {
		x: '+=' + (document.querySelector('.frosted-glass') as HTMLElement).offsetWidth,
		duration: .5,
	})
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
	.glass-container {
		position: absolute;
		width: 60%;
        height: 500px;
		overflow: hidden;
		top: 50%;
        right: 150px;
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
