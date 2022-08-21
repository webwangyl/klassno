<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 800 300"
    width="40px"
    height="30px"
    @click="changeStatus"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  >
    <path
      id="line" 
      stroke="#fff"
      stroke-width="10"
      fill="#fff"
      d="M -200 150 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0 q 100 50 200 0 q 100 -50 200 0"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";

const emit = defineEmits<{
  (e: "change", status: Boolean): void;
}>();
const props = defineProps<{
  status: Boolean;
}>();

let timeline: any = ''

onMounted(() => {
  timeline = gsap.timeline({ repeat: -1, ease: "none", repeatDelay: 0 });
  timeline.to("#line", { x: -400, duration: 1 });
  timeline.timeScale(1.8)
  timeline.pause()
});

const changeStatus = (): void => {
    if (!props.status) {
        timeline.play()
    } else {
        timeline.pause()
    }
  emit("change", props.status);
};
</script>

<style lang="scss" scoped>
svg {
  cursor: pointer;
}
</style>
