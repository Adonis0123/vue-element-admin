/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-06 19:29:29
 * @LastEditors: Hzh
 * @Description:处理异步路由
 */
import { asyncRoutes, constantRoutes } from '@/router/index'

/**
 * 根据 meta.role 判断当前用户是否有权限
 * @param {Array}  roles  用户拥有的角色
 * @param {Array}  route  当前遍历到的路由
 * @returns {Boolean}
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 判断用户的权限
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 当前此路由不需要权限判断
    return true
  }
}

/**
 * @description: 递归过滤异步路由表
 * @param {Array}  routes 已经注册好的异步路由表
 * @param {Array}  roles  用户拥有的角色
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // 浅拷贝,只拷贝了一层
    // console.log(tmp)
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * @description: 根据路由表定义的一级菜单顺序进行排序
 * @param {Array}  routes 路由表
 */
function sortRoutes(routes) {
  const hiddenRoute = routes.filter(item => item.hidden)
  const menuRoute = routes.filter(item => !item.hidden)
  menuRoute.sort((a, b) => {
    const aSort = a.sort ? a.sort : 99
    const bSort = b.sort ? b.sort : 99
    return aSort - bSort
  })
  return menuRoute.concat(hiddenRoute)
}

const state = {
  routes: [], // 所有路由
  addRoutes: [] // 异步路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = sortRoutes(constantRoutes.concat(routes))
  }
}

const actions = {
  /**
   * @description: 根据权限生成异步路由
   * @param {Array} roles
   */
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        // 如果权限包含admin，则此用户拥有所有路由权限
        accessedRoutes = asyncRoutes || []
      } else {
        // 根据用户的角色分配权限
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
