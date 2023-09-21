<template>
  <div class="text-center">【服务资源占用比】</div>
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
let myChart = ref(null);
onMounted(async () => {
  myChart = echarts.init(target.value);
  await renderChart();
});
const renderChart = () => {
  myChart.setOption({
    xAxis: {
      type: "category",
      data: props.data.servers.map((item) => {
        return item.name;
      }),
    },
    yAxis: {
      show: false,
      type: "value",
      max: function (value) {
        return parseInt(value.max * 1.2);
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
        data: props.data.servers.map((item) => {
          return item.value;
        }),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(0,0,0,0)",
        },
        itemStyle: {
          color: "#5D98CE",
          borderRadius: 5,
          shadowColor: "rgba(0,0,0,0.3)",
        },
        barWidth: 9,
        label: {
          show: true,
          position: "top",
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