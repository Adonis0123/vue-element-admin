/*
 * @Author: Hzh
 * @Date: 2020-07-27 09:20:18
 * @LastEditTime: 2020-08-07 11:34:28
 * @LastEditors: Hzh
 * @Description:全局设置文件
 */
module.exports = {
  title: '联影Admin',

  /**
   * @description 是否显示设置右面板
   * @type {boolean} true | false
   */
  showSettings: true,

  /**
   * @description 是否显示标签
   * @type {boolean} true | false
   */
  tagsView: true,

  /**
   * @description 是否固定头部
   * @type {boolean} true | false
   */
  fixedHeader: false,

  /**
   * @description 是否在侧边栏显示LOGO
   * @type {boolean} true | false
   */
  sidebarLogo: true,

  /**
   * @description 是否只保持一个子菜单的展开
   * @type {boolean} true | false
   */
  uniqueOpened: true,

  /**
   * @description 展示 err logs 组件,根据生产环境显示
   * @type {string | array} 'production' | ['production', 'development']
   */
  errorLog: ['production', 'development']
}
