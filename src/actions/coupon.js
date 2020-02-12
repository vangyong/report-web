import {  COUPON_PAGE, COUPON_USER} from '@constants/coupon'
import {  API_COUPON_PAGE, API_COUPON_USER} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 查询优惠券
 * @param {*} payload
 */
export const dispatchCouponPage = payload => createAction({
  url: API_COUPON_PAGE+`/${payload.userId}`,
  type: COUPON_PAGE,
  method: 'GET',
  payload
})


/**
 * 查询用户优惠券
 * @param {*} payload
 */
export const dispatchCouponUser = payload => createAction({
  url: API_COUPON_USER,
  type: COUPON_USER,
  method: 'GET',
  payload
})

