<template>
  <RouterView></RouterView>
  <div class="fixed-footer">
    <div class="i18n-box">
      <span class="i18n" :class="{ select: language === 'CH' }">CH</span>
      <span class="i18n" :class="{ select: language === 'EN' }">EN</span>
    </div>
    <Music class="root-music"></Music>
    <div class="i18n-box">
      <span
        class="i18n theme"
        :class="{ select: theme === 'dark' }"
        @click="choose(dark)"
        >Dark</span
      >
      <span
        class="i18n theme"
        :class="{ select: theme === 'light' }"
        @click="choose(light, 'light')"
        >Light</span
      >
    </div>
  </div>
  <audio id="audio" loop src="/media/minecraft.mp3">
    几几年了？还用那垃圾浏览器
  </audio>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref } from "vue";
import dark from './theme/dark'
import light from './theme/light'
import { Itheme } from './theme/Itheme'
import { useStore } from "./store";
import Music from "./components/base/music.vue";

const store = useStore();
let audio: HTMLAudioElement;

const language = "EN";
let theme = ref("");

let app: HTMLElement;

const choose = (themeList: Itheme[], s?: string):void => {
  theme.value = s || 'dark'
  store.commit('SET_THEME', theme.value)
  themeList.forEach((item) => {
    app.style.setProperty(item.key, item.value);
  });
};

const status = computed(() => {
  return store.state.audioStatus;
});

watch(status, (nval) => {
  if (nval) {
    audio.play();
  } else {
    audio.pause();
  }
});

onMounted(() => {
  audio = document.getElementById("audio") as HTMLAudioElement;
  app = document.documentElement;
  choose(dark)
});
</script>

<style lang="scss" scoped>
.fixed-footer {
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 30px;
  z-index: 1000;
  padding-right: 60px;
  .root-music {
    margin: 0 20px;
  }
}
.i18n-box {
  .theme {
    letter-spacing: 1.3px;
  }
  .i18n {
    color: var(--primary-text);
    cursor: pointer;
    margin: 10px;
    transition: color ease 0.25s;
    font-size: 12px;
  }
  .i18n:hover,
  .i18n.select {
    color: var(--color-inside);
  }
}
</style>
