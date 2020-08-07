<!--
 * @Author: Hzh
 * @Date: 2020-08-07 16:43:15
 * @LastEditTime: 2020-08-07 16:50:52
 * @LastEditors: Hzh
 * @Description:
-->
<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/CompositePieChart'

export default {
  name: 'MixChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 90px);
}
</style>
