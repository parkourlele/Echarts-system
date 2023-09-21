<template>
  <div ref="target" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import mapJson from "@/assets/mapData/china.json";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
console.log(props.data);

const target = ref(null);
let myChart = null;
onMounted(async () => {
  echarts.registerMap("china", mapJson);
  myChart = echarts.init(target.value);
  await renderChart();
});
const options = {
  timeline: {
    data: props.data.voltageLevel,
    axisType: "category",
    autoPlay: true,
    playInterval: 2000,
    left: "10%",
    right: "10%",
    bottom: "0%",
    width: "80%",
    label: {
      normal: {
        textStyle: {
          color: "#ddd",
        },
      },
      emphasis: {
        textStyle: {
          color: "#fff",
        },
      },
    },
    symbolSize: 10,
    lineStyle: {
      color: "#555",
    },
    checkpointStyle: {
      borderColor: "#888",
      borderWidth: 2,
    },
    controlStyle: {
      showNextBtn: true,
      showPrevBtn: true,
      normal: {
        color: "#666",
        borderColor: "#666",
      },
      emphasis: {
        color: "#aaa",
        borderColor: "#aaa",
      },
    },
  },
  baseOption: {
    grid: {
      top: "15%",
      right: "2%",
      bottom: "10%",
      width: "20%",
    },
    geo: {
      show: true,
      map: "china",
      roma: true,
      zoom: 0.8,
      center: [113.83531246, 34.0267395887],
      itemStyle: {
        normal: {
          color: "rgba(147,135,248,0.2)",
          borderWidth: 1,
          areaType: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147,135,248,1)",
              },
              {
                offset: 1,
                color: "rgba(147,135,248,0.2)",
              },
            ],
          },
        },
        emphasis: {
          areaColor: "#389bb7",
          borderWidth: 0,
        },
      },
    },
  },
  options: [],
};
props.data.voltageLevel.forEach((item, index) => {
  options.options.push({
    backgroundColor: "#142037",
    title: [
      {
        text: "2019-2023年度数据统计",
        left: "0%",
        top: "0%",
        textStyle: {
          color: "#ccc",
          fontSize: 30,
        },
      },
      {
        id: "statistic",
        text: item + "年度统计情况",
        right: "0%",
        top: "4%",
        textStyle: {
          color: "#ccc",
          fontSize: 20,
        },
      },
    ],
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{b}:{c}",
    },
    xAxis: {
      type: "value",
      scale: true,
      position: "top",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 2,
        textStyle: {
          color: "#aaa",
        },
      },
    },
    yAxis: {
      type: "category",
      // 轴线
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ddd",
        },
        // 刻度尺
        axisTick: {
          show: false,
        },
        // 标签
        label: {
          interval: 0,
          textStyle: {
            color: "#ddd",
          },
        },
      },
      data: props.data.categoryData[item].map((item) => item.name),
    },
    series: [
      {
        type: "bar",
        zlevel: 1.5,
        itemStyle: {
          normal: {
            color: props.data.colors[index],
          },
        },
        data: props.data.categoryData[item].map((item) => item.value),
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        data: props.data.topData[item],
        symbolSize: function (value) {
          return value[2] / 5;
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: props.data.colors[index],
                shadowBlur: 5,
                shadowColor: props.data.colors[index]
            }
        }
      },
    ],
  });
});
const renderChart = () => {
  myChart.setOption(options);
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