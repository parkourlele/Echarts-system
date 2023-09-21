<template>
  <div class="text-center">【数据传递信息】</div>
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
    },
    yAxis: {
      show: false,
      type: "value",
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 0,
      left: 0,
      containLabel: true,
    },
    series: [
      {
        type: "graph",
        label: "none",
        coordinateSystem: "cartesian2d",
        symbolSize: 26,
        z: 3,
        // 边界标签文字
        edgeLabel: {
          normal: {
            show: true,
            color: "#fff",
            textStyle: {
              fontSize: 12,
            },
            formatter: (params) => {
              return params.data.speed.value;
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: "bottom",
            color: "#5E5E5E",
          },
        },
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 8,
        data: props.data.relations.map((item) => {
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value,
            };
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: {
                    colorStops: [
                      {
                        offset: 0,
                        color: "#157eff",
                      },
                      {
                        offset: 1,
                        color: "#35c2ff",
                      },
                    ],
                  },
                },
              },
              label: {
                normal: {
                  fontSize: "14",
                },
              },
            };
          }
        }),
        links: props.data.relations.map((item, index) => ({
          source: item.source,
          target: item.target,
          // 底层箭头线样式
          lineStyle: {
            curveness: 0.1,
          },
          speed: {
            normal: {
              color: "#12b5d0",
              curveness: 0.2,
            },
            value: `${item.speed}kb/s`,
          },
          label: {
            show: true,
            position: "middle",
            offset: [10, 0],
          },
        })),
      },
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        effect: {
          show: true,
          smooth: false,
          trailLength: 0.1,
          symbol: "arrow",
          color: "rgba(55,255,255,0.6)",
          symbolSize: 12,
        },
        // 运动箭头样式
        lineStyle: {
          normal: {
            curveness: 0.1,
          },
        },
        data: [
          [{ coord: [0, 300] }, { coord: [50, 200] }],
          [{ coord: [0, 100] }, { coord: [50, 200] }],
          [{ coord: [50, 200] }, { coord: [100, 100] }],
          [{ coord: [50, 200] }, { coord: [100, 300] }],
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