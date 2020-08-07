<!--
 * @Author: Hzh
 * @Date: 2020-08-07 14:51:41
 * @LastEditTime: 2020-08-07 17:10:51
 * @LastEditors: Hzh
 * @Description:gis地图
-->
<template>
  <div v-loading="loading" class="chart-container" :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="no" />
  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {
      src: '../../../GISCHART.html',
      height: document.documentElement.clientHeight - 90 + 'px;',
      loading: true
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 230)
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 90 + 'px;'
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
