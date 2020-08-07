<!--
 * @Author: Hzh
 * @Date: 2020-08-07 17:09:47
 * @LastEditTime: 2020-08-07 17:10:05
 * @LastEditors: Hzh
 * @Description:ifame组件
-->
<template>
  <div v-loading="loading" :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      height: document.documentElement.clientHeight - 90 + 'px;',
      loading: true
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.loading = false
    }, 230)
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 90 + 'px;'
    }
  }
}
</script>
