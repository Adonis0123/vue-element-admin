<!--
 * @Author: Hzh
 * @Date: 2020-07-25 00:32:14
 * @LastEditTime: 2020-08-10 18:07:44
 * @LastEditors: Hzh
 * @Description:主体内容
-->

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    /**
     * @description: 需要缓存的页面
     */
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*头部的高度  50= navbar  50*/
  min-height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /*头部的高度加标签页的高度  90 = navbar + tags-view = 50 + 40 */
    min-height: calc(100vh - 90px);
  }

  .fixed-header + .app-main {
    padding-top: 90px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
