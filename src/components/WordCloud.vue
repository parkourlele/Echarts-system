<template>
  <div class="text-center">【关键词条】</div>
  <div ref="target" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
// console.log(props.data.datas);

const target = ref(null);
let myChart = null;
onMounted(async () => {
  myChart = echarts.init(target.value);
  await renderChart();
});
const randomRgb = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};
const renderChart = () => {
  myChart.setOption({
    series: [
      {
        type: "wordCloud",
        // 文字大小范围
        sizeRange: [8, 46],
        // 旋转
        rotationRange: [0, 0],
        grideSize: 0,
        layoutAnimation: true,
        textStyle: {
          color: randomRgb,
        },
        emphasis: {
          textStyle: {
            fontWeigth: "bold",
            color: "#000",
          },
        },
        data: props.data.datas,
      },
    ],
  });
};
watch(
  () => props.data,
  () => {
    renderChart();
  }
);
</script>
<style scoped>
</style>