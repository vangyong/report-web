import { PERSONAL_CREATE,PERSONAL_UPDATE,PERSONAL_USER_ID } from '@constants/personal'
import { API_PERSONAL,API_PERSONAL_USER_ID } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建用户个人资料
 * @param {*} payload
 */
export const dispatchPersonalCreate = payload => createAction({
  url: API_PERSONAL,
  type: PERSONAL_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新用户个人资料
 * @param {*} payload
 */
export const dispatchPersonalUpdate = payload => createAction({
  url: API_PERSONAL,
  type: PERSONAL_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 根据用户id获取个人资料
 * @param {*} payload
 */
export const dispatchPersonalByUserId = payload => createAction({
  url: API_PERSONAL_USER_ID+`/${payload.userId}`,
  type: PERSONAL_USER_ID,
  method: 'GET',
  payload
})


