<template>
	<div class="home">
		<div class="glass"></div>
		<div class="content">
			<div class="grow">
                <span class="grow-background"></span>
            </div>
			<div>
				<p class="noice-text noice-position">
					<span class="text">S</span>
                    <span class="text">C</span>
                    <span class="text">R</span>
                    <span class="text">O</span>
                    <span class="text">L</span>
                    <span class="text">L</span>
                    <span class="text">&nbsp;</span>
                    <span class="text">T</span>
                    <span class="text">O</span>
                    <span class="text">&nbsp;</span>
                    <span class="text">D</span>
                    <span class="text">I</span>
                    <span class="text">S</span>
                    <span class="text">C</span>
                    <span class="text">O</span>
                    <span class="text">V</span>
                    <span class="text">E</span>
                    <span class="text">R</span>
				</p>
                <p class="page-title title-position">Personal profile</p>
                <p class="info-text info-position">
                    I am an ordinary web developer.<br/>
                    My favorite game is Minecraft. I like cool things.<br/>
                    And I think cool is the soul of the web.
                </p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { onMounted } from "vue";

const tl = gsap.timeline()
onMounted(() => {
    tl.fromTo('span.text', { opacity: 0.3 }, { opacity: 1, rotation: 45, duration: 0.25, stagger: 0.2 })
	const glass = document.getElementsByClassName("glass")[0];
	gsap.from(".glass", {
		x: -glass.clientWidth - 30,
		duration: 1,
		delay: 0.5,
	});
});
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	width: 100%;
	padding: 16px;
	color: $color-inside;
	display: flex;
	align-items: center;
	.glass {
		flex: 4;
		height: 600px;
		background-color: mix($color-inside, $color-theme, 30%);
		filter: blur(10px) sepia(40%);
		animation: sepia 5s infinite;
	}
	.content {
		flex: 3;
		height: 100%;
		padding-left: 60px;
		position: relative;
		.grow {
			width: 20px;
			height: 100px;
			background-color: #fff;
			position: absolute;
			right: 100px;
			top: calc(50% - 50px);
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
@keyframes sepia {
	0% {
		filter: blur(10px) sepia(40%);
	}
	50% {
		filter: blur(6px) sepia(80%);
	}
	100% {
		filter: blur(10px) sepia(40%);
	}
}
</style>
