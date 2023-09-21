<template>
  <div class="text-center">【云端报警风险】</div>
  <div ref="target" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const target = ref(null);
let myChart = null;
onMounted(async () => {
  myChart = echarts.init(target.value);
  await renderChart();
});
const renderChart = () => {
  let max = ref(0);
  max = props.data.risks.map((e) => {
    return e.value;
  });
  myChart.setOption({
    title: {
      text: "",
    },
    legend: {
      data: [],
    },
    radar: {
      name: {
        show: true,
        fontSize: 12,
      },
      startAngle: 60, // 逆时针旋转60度
      indicator: props.data.risks.map((item) => ({
        name: item.name,
        max: Math.max(...max),
      })),
    },
    series: [
      {
        type: "radar",
        label: {
          show: true,
          fontSize: 10,
        },
        // 区域线条颜色
        itemStyle: {
          color: "#5840D4",
        },
        // 区域颜色
        areaStyle: {
          color: "#5840D4",
        },
        data: [
          {
            value: props.data.risks.map((item) => {
              return item.value;
            }),
            name: "Allocated Budget",
          },
        ],
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