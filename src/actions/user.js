import { USER_INFO, USER_LOGIN, USER_LOGOUT,USER_ADD,USER_UPDATE,USER_MOBILE_UPDATE,USER_PASSWORD_UPDATE,PERSONAL_UPDATE } from '@constants/user'
import { API_USER_NAME, API_USER_LOGIN ,API_USER,API_USER_MOBILE,API_USER_PASSWORD,API_PERSONAL} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 根据userName获取用户信息
 * @param {*} payload
 */
export const dispatchUser = payload => createAction({
  url: API_USER_NAME+`/${payload.userName}`,
  method: 'GET',
  type: USER_INFO,
  payload
})

/**
 * 用户注册
 * @param {*} payload
 */
export const dispatchRegister = payload => createAction({
  url: API_USER,
  method: 'POST',
  type: USER_ADD,
  payload
})

/**
 * 更新用户信息
 * @param {*} payload
 */
export const dispatchUserUpdate = payload => createAction({
  url: API_USER,
  type: USER_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = payload => createAction({
  url: API_USER_LOGIN,
  method: 'POST',
  type: USER_LOGIN,
  payload
})

/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT })


/**
 * 更新用户手机号
 * @param {*} payload
 */
export const dispatchUserMobileUpdate = payload => createAction({
  url: API_USER_MOBILE,
  type: USER_MOBILE_UPDATE,
  method: 'PUT',
  payload
})


/**
 * 更新用户密码
 * @param {*} payload
 */
export const dispatchUserPasswordUpdate = payload => createAction({
  url: API_USER_PASSWORD,
  type: USER_PASSWORD_UPDATE,
  method: 'PUT',
  payload
})

