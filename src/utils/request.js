/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-07-28 17:28:54
 * @LastEditors: Hzh
 * @Description:封装axios
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 发送 cookies 当 cross-domain requests（跨域）的时候，如果前端配置为true，后段设置Access-Control-Allow-Origin不能为 " * ",必须是你的源地址
  timeout: 5000 // 设置请求超时的时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // do something 在请求发送前

    if (store.getters.token) {
      // 让每个请求携带token
      // ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something 发送请求失败的话
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取http信息，如头或状态
   * 那么设置 return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 下面只是一个例子
   * 你也可以通过 HTTP Status Code 来判断
   */
  response => {
    const res = response.data

    // 如果自定义的code不是 20000, 那么则判定为错误.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法的 Token; 50012: 其他客户端登录了; 50014: Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.toString().indexOf('Error: timeout') !== -1) {
      Message({
        message: '网络请求超时',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
