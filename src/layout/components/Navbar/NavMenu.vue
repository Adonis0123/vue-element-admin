<!--
 * @Author: Hzh
 * @Date: 2020-08-17 09:44:27
 * @LastEditTime: 2020-08-17 17:46:59
 * @LastEditors: Hzh
 * @Description:一级菜单导航
-->
<template>
  <div class="nav-menu-container">
    <el-menu :default-active="activeMenu.path" mode="horizontal">
      <el-menu-item
        v-for="(route,index) in routes"
        :key="index"
        :index="route.path"
        @click="handleSelectMenu(route)"
      >{{ route | filterTitle }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
import path from 'path'
export default {
  name: 'MenuContainer',

  components: {},

  props: {},

  data() {
    return {
      activeMenu: {}, // 当前高亮的一级菜单
      linkToRootPath: ''
    }
  },

  computed: {
    ...mapGetters(['permission_routes', 'device']),
    menuList: {
      get() {
        return this.$store.state.menu.menuList
      },
      set(routes) {
        this.$store.dispatch('menu/setSiderbarList', routes)
      }
    },
    routes() {
      return this.permission_routes.filter((item) => !item.hidden)
    }
  },

  watch: {
    $route: {
      handler: function(newVal, oldVal) {
        this.handleSiderbarMenuList()
      },
      immediate: true
    },
    routes: {
      handler: function(newVal, oldVal) {
        this.handleSiderbarMenuList()
      }
    },
    device: {
      handler: function(newVal, oldVal) {
        this.handleSiderbarMenuList()
      }
    }
  },

  created() {},

  mounted() {},

  methods: {
    /**
     * @description: 获取侧边菜单栏的数据，移动端下，隐藏一级菜单，侧边栏菜单显示所有菜单
     */
    handleSiderbarMenuList() {
      if (this.device !== 'mobile') {
        this.matchActiveMenu(this.routes)
      } else {
        this.menuList = this.routes
      }
    },

    /**
     * @description: 遍历当前路由属于的菜单
     * @param {Array} routes 所有的菜单路由
     * $route.matched：一个数组，包含当前路由的所有嵌套路径片段的路由记录
     */
    matchActiveMenu(routes) {
      for (const router of routes) {
        if (this.$route.matched[0].path === '') {
          this.activeMenu = routes[0]
          this.menuList = routes[0].children
          this.$store.dispatch('menu/setRootPath', routes[0].path)
        } else if (this.$route.matched[0].path === router.path) {
          this.activeMenu = router
          this.menuList = router.children
          this.$store.dispatch('menu/setRootPath', router.path)
        }
      }
    },

    /**
     * @description: 点击一级菜单
     * @param {Object} route 当前点击的菜单
     */
    handleSelectMenu(route) {
      this.linkToRootPath = route.path
      this.linkToFirstPage(route)
    },

    /**
     * @description: 跳转页面选中菜单下第一个页面
     * @param {Object}  activeMenu 选中的菜单
     */
    linkToFirstPage(activeMenu, basePath = '') {
      const linkToPath = path.resolve(
        this.linkToRootPath,
        basePath,
        activeMenu.path
      )
      if (!activeMenu.children) {
        if (isExternal(activeMenu.path)) {
          window.location.href = activeMenu.path
        } else {
          this.$router.push(linkToPath) // this.$router.push({ name: activeMenu.name })
        }
      } else if (activeMenu.children && activeMenu.children.length) {
        this.linkToFirstPage(activeMenu.children[0], activeMenu.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu-container {
  height: 100%;
  width: 100%;
}
</style>
