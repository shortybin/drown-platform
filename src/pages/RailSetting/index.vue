<template>
  <div id="map-box">
    <BaiduMap />
  </div>
</template>

<script setup>
import BaiduMap from "@components/baiduMap.vue";
</script>

<style scoped>
#map-box {
  display: flex;
  width: 100%;
  height: calc(100% - 45px);
}
</style>
