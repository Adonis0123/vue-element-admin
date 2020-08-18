import Vue from 'vue'
import Router from 'vue-router'
// import { swapArray } from '@/utils'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                  当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true              当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                               只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                               若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                               你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * sort: @type{Number}           左侧菜单会根据sort的数字升序排序，如果不设置，则默认排在最后，目前只支持一级菜单排序
 *
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'/'el-icon-x' 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  若果设置为true，它则会固定在tags-view中(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    activeMenu: '/example/list'  当路由设置了该属性，则会高亮相对应的侧边栏。
                                 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
                                 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
                                activeMenu: '/article/list'
  }
 */

/**
 * constantRoutes
 * 所有权限通用路由表
 * 如首页和登录页和一些不用权限的公用页面
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    sort: 1,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    sort: 2,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '项目文档', icon: 'documentation' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 异步挂载的路由
 * 动态需要根据权限加载的路由表
 */
export let asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    sort: 3,
    meta: {
      title: '权限测试页',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    sort: 11,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: '剪切板', icon: 'clipboard' }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    sort: 6,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    sort: 10,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: '标签页', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    sort: 7,
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    sort: 8,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: '错误日志', icon: 'bug' }
      }
    ]
  },

  {
    path: '/theme',
    component: Layout,
    sort: 9,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: '主题颜色', icon: 'theme' }
      }
    ]
  }
]

/**
 *
 * 自动导入modules里面的路由
 * 由于modules里面的路由都是异步路由，需要权限
 * 所以直接拼接到asyncRoutes即可
 */
const routerFiles = require.context('./modules', true, /\.js$/)

routerFiles.keys().forEach((fileName) => {
  if (routerFiles(fileName).default instanceof Array) {
    asyncRoutes = asyncRoutes.concat(routerFiles(fileName).default)
  } else {
    asyncRoutes.push(routerFiles(fileName).default)
  }
})

/*  404 页面必须放在最后 !!! */
asyncRoutes.push({ path: '*', redirect: '/404', hidden: true })

const createRouter = () => new Router({
  mode: 'history', // 生产环境需要后端支持
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

/**
 * @description: 重置 router
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
