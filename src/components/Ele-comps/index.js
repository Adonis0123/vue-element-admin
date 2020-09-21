/*
 * @Author: Hzh
 * @Date: 2020-07-08 09:24:49
 * @LastEditTime: 2020-09-21 09:33:44
 * @LastEditors: Hzh
 * @Description:
 */
const componentFiles = require.context('./', true, /\.vue$/)

const components = componentFiles.keys().reduce((files, filePath) => {
  const fileName = filePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = componentFiles(filePath)
  files[fileName] = value.default
  return files
}, {})

/* 为了按需引入 */
module.exports = components
