<template>
	<div class="test">
		<div class="description panel blue">
			<div>
				<h1>Horizontal snapping sections (simple)</h1>
				<p>
					Scroll vertically to scrub the horizontal animation. It also
					dynamically snaps to the sections in an organic way based on
					the velocity. The snapping occurs based on the natural
					ending position after momentum is applied, not a simplistic
					"wherever it is when the user stops".
				</p>
				<div class="scroll-down">
					Scroll down
					<div class="arrow"></div>
				</div>
			</div>
		</div>

		<section class="panel red">ONE</section>
		<section class="panel orange">TWO</section>
		<section class="panel purple">THREE</section>
		<section class="panel green">FOUR</section>
		<section class="panel gray">FIVE</section>
	</div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    let sections = gsap.utils.toArray(".panel");
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".test",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        // end: "+=5500",
      }
    });
})
</script>

<style lang="scss">
.test {
	height: 100%;
    overscroll-behavior: none;
    width: 600%;
    display: flex;
    flex-wrap: nowrap;
    .panel {
        width: 100%;
        height: 100%;
    }
}
</style>
