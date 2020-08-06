/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-08-06 10:20:10
 * @LastEditors: Hzh
 * @Description:报错日志
 */

import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// 在 settings.js 里面设置生成还是开发环境监听错误
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info, a) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}
