<template>
  <div class="text-center">【大区数据信息】</div>
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
  myChart.setOption({
    xAxis: {
      show: false,
      type: "value",
      max: function (value) {
        return parseInt(value.max * 1.2);
      },
    },
    yAxis: {
      type: "category",
      data: props.data.regions.map((item) => {
        return item.name;
      }),
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#9eb1c8",
      },
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true,
    },
    series: [
      {
        data: props.data.regions.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          color: "#5D98CE",
          borderRadius: 5,
          shadowColor: "rgba(0,0,0,0.3)",
        },
        barWidth: 9,
        label: {
          show: true,
          position: "right",
          textStyle: {
            color: "#fff",
          },
        },
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