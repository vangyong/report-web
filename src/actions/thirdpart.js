import { VERIFY_CODE } from '@constants/thirdpart'
import { API_SMS_VERIFY_CODE } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 省级地区
 * @param {*} payload
 */
export const dispatchVerifyCode = payload => createAction({
  url: API_SMS_VERIFY_CODE,
  method: 'POST',
  type: VERIFY_CODE,
  payload
})
