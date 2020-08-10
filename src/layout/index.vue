<template>
  <!-- <el-scrollbar class="app-wrapper-scroll"> -->
  <!-- <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </div>
  </div>-->

  <el-container :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <el-header>
      <navbar />
    </el-header>

    <el-container class="app-container">
      <el-aside>
        <sidebar class="sidebar-container" />
      </el-aside>

      <el-main>
        <tags-view v-if="needTagsView" />
        <el-scrollbar class="app-main-scroll">
          <app-main />
        </el-scrollbar>
        <right-panel v-if="showSettings">
          <settings />
        </right-panel>
      </el-main>
    </el-container>
  </el-container>
  <!-- </el-scrollbar> -->
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-main-scroll {
  width: 100%;
  height: calc(100% - 40px); //40px tagsView的height
  overflow: hidden;
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.el-header {
  height: 50px!important;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-main {
  padding: 0;
  height: calc(100vh - 50px);
  overflow: hidden;
}

.el-aside {
  width: auto !important;
  padding: 0;
  margin-bottom: 0;
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.app-container {
  padding: 0;
  overflow: hidden;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 99;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
