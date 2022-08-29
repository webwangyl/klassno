<template>
  <div class="container">
    <menu-header></menu-header>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
  <Grid></Grid>
</template>

<script lang="ts" setup>
import Grid from '@/components/grid.vue'
import MenuHeader from '@/components/base/header.vue'
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

</style>
