import {CART_DETAIL_PAGE, CART_DETAIL_LIST,  CART_DETAIL_NUM, CART_DETAIL_CREATE, CART_DETAIL_UPDATE,CART_DETAIL_STATE_UPDATE, CART_DETAIL_USER_STATE} from '@constants/cart'
import {API_CART_DETAIL_PAGE, API_CART_DETAIL_LIST, API_CART_DETAIL_NUM, API_CART_DETAIL, API_CART_DETAIL_STATE, API_CART_DETAIL_USER_STATE} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 购物车物品数量
 * @param {*} payload
 */
export const dispatchCartDetailNum = payload => createAction({
  url: API_CART_DETAIL_NUM+`/${payload.userId}`,
  fetchOptions: {
    showToast: false,
    autoLogin: false
  },
  type: CART_DETAIL_NUM,
  payload
})

/**
 * 添加商品到购物车
 * @param {*} payload
 */
export const dispatchCartDetailCreate = payload => createAction({
  url: API_CART_DETAIL,
  method: 'POST',
  type: CART_DETAIL_CREATE,
  payload
})

/**
 * 购物车明细
 * @param {*} payload
 */
export const dispatchCartDetailPage = payload => createAction({
  url: API_CART_DETAIL_PAGE,
  method: 'GET',
  type: CART_DETAIL_PAGE,
  payload
})

/**
 * 购物车明细
 * @param {*} payload
 */
export const dispatchCartDetailList = payload => createAction({
  url: API_CART_DETAIL_LIST,
  method: 'GET',
  type: CART_DETAIL_LIST,
  payload
})

/**
 * 更新购物车明细的数量及选中状态
 * @param {*} payload
 */
export const dispatchCartDetailUpdate = payload => createAction({
  url: API_CART_DETAIL,
  method: 'PUT',
  type: CART_DETAIL_UPDATE,
  payload
})

/**
 * 更新购物车明细选中状态
 * @param {*} payload
 */
export const dispatchCartDetailStateUpdate = payload => createAction({
  url: API_CART_DETAIL_STATE,
  method: 'PUT',
  type: CART_DETAIL_STATE_UPDATE,
  payload
})

/**
 * 用户购物车全部选中明细
 * @param {*} payload
 */
export const dispatchCartDetailByUserState = payload => createAction({
  url: API_CART_DETAIL_USER_STATE,
  method: 'GET',
  type: CART_DETAIL_USER_STATE,
  payload
})
