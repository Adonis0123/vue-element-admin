<!--
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-14 18:03:18
 * @LastEditors: Hzh
 * @Description: 侧边栏的菜单搜索
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <!-- 折叠状态，有img就展示img否则展示标题 -->
      <el-row v-if="collapse" class="sidebar-logo-link" type="flex" align="middle" justify="center">
        <hamburger :is-active="sidebar.opened" class="sidebar-logo" @toggleClick="toggleSideBar" />
      </el-row>
      <!-- 展开状态，判断是否有图片 -->
      <el-row v-else class="sidebar-logo-link" type="flex" align="middle">

        <header-search />
        <hamburger :is-active="sidebar.opened" class="sidebar-logo" @toggleClick="toggleSideBar" />
      </el-row>
    </transition>
  </div>
</template>

<script>
import { Hamburger, HeaderSearch } from 'components'
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  components: { Hamburger, HeaderSearch },
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sidebar', 'device'])
  },
  methods: {
    /**
     * @description: 展开或者收起侧边菜单栏
     */
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #383c48;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      vertical-align: middle;
      margin-right: 12px;
      ::v-deep .svg-icon{
        margin-right: 0!important;
        cursor: pointer;
        color: #fff;
      }
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      display: flex;
      align-content: center;
      justify-content: center;
      margin-right: 0px;
    }
  }
}
</style>
