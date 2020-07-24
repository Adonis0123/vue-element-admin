/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-07-24 15:03:00
 * @LastEditors: Hzh
 * @Description:
 */
import permission from './permission'
const install = function(Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
