/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-05 14:21:41
 * @LastEditors: Hzh
 * @Description:全局函数入口
 */

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // 重置css样式

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/index' // 引入路由

import './icons' // icon
import './permission' // 权限控制
import './utils/error-log' // 错误日志

import * as filters from './filters' // global filters

import { localData, sessionData } from '@/utils/storage.js' // 浏览器存储工具函数

/**
 * 如果你不想使用 mock-server
 * 你可以使用 MockJs 去模拟 api
 * 你可以执行: mockXHR()
 *
 * 目前MockJs将在生产环境中使用,
 * 在上线之前记得把它删掉 ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置 element-ui 的默认大小
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.$localData = localData

Vue.prototype.$sessionData = sessionData

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
