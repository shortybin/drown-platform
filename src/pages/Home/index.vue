<template>
  <div class="map" id="container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { fenceList } from "@utils/map";
let map;

onMounted(() => {
  map = new BMapGL.Map("container");
  fenceList(map);
  var point = new BMapGL.Point(110.989311, 35.610962);
  map.centerAndZoom(point, 15);
  map.enableScrollWheelZoom(true);
  map.setMapType(BMAP_SATELLITE_MAP); //地图模式
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}</style>
