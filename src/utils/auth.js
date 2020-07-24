/*
 * @Author: Hzh
 * @Date: 2020-07-22 18:16:18
 * @LastEditTime: 2020-07-24 14:02:00
 * @LastEditors: Hzh
 * @Description:设置登录之后获取的Token
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

/**
 * @description: 获取Token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * @description: 设置Token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * @description: 删除Token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// Cookies.set('name', 'value', { expires: 7 });
