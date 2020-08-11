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
    <!-- 头部 -->
    <el-header>
      <navbar />
    </el-header>

    <el-container class="app-container">
      <!-- 侧边栏 -->
      <el-aside>
        <sidebar class="sidebar-container" />
      </el-aside>

      <el-main :class="{hasTagsView:needTagsView}">
        <!-- 便签页 -->
        <tags-view v-if="needTagsView" />

        <!-- 内容 -->
        <el-scrollbar class="app-main-scroll">
          <app-main />
        </el-scrollbar>

        <!-- 右边设置 -->
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
  .el-header {
    height: 50px !important;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .app-container {
    overflow: hidden;
    .el-aside {
      height: calc(100vh - 50px);
      width: auto !important;
      padding: 0;
      margin-bottom: 0;
    }

    .el-main {
      padding: 0;
      height: calc(100vh - 50px);
      overflow: hidden;
      .app-main-scroll {
        width: 100%;
        height: 100%;
        overflow: hidden;
        ::v-deep .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        ::v-deep .el-scrollbar__view {
          background: #f0f0f0;
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}

// 如果有标签页的话
.hasTagsView {
  .app-main-scroll {
    height: calc(100% - 40px)!important; //40px tagsView的height
  }
}

//移动端下的阴影
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
