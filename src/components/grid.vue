<template>
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

<style lang="scss" scoped>
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