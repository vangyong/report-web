import { ORDER_CREATE,ORDER_UPDATE,ORDER_DELETE, ORDER_STATUS, ORDER_BUYER_PAGE,ORDER_SELLER_PAGE, ORDER_DETAIL, ORDER_PAY} from '@constants/order'
import { API_ORDER, API_ORDER_STATUS,API_ORDER_BUYER_PAGE,API_ORDER_SELLER_PAGE, API_ORDER_DETAIL, API_ORDER_PAY} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建买家订单
 * @param {*} payload
 */
export const dispatchOrderCreate = payload => createAction({
  url: API_ORDER,
  type: ORDER_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新买家订单状态
 * @param {*} payload
 */
export const dispatchOrderUpdate = payload => createAction({
  url: API_ORDER,
  type: ORDER_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 取消买家订单
 * @param {*} payload
 */
export const dispatchOrderDelete = payload => createAction({
  url: API_ORDER+`/${payload.orderId}`,
  type: ORDER_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 更新买家订单状态
 * @param {*} payload
 */
export const dispatchOrderStatus = payload => createAction({
  url: API_ORDER_STATUS+`/${payload.orderId}/${payload.status}`,
  type: ORDER_STATUS,
  method: 'PUT',
  payload
})

/**
 * 根据状态查询买家订单
 * @param {*} payload
 */
export const dispatchOrderBuyerPage = payload => createAction({
  url: API_ORDER_BUYER_PAGE,
  type: ORDER_BUYER_PAGE,
  method: 'GET',
  payload
})

/**
 * 根据状态查询卖家订单
 * @param {*} payload
 */
export const dispatchOrderSellerPage = payload => createAction({
  url: API_ORDER_SELLER_PAGE,
  type: ORDER_SELLER_PAGE,
  method: 'GET',
  payload
})


/**
 * 根据状态查询买家订单
 * @param {*} payload
 */
export const dispatchOrderDetail = payload => createAction({
  url: API_ORDER_DETAIL+`/${payload.orderId}`,
  type: ORDER_DETAIL,
  method: 'GET',
  payload
})

/**
 * 订单支付
 * @param {*} payload
 */
export const dispatchOrderPay = payload => createAction({
  url: API_ORDER_PAY,
  type: ORDER_PAY,
  method: 'POST',
  payload
})


