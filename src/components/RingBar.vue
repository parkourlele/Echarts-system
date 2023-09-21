<template>
  <div class="text-center">【大区异常处理】</div>
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
const getSeriesData = () => {
  const series = [];
  props.data.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      type: "pie",
      // 逆时针排列
      clockWise: false,
      // 鼠标放上大小无变化
      hoverAnimation: false,
      //   半径
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      //   中心点
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        {
          value: item.value,
          name: item.name,
        },
        {
          // 最大值
          value: 1000,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: {
            show: false,
          },
        },
      ],
    });
    // 底层
    series.push({
      name: item.name,
      type: "pie",
      silent: true,
      z: 1,
      clockWise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: "rgba(3,31,62)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
        {
          value: 2.5,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });
  });

  return series;
};
const renderChart = () => {
  myChart.setOption({
    // 提示
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{a}<br>{b}:{c}({d}%)",
    },
    // 图例配置
    legend: {
      show: true,
      icon: "circel",
      top: "14%",
      left: "60%",
      data: props.data.abnormals.map((item) => item.name),
      with: -5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
        fontSize: 12,
        lineHeight: 5,
        color: "rgba(255,255,255,0.8)",
      },
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLine: {
          show: false,
        },
      },
    ],
    xAxis: [
      {
        show: false,
      },
    ],
    series: getSeriesData(),
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