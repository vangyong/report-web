import { ITEM_DETAIL } from '@constants/item'
import { API_ITEM_DETAIL } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 商品详情
 * @param {*} payload
 */
export const dispatchItemDetail = payload => createAction({
  url: API_ITEM_DETAIL+`/${payload.goodsId}`,
  method: 'GET',
  type: ITEM_DETAIL,
  payload
})
