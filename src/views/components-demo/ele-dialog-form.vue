<!--
 * @Author: Hzh
 * @Date: 2020-09-21 10:08:03
 * @LastEditTime: 2020-09-21 10:29:26
 * @LastEditors: Hzh
 * @Description:
-->
<template>
  <div class="components-container">
    <page-title ref="pageTitle" title="表单对话框组件：" />
    <el-button size="mini" class="add-btn" type="primary" @click="addEditVisible= true">点我</el-button>
    <dialog-form
      :visible.sync="addEditVisible"
      :operation="addEditOperation"
      :meta="addEditMeta"
    />
  </div>
</template>

<script>
import { DialogForm } from '@/components/Ele-comps'
import PageTitle from './PageTitle'
export default {
  name: '',

  components: { DialogForm, PageTitle },

  props: {},

  data() {
    return {
      addEditVisible: false, // 新增和编辑的弹窗访问标志
      addEditOperation: 'add', // 新增或编辑的标识
      addEditMeta: {} // 新增或编辑的信息
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
