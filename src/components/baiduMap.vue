<template>
  <div class="map" id="container"></div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  var map = new BMapGL.Map("container");
  var point = new BMapGL.Point(116.404, 39.915);
  map.centerAndZoom(point, 15);
  map.enableScrollWheelZoom(true);
  map.setMapType(BMAP_NORMAL_MAP); //地图模式
});
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
