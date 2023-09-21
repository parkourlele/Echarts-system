<template>
  <div
    v-if="data"
    class="bg-[url('assets/imgs/bg.png')] bg-cover bg-current h-screen text-white p-5 flex overflow-hidden"
  >
    <!-- 左 -->
    <div class="flex flex-col flex-1 p-2 mr-2 bg-opacity-50 bg-slate-800">
      <HorizontalBar class="box-border pb-2 h-1/3" :data="data.regionData" />
      <RadarBar class="box-border pb-2 h-1/3" :data="data.riskData"/>
      <Relation class="h-1/3" :data="data.relationData"/>
    </div>
    <!-- 中 -->
    <div class="flex flex-col w-1/2 mr-5">
      <TotalData class="p-2 bg-opacity-50 bg-slate-800" :data="data.totalData"/>
      <MapChart class="flex-1 p-2 mt-2 bg-opacity-50 bg-slate-800" :data="data.mapData"/>
    </div>
    <!-- 右 -->
    <div class="flex flex-col flex-1 p-2 bg-opacity-50 bg-slate-800">
      <VerticalBar class="box-border pb-2 h-1/3" :data="data.serverData"/>
      <RingBar class="box-border pb-2 h-1/3" :data="data.abnormalData"/>
      <WordCloud class="box-border h-1/3" :data="data.wordCloudData"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HorizontalBar from "./components/HorizontalBar.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";

import TotalData from "./components/TotalData.vue";
import MapChart from "./components/MapChart.vue";

import VerticalBar from "./components/VerticalBar.vue";
import RingBar from "./components/RingBar.vue";
import WordCloud from "./components/WordCloud.vue";

import { getVisualization } from "./api/visualization.js";

const data = ref(null);

const lacalData = async () => {
  data.value = await getVisualization();
};
lacalData();
// 3秒查询一次
setInterval(() => {
  lacalData();
}, 3000);
</script>
<style scoped></style>