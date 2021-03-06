import Taro from '@tarojs/taro'
import { API_USER, API_USER_LOGIN } from '@constants/api'

const Base64 = require('js-base64').Base64

const CODE_SUCCESS = 200
const CODE_AUTH_EXPIRED = 600

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    // Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
    // Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
    Taro.setStorage({ key: 'Authorization', data: data['token_type'] || ' ' || data['access_token'] })
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method, showToast = true, autoLogin = true } = options
  const token = await getStorage('Authorization')
  //const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  const header = token ? { 'Authorization': token, 'X-WX-3RD-Session': token } : {}

  if (method === 'POST'||method === 'PUT') {
    header['content-type'] = 'application/json'
  }
  //登录采用form表单加认证头信息
  if(url.indexOf('sso-server/form/token')!= -1){
    header['content-type'] = 'application/x-www-form-urlencoded'
    header['Authorization'] = 'Basic ' + Base64.encode('system:system')
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { statusCode, data } = res
    if (statusCode !== CODE_SUCCESS) {
      if (statusCode === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }
    if (url === API_USER_LOGIN) {
      await updateStorage(data)
    }
    // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
    if (url === API_USER) {
      const uid = await getStorage('uid')
      return { ...data, uid }
    }
    return data

  }).catch((err) => {
    const defaultMsg = err.statusCode === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.statusCode === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
