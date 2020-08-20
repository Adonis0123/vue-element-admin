/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-20 11:02:08
 * @LastEditors: Hzh
 * @Description:判断用户权限生成异步路由
 */
import router from './router/index'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // 从cookie获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration showSpinner 是否显示环形进度动画

const whiteList = ['/login', '/auth-redirect'] // 不需要登录就可以访问的页面

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 设置页面的标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录且跳转的页面是登录页，重定向到主页
      next({ path: '/' })
      NProgress.done() // 进度条完成 hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 判断是否已通过getInfo这个接口来获取角色权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          /**
           * 获取用户信息
           * 注意: roles 必须是一个 object array! 例如: ['admin'] or ,['developer','editor']
           */
          const { roles } = await store.dispatch('user/getInfo')

          // 根据角色的权限生成可访问的异步路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加异步路由
          router.addRoutes(accessRoutes)

          // hack方法，确保addRoutes已完成
          // replace 一个布尔类型，默认为false。如果replace设置为true，那么导航不会留下history记录，点击浏览器回退按钮不会再回到这个路由。
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token并且重新定向到登录页
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 处于登录白名单的路由，直接跳转
      next()
    } else {
      /**
       * 其他没有访问权限的页面将被重定向到登录页面
       * 登录成功之后将重定向到之前想跳转的页面
       */
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成 progress bar 加载
  NProgress.done()
})
