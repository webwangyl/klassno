<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { ref, onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import gsap from "gsap";
import Music from "./components/home/music.vue";

let currentInstance: any = "";

const option = {
  graphic: {
    elements: [
      {
        type: "text",
        left: "center",
        top: "center",
        style: {
          text: "this's Mr.Wang's Blog",
          fontSize: 80,
          fontWeight: "bold",
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: "transparent",
          stroke: "#fff",
          lineWidth: 1,
        },
        keyframeAnimation: {
          duration: 3000,
          delay: 2300,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: "transparent",
                lineDashOffset: 200,
                lineDash: [200, 0],
              },
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: "transparent",
              },
            },
            {
              percent: 1,
              style: {
                fill: "#fff",
              },
            },
          ],
        },
      },
    ],
  },
};

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
let count = ref<number>(0);
let canPlay = ref<boolean>(false);
let playStatus = ref<boolean>(false);
let chart = null;
let timeline = null;
const add = () => {
  count.value++;
};
let audio: HTMLAudioElement;
onMounted(() => {
  const chartTitle = document.getElementById("chartTitle");
  if (chartTitle) {
    chart = echarts.init(chartTitle);
    chart.setOption(option);
  }
  timeline = gsap.timeline({ ease: "none" });
  timeline.to(".mask", { backgroundColor: "rgba(0,0,0,0)", duration: 1 });
  timeline.to(
    ".label-text",
    { right: "100px", bottom: "40px", opacity: 0.3, duration: 2 },
    "<"
  );
  timeline.to(".label-text", { display: "none", duration: 0 });
  timeline.to(".mask", { display: "none", duration: 0 });
  timeline.to(".details", { opacity: 1, duration: 0.5 });
  timeline.to(".btn", { opacity: 1, duration: 0.5 }, "<");
  currentInstance = getCurrentInstance();
  audio = document.getElementById('audio') as HTMLAudioElement
  if (audio) {
    (audio as HTMLElement).addEventListener("canplaythrough", (e: Event) => {
      canPlay.value = true;
    });
  }
});
const changeStatus = (status: boolean): void => {
  if (audio && canPlay.value) {
    playStatus.value = !status;
    if (playStatus.value) {
      audio.play();
    } else {
      audio.pause();
    }
  }
};
</script>

<template>
  <div class="mask"></div>
  <p class="label-text">点击播放声音效果更佳呦！</p>
  <div id="chartTitle"></div>
  <div class="details">这名程序员正在加班加点写bug！</div>
  <el-button class="btn" v-if="count < 100" @click="add" plain
    >催他！{{ count }}</el-button
  >
  <el-button v-else plain disable>别TM催了！SB</el-button>
  <Music class="root-music" :status="playStatus" @change="changeStatus"></Music>
  <audio id="audio" loop src="/media/minecraft.mp3">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
</template>

<style lang="scss" scoped>
.title {
  color: $primary-first-title;
}
#chartTitle {
  width: 100%;
  height: 100px;
}
.btn {
  opacity: 0;
}
.details {
  margin: 20px;
  color: $primary-text;
  opacity: 0;
}
.el-button {
  margin-bottom: 20px;
}
.root-music {
  position: fixed;
  bottom: 20px;
  right: 100px;
  z-index: 1000;
}
.mask {
  background-color: $color-theme;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
}
.label-text {
  color: $color-inside;
  font-size: 16px;
  position: fixed;
  text-align: center;
  margin-top: 100px;
}
</style>
