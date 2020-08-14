<!--
 * @Author: Hzh
 * @Date: 2020-07-25 00:32:14
 * @LastEditTime: 2020-08-14 16:01:06
 * @LastEditors: Hzh
 * @Description:展开/收起
-->

<template>
  <div @click="toggleClick">
    <svg-icon :class="{'is-active':isActive}" class="hamburger" icon-class="fold" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px!important;
  height: 20px!important;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
