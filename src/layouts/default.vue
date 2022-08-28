<template>
  <div class="container">
    <div class="header" v-show="!menuShow">
      <div
        class="logo"
        @mouseenter="HandleMouseEnter($event, 10, 10)"
        @mouseleave="HandleMouseLeave"
      >
        <img class="logo-content" src="@/assets/logo.svg" alt="" @click="toWelcome" />
      </div>
      <div
        class="tab"
        @click="expandTab(true)"
        @mouseenter="HandleMouseEnter($event, 20, 10)"
        @mouseleave="HandleMouseLeave"
      >
        <span>Enjoy The Silence</span>
        <i class="knofont knomenu"></i>
      </div>
    </div>
    <div class="main" v-show="!menuShow">
      <RouterView></RouterView>
    </div>
  </div>
  <div class="menu">
    <div class="menu-container" v-show="menuShow">
      <div class="header">
        <div
          class="logo"
          @mouseenter="HandleMouseEnter($event, 10, 10)"
          @mouseleave="HandleMouseLeave"
        >
          <img class="logo-content" src="@/assets/logo.svg" alt="" />
        </div>
        <div
          class="tab"
          @click="expandTab()"
          @mouseenter="HandleMouseEnter($event, 20, 10)"
          @mouseleave="HandleMouseLeave"
        >
          <span>Go Back</span>
          <i class="knofont knoback"></i>
        </div>
      </div>
      <img class="menu-bg" src="@/assets/images/menu.png" alt="" @click="toWelcome" />
      <ul class="menu-list">
        <li
          class="menu-item"
          v-for="(item, index) in menuList"
          :key="item.key"
          v-disperse="{ gutter: index + 1 }"
          @mouseenter="HandleMouseEnter($event, 30, 0)"
          @mouseleave="HandleMouseLeave"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
  <div class="grid">
    <div class="parallax" style="transform: translateY(0)">
      <div class="line horizontal" style="transform: translateY(-15px)"></div>
      <div class="line horizontal" style="transform: translateY(318px)"></div>
      <div class="line horizontal" style="transform: translateY(651px)"></div>
      <div class="line horizontal" style="transform: translateY(984px)"></div>
      <div class="line horizontal" style="transform: translateY(1317px)"></div>
      <div class="line horizontal" style="transform: translateY(1650px)"></div>
      <div class="line horizontal" style="transform: translateY(1983px)"></div>
      <div class="line horizontal" style="transform: translateY(2316px)"></div>
      <div class="line horizontal" style="transform: translateY(2649px)"></div>
      <div class="line horizontal" style="transform: translateY(2982px)"></div>
      <div class="line horizontal" style="transform: translateY(3315px)"></div>
      <div class="line horizontal" style="transform: translateY(3648px)"></div>
    </div>
    <div class="line vertical" style="transform: translateX(-15px)"></div>
    <div class="line vertical" style="transform: translateX(193px)"></div>
    <div class="line vertical" style="transform: translateX(526px)"></div>
    <div class="line vertical" style="transform: translateX(859px)"></div>
    <div class="line vertical" style="transform: translateX(1192px)"></div>
    <div class="line vertical" style="transform: translateX(1525px)"></div>
    <div class="line vertical" style="transform: translateX(1826px)"></div>
  </div>
</template>

<script lang="ts" setup>
import gsap from "gsap";
import { ref, onMounted, onBeforeUnmount, initCustomFormatter } from "vue";
import useGridTransform, { GridTransform } from "../hooks/useGridTransform";
import router from "../router";
import { useStore } from "../store";

const store = useStore();

const menuList = store.state.menuList;
let menuShow = ref<boolean>(false);
const menuLine = gsap.timeline();
let timer;
let letterLine;

const expandTab = (flag?: boolean) => {
  if (flag) {
    menuLine.to(".menu", { zIndex: 100, duration: 0.1 }).to(".menu", {
      width: window.innerWidth,
      height: window.innerHeight,
      x: 60,
      y: -40,
      duration: 0.5,
      onComplete: () => {
        menuShow.value = true;
        letterLine.restart(true, false);
      },
    });
  } else {
    menuShow.value = false;
    letterLine.pause();
    menuLine.to(".menu", {
      width: "40px",
      height: "40px",
      x: 0,
      y: 0,
      zIndex: -1,
      duration: 0.5,
    });
  }
};
const horizontalY = [];
const verticalX = [];
let yIndex = [];
let xIndex = [];
let horizontal: HTMLCollection;
let vertical: HTMLCollection;
let gridTransform: GridTransform;

const initLetterTimeline = () => {
  letterLine = gsap.timeline();
  letterLine
    .to(".red", {
      opacity: 0,
      x: 0,
      y: 0,
      duration: 0.5,
      delay: 1.94,
    })
    .to(
      ".green",
      {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        delay: 1.94,
      },
      "<-=1.94"
    )
    .to(
      ".yellow",
      {
        opacity: 0,
        duration: 0.5,
        delay: 0.94,
      },
      "<-=1.94"
    )
    .to(
      ".default",
      {
        opacity: 0.7,
        duration: 0.5,
        delay: 1.42,
      },
      "<-=0.94"
    )
  letterLine.pause();
};
onMounted(() => {
  window.addEventListener("resize", resize);
  horizontal = document.getElementsByClassName("horizontal");
  vertical = document.getElementsByClassName("vertical");
  Array.from(horizontal).forEach((el) => {
    const rect = el.getBoundingClientRect();
    horizontalY.push(rect.y);
  });
  Array.from(vertical).forEach((el) => {
    const rect = el.getBoundingClientRect();
    verticalX.push(rect.x);
  });
  gridTransform = useGridTransform({
    vertical,
    verticalX,
    xIndex,
    horizontal,
    horizontalY,
    yIndex,
  });
  initLetterTimeline();
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
});
const HandleMouseEnter = (e: MouseEvent, Xoffset: number, Yoffset: number) => {
  gridTransform.HandleMouseEnter(e, Xoffset, Yoffset);
};
const HandleMouseLeave = () => gridTransform.HandleMouseLeave();
const toWelcome = () => {
	store.commit('SET_STATUS', false)
	router.replace('/')
}
const resize = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    expandTab(menuShow.value);
  }, 200);
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  .main {
    width: 100%;
    overflow: auto;
  }
  .main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.header {
  height: 120px;
  width: 100%;
  padding: 0 60px 0;
  z-index: 100;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  .logo {
    cursor: pointer;
    width: 50px;
    .logo-content {
      width: 100%;
    }
  }
  .tab {
    cursor: pointer;
    color: rgba($color-inside, 0.8);
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 100;
    transition: background-position 1s linear;
    background-position: top left;
    background-image: linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      $color-inside 50%
    );
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200%;
    background-color: $color-theme;
    .knofont {
      font-size: 16px;
      vertical-align: middle;
      margin-left: 12px;
    }
  }
  .tab:hover {
    background-position: top right;
  }
}
.menu {
  position: fixed;
  width: 40px;
  height: 40px;
  top: 40px;
  right: 60px;
  z-index: -1;
  background-color: $color-theme;
  .menu-container {
    height: 100%;
    .menu-list {
      display: flex;
      height: calc(100% - 120px);
      flex-direction: column;
      align-items: flex-end;
      padding-right: 200px;
      justify-content: center;
      .menu-item {
        margin: 30px;
        padding: 12px;
        cursor: pointer;
        transition: transform 0.5s linear;
      }
    }
    .menu-bg {
      height: 600px;
      position: absolute;
      left: 150px;
      top: 50%;
      transform: translateY(-50%);
	  animation: slow-translateY 10s infinite;
    }
  }
}
.grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  pointer-events: none;
  opacity: 0.8;
  transition: opacity 0.3s;
  will-change: transform;
  z-index: 1000;
  .parallax {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    will-change: transform;
    .line.horizontal {
      height: 1px;
      width: 100vw;
      left: 0;
    }
  }
  .line {
    position: absolute;
    opacity: 0.2;
    transition: transform 0.6s cubic-bezier(0.75, 0, 0.25, 1);
    transition-delay: 0;
    background-color: $color-inside;
  }
  .vertical {
    left: 0;
    width: 1px;
    height: 100vh;
  }
}
</style>
