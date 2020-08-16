<template>
  <el-row type="flex" align="middle" class="navbar" :class="{'mobile':device === 'mobile'}">
    <template v-if="device==='mobile'">
      <el-col class="hamburger-container" @click.native="toggleSideBar">
        <hamburger class="hamburger" :is-active="sidebar.opened" />
      </el-col>
    </template>

    <div class="title" :style="{color:theme}">
      <el-image class="title-item logo" :src="logo" fit="contain" />
      <div class="title-item">Vue Element Admin</div>
    </div>

    <div class="left-menu">
      <template v-if="device!=='mobile'">我是一级菜单导航</template>
    </div>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item hover-effect" />

        <el-tooltip content="全屏模式" effect="dark" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown trigger="click" class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img :src="manAvatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://panjiachen.gitee.io/vue-element-admin/#/">
            <el-dropdown-item>项目在线地址</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD"
          >
            <el-dropdown-item>项目文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { logo } from 'imgs'
import {
  // Breadcrumb,
  Hamburger,
  ErrorLog,
  Screenfull,
  SizeSelect
  // HeaderSearch
} from 'components'
import avatar from '@/assets/imgs/avatar.png'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect
    // HeaderSearch
  },
  data() {
    return {
      manAvatar: avatar,
      logo: logo
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    theme() {
      return this.$store.state.settings.theme
    }
  },
  methods: {
    /**
     * @description: 展开或者收起侧边菜单栏
     */
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    /**
     * @description: 退出登录
     */
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #fff;

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .title {
    width: auto;
    height: 100%;
    padding: 0 19px;
    flex: none;
    font-size: 18px;
    font-weight: 400;
    &-item {
      line-height: 50px;
      display: inline-block;
      vertical-align: middle;
    }
    .logo {
      margin-right: 8px;
      width: 40px;
      height: 40px;
    }
  }

  .left-menu {
    display: flex;
    align-items: center;
    height: 100%;
    // width: calc(100% - 272px); //272px hamburger-container + right-menu
    flex: 1;
  }

  .right-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    line-height: 50px;
    width: 222px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      display: flex;
      align-items: center;
      .avatar-wrapper {
        // margin-top: 5px;
        display: flex;
        align-items: center;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.mobile {
  .hamburger-container {
    height: 100%;
    width: 25px;
    cursor: pointer;
    transition: width 0.3s;
    position: relative;
    .hamburger {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 25px;
      width: 100%;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  // .left-menu {
  //   // width: calc(100% - 136px);
  //   // flex-grow: 1;
  // }
  .right-menu {
    width: 86px;
  }
}
</style>
