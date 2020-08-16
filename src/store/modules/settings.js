/*
 * @Author: Hzh
 * @Date: 2020-07-27 09:20:18
 * @LastEditTime: 2020-08-16 13:13:51
 * @LastEditors: Hzh
 * @Description:系统设置
 */
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, menuSearch, uniqueOpened } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  menuSearch: menuSearch,
  uniqueOpened: uniqueOpened
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

