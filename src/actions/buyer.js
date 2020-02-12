import {BUYER_REDPACKET_CREATE, BUYER_REDPACKET_PAGE, BUYER_REDPACKET_DETAIL,
  BUYER_INTEGRAL_CREATE, BUYER_INTEGRAL_PAGE, BUYER_INTEGRAL_DETAIL} from '@constants/buyer'
import {API_BUYER_REDPACKET, API_BUYER_REDPACKET_PAGE, API_BUYER_REDPACKET_DETAIL,
  API_BUYER_INTEGRAL, API_BUYER_INTEGRAL_PAGE, API_BUYER_INTEGRAL_DETAIL} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建买家红包
 * @param {*} payload
 */
export const dispatchBuyerRedpacketCreate = payload => createAction({
  url: API_BUYER_REDPACKET,
  type: BUYER_REDPACKET_CREATE,
  method: 'POST',
  payload
})

/**
 * 根据状态查询买家红包
 * @param {*} payload
 */
export const dispatchBuyerRedpacketPage = payload => createAction({
  url: API_BUYER_REDPACKET_PAGE,
  type: BUYER_REDPACKET_PAGE,
  method: 'GET',
  payload
})


/**
 * 根据状态查询买家红包
 * @param {*} payload
 */
export const dispatchBuyerRedpacketDetail = payload => createAction({
  url: API_BUYER_REDPACKET_DETAIL+`/${payload.buyerRedpacketId}`,
  type: BUYER_REDPACKET_DETAIL,
  method: 'GET',
  payload
})


/**
 * 创建买家积分
 * @param {*} payload
 */
export const dispatchBuyerIntegralCreate = payload => createAction({
  url: API_BUYER_INTEGRAL,
  type: BUYER_INTEGRAL_CREATE,
  method: 'POST',
  payload
})

/**
 * 根据状态查询买家积分
 * @param {*} payload
 */
export const dispatchBuyerIntegralPage = payload => createAction({
  url: API_BUYER_INTEGRAL_PAGE,
  type: BUYER_INTEGRAL_PAGE,
  method: 'GET',
  payload
})


/**
 * 根据状态查询买家积分
 * @param {*} payload
 */
export const dispatchBuyerIntegralDetail = payload => createAction({
  url: API_BUYER_INTEGRAL_DETAIL+`/${payload.buyerRedpacketId}`,
  type: BUYER_INTEGRAL_DETAIL,
  method: 'GET',
  payload
})
