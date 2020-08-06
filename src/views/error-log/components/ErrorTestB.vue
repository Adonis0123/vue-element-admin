<!--
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-06 10:56:54
 * @LastEditors: Hzh
 * @Description:
-->
<template>
  <div>
    {{ a }}
    <el-button @click="test">生成报错</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 'error'
    }
  },
  created() {
    // this.b = b // eslint-disable-line
  },
  methods: {
    test() {
      this.a.push(
        22
      )
    }
  }
}
</script>
