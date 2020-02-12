import {DELIVER_LIST, DELIVER_CREATE, DELIVER_UPDATE,DELIVER_GET, DELIVER_LIST_ORDER} from '@constants/deliver'
import {API_DELIEVER, API_DELIVER_LIST_ORDER} from '@constants/api'
import { createAction } from '@utils/redux'


/**
 * 添加订单快递单
 * @param {*} payload
 */
export const dispatchDeliverCreate= payload => createAction({
  url: API_DELIVER,
  method: 'POST',
  type: DELIVER_CREATE,
  payload
})


/**
 * 订单快递单
 * @param {*} payload
 */
export const dispatchDeliverUpdate = payload => createAction({
  url: API_DELIVER,
  method: 'PUT',
  type: DELIVER_UPDATE,
  payload
})

/**
 * 根据订单快递单id获取
 * @param {*} payload
 */
export const dispatchDeliverById = payload => createAction({
  url: API_DELIVER+`/${payload.deliverId}`,
  method: 'GET',
  type: DELIVER_GET,
  payload
})



/**
 * 根据订单获取快递单
 * @param {*} payload
 */
export const dispatchDeliverByOrder = payload => createAction({
  url: API_DELIVER_LIST_ORDER+`/${payload.orderId}`,
  method: 'GET',
  type: DELIVER_LIST_ORDER,
  payload
})
