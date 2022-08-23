<template>
  <RouterView></RouterView>
  <div class="i18n-box">
    <span class="i18n" :class="{ 'select': language === 'CH' }">CH</span>
    <span class="i18n" :class="{ 'select': language === 'EN' }">EN</span>
  </div>
  <Music class="root-music"></Music>
  <audio id="audio" loop src="/media/minecraft.mp3">几几年了？还用那垃圾浏览器</audio>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { onMounted, watch, computed } from "vue";
import { useStore } from './store'
import Music from "./components/base/music.vue";

const store = useStore()
let audio: HTMLAudioElement;

const language = 'CH'

const status = computed(() => {
  return store.state.audioStatus
})

watch(status, (nval) => {
  if (nval) {
    audio.play();
  } else {
    audio.pause();
  }
})

onMounted(() => {
  audio = document.getElementById('audio') as HTMLAudioElement
});
</script>

<style lang="scss" scoped>
.root-music {
  position: fixed;
  bottom: 20px;
  right: 100px;
  z-index: 1000;
}
.i18n-box {
  position: fixed;
  bottom: 28px;
  right: 200px;
  z-index: 1000;
  .i18n {
    color: $primary-text;
    cursor: pointer;
    margin: 10px;
    transition: color ease 0.25s;
  }
  .i18n:hover, .i18n.select {
    color: $color-inside;
  }
}
</style>
