/*
 * @Author: Hzh
 * @Date: 2020-07-27 17:27:27
 * @LastEditTime: 2020-07-27 17:33:42
 * @LastEditors: Hzh
 * @Description:自动导出组件
 */

const componentFiles = require.context('./', true, /\index.vue$/)

const components = componentFiles.keys().reduce((files, filePath) => {
  const fileName = filePath.replace(/^\.\/(.*)\/index\.\w+$/, '$1')
  const value = componentFiles(filePath)
  files[fileName] = value.default
  return files
}, {})

module.exports = components
