<template>
  <div class="map" id="container"></div>
  <div id="result">
    <el-button type="danger" @click="save()">保存</el-button>
    <el-button type="primary" @click="draw()">编辑</el-button>
    <div class="ml-[10px]">
      <span>危险等级: </span>
      <el-select
        v-model="hazardLevel"
        placeholder="Select"
        style="width: 100px"
      >
        <el-option
          v-for="item in hazardLevelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="ml-[10px]">
      <span>围栏类型: </span>
      <el-select v-model="railType" placeholder="Select" style="width: 100px">
        <el-option
          v-for="item in railTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>
<script setup>
import MainApi from "@api/MainApi";
import { addOverlay, fenceList } from "@utils/map";
import { onMounted, ref } from "vue";

const hazardLevelOptions = [
  {
    value: 1,
    label: '低',
  },
  {
    value: 2,
    label: '中',
  },
  {
    value: 3,
    label: '高',
  },
];

const railTypeOptions = [
  {
    value: 1,
    label: "内圈",
  },
  {
    value: 2,
    label: "外圈",
  },
];

const styleOptions = {
  strokeColor: "#5E87DB", // 边线颜色
  fillColor: "#5E87DB", // 填充颜色。当参数为空时，圆形没有填充颜色
  strokeWeight: 2, // 边线宽度，以像素为单位
  strokeOpacity: 1, // 边线透明度，取值范围0-1
  fillOpacity: 0.2, // 填充透明度，取值范围0-1
};
const labelOptions = {
  borderRadius: "2px",
  background: "#FFFBCC",
  border: "1px solid #E1E1E1",
  color: "#703A04",
  fontSize: "12px",
  letterSpacing: "0",
  padding: "5px",
};

const hazardLevel = ref(1);
const railType = ref(1);
const currentOverlay = ref();
const overlayList = ref([]);

let map;
// 实例化鼠标绘制工具
let drawingManager;

onMounted(() => {
  map = new BMapGL.Map("container");
  fenceList(map, deleteFence);
  var point = new BMapGL.Point(110.989311, 35.610962);
  map.centerAndZoom(point, 15);
  map.enableScrollWheelZoom(true);
  map.setMapType(BMAP_SATELLITE_MAP); //地图模式

  drawingManager = new BMapGLLib.DrawingManager(map, {
    // isOpen: true,        // 是否开启绘制模式
    enableCalculate: false, // 绘制是否进行测距测面
    enableSorption: true, // 是否开启边界吸附功能
    sorptiondistance: 20, // 边界吸附距离
    circleOptions: styleOptions, // 圆的样式
    polylineOptions: styleOptions, // 线的样式
    polygonOptions: styleOptions, // 多边形的样式
    rectangleOptions: styleOptions, // 矩形的样式
    labelOptions: labelOptions, // label样式
  });

  drawingManager.addEventListener("overlaycomplete", overlaycomplete);
});

function draw() {
  var drawingType = BMAP_DRAWING_POLYGON;
  // 进行绘制
  if (
    drawingManager._isOpen &&
    drawingManager.getDrawingMode() === drawingType
  ) {
    drawingManager.close();
  } else {
    drawingManager.setDrawingMode(drawingType);
    drawingManager.open();
  }
}

function save() {
  if (currentOverlay.value) {
    let params = {
      inner_or_outer: currentOverlay.value.inner_or_outer,
      fence_level: currentOverlay.value.fence_level,
      vertexes: currentOverlay.value.overlay.getPath(),
      coord_type: "bd09ll",
    };

    MainApi.createFence(params)
      .then((res) => {
        res.data.vertexes = res.data.vertexes.map((item) => {
          return new BMapGL.Point(item.lng, item.lat);
        });
        overlayList.value.push(res.data);
        addOverlay(map, res.data, deleteFence);
        map.removeOverlay(currentOverlay.value.overlay);
        currentOverlay.value = null;
      })
      .finally(() => {
        drawingManager.close();
      });
  }
}

function overlaycomplete(e) {
  currentOverlay.value = {
    overlay: e.overlay,
    inner_or_outer: railType.value,
    fence_level: hazardLevel.value,
  };
}

function deleteFence(data, polygon) {
  ElMessageBox.confirm("确定需要删除此围栏", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    MainApi.deleteFence({ fence_ids: [data.fence_id] }).then((res) => {
      map.removeOverlay(polygon);
    });
  });
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}
#result {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px #bbb;
  z-index: 999;
  display: flex;
}
</style>
