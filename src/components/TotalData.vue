<template>
  <div class="p-6">
    <div class="text-center text-slate-300">
      数据总量：
      <span
        ref="totalCountTarget"
        class="text-gradient font-[Electronic] text-7xl ml-2 mr-2 font-bold"
        >679,473,929</span
      >
      条记录
    </div>
    <div class="flex flex-wrap mt-3">
      <div class="w-1/3 text-sm text-center text-slate-400">
        华北：
        <span ref="city1" class="font-[Electronic] text-[#5dc5ef] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-sm text-center text-slate-400">
        东北：
        <span ref="city2" class="font-[Electronic] text-[#5dc5ef] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-sm text-center text-slate-400">
        华东：
        <span ref="city3" class="font-[Electronic] text-[#5dc5ef] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-sm text-center text-slate-400">
        中南：
        <span ref="city4" class="font-[Electronic] text-[#5dc5ef] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-sm text-center text-slate-400">
        西南：
        <span ref="city5" class="font-[Electronic] text-[#5dc5ef] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-sm text-center text-slate-400">
        西北：
        <span ref="city6" class="font-[Electronic] text-[#5dc5ef] text-3xl"
          >8,778,988</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import * as echarts from "echarts";
import { CountUp } from "countup.js";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
// console.log(props.data);

const totalCountTarget = ref(null);
const city1 = ref(null);
const city2 = ref(null);
const city3 = ref(null);
const city4 = ref(null);
const city5 = ref(null);
const city6 = ref(null);

// const target = ref(null);
// let myChart = null;
onMounted(async () => {
  new CountUp(totalCountTarget.value, props.data.total).start();
  new CountUp(city1.value, props.data.hb).start();
  new CountUp(city2.value, props.data.db).start();
  new CountUp(city3.value, props.data.hd).start();
  new CountUp(city4.value, props.data.zn).start();
  new CountUp(city5.value, props.data.xn).start();
  new CountUp(city6.value, props.data.xb).start();
  // myChart = echarts.init(target.value);
  // await renderChart();
});
// const renderChart = () => {
//   myChart.setOption({});
// };
// watch(
//   () => props.data,
//   () => {
//     renderChart();
//   }
// );
</script>
<style scoped>
</style>