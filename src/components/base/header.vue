<template>
    <div class="header"  v-show="!menuShow">
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
          @click="jumpVertify(item.url, index)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { onMounted, ref } from 'vue'
import router from "../../router";
import { useStore } from '../../store'
import useGridTransform, { GridTransform } from "../../hooks/useGridTransform";

const store = useStore()
let timer: number;

const menuList = store.state.menuList

let menuShow = ref(false)
const menuLine = gsap.timeline();
let letterLine;

let gridTransform: GridTransform;

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
  gridTransform = useGridTransform();
  initLetterTimeline();
});

const HandleMouseEnter = (e: MouseEvent, Xoffset: number, Yoffset: number) => {
  gridTransform.HandleMouseEnter(e, Xoffset, Yoffset);
};
const HandleMouseLeave = () => gridTransform.HandleMouseLeave();

const toWelcome = () => {
	store.commit('SET_STATUS', false)
	router.replace('/')
}

const jumpVertify = (url: string, index: number) => {
    const currentPath = router.currentRoute?.value?.fullPath
    if (url == currentPath) {
        expandTab()
    } else {
        router.push(url)
    }
}

const resize = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    expandTab(menuShow.value);
  }, 200);
};

</script>

<style lang="scss" scoped>
.header {
  height: 120px;
  width: 100%;
  padding: 0 60px;
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
</style>
