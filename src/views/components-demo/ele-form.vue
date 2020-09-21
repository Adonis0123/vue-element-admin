<!--
 * @Author: Hzh
 * @Date: 2020-08-20 16:25:26
 * @LastEditTime: 2020-09-21 10:05:54
 * @LastEditors: Hzh
 * @Description:
-->
<template>
  <div class="components-container">
    <page-title ref="pageTitle" title="表单组件：" />
    <ele-form />
  </div>
</template>

<script>
import { Form as EleForm } from '@/components/Ele-comps'
import PageTitle from './PageTitle'
export default {
  name: 'Form',

  components: { EleForm, PageTitle },

  props: {},

  data() {
    return {}
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
