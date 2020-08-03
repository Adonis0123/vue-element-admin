/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-04 00:26:54
 * @LastEditors: Hzh
 * @Description:标签操作
 */

const state = {
  visitedViews: [], // 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
  cachedViews: [] // 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) { return }
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  /* 删除访问的视图 */
  DEL_VISITED_VIEW: (state, view) => {
    // entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
    for (const [i, v] of state.visitedViews.entries()) {
      // console.log(i, v)
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
    // 等效于
    // for (let i = 0; i < state.visitedViews.length; i++) {
    //   if (state.visitedViews[i].path === view.path) {
    //     state.visitedViews.splice(i, 1)
    //     break
    //   }
    // }
  },

  /* 删除缓存的视图 */
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  /* 删除其他视图，除了在router设置了affix或当前选中的视图 */
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },

  /* 删除其他缓存的视图，除了当前选中的缓存视图  */
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1) // 等同于state.cachedViews = [view.name]
    } else {
      // 如果index = -1 则说明没有缓存的视图
      state.cachedViews = []
    }
  },

  /* 删除所有访问的视图,除了在router设置固定的标签栏 */
  DEL_ALL_VISITED_VIEWS: state => {
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },

  /* 删除所有缓存的视图 */
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  /**
   * @description: 删除单个标签
   * @param {Object} view 标签
   */
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },

  /**
   * @description: 删除访问的视图
   * @param {Object} view 标签
   * @returns {Object}
   */
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },

  /**
   * @description: 删除缓存的视图
   * @param {Object} view 标签
   * @returns {Object}
   */
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  /**
   * @description: 删除其他标签
   * @param {Object} view 当前选中的标签
   */
  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },

  /**
   * @description: 删除其他视图
   * @param {Object} view 标签
   */
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },

  /**
   * @description: 删除缓存视图
   * @param {Object} view 标签
   */
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  /**
   * @description: 删除所有标签
   * @param {Object} view 当前选中的标签
   */
  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },

  /**
   * @description: 删除所有访问的视图
   * @param {Object} view 标签
   * @returns {Object}
   */
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },

  /**
   * @description: 删除所有缓存的视图
   * @param {Object} view 标签
   * @returns {Object}
   */
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
