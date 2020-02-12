import { BUYER_ACCOUNT_CREATE, BUYER_ACCOUNT_UPDATE,BUYER_ACCOUNT_DELETE, BUYER_ACCOUNT_USER,
  SELLER_ACCOUNT_CREATE, SELLER_ACCOUNT_UPDATE,SELLER_ACCOUNT_DELETE, SELLER_ACCOUNT_USER} from '@constants/account'
import { API_BUYER_ACCOUNT,API_BUYER_ACCOUNT_USER, API_SELLER_ACCOUNT,API_SELLER_ACCOUNT_USER} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建买家账户
 * @param {*} payload
 */
export const dispatchBuyerAccountCreate = payload => createAction({
  url: API_BUYER_ACCOUNT,
  type: BUYER_ACCOUNT_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新买家账户
 * @param {*} payload
 */
export const dispatchBuyerAccountUpdate = payload => createAction({
  url: API_BUYER_ACCOUNT,
  type: BUYER_ACCOUNT_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除买家账户
 * @param {*} payload
 */
export const dispatchBuyerAccountDelete = payload => createAction({
  url: API_BUYER_ACCOUNT,
  type: BUYER_ACCOUNT_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 根据用户id查询买家账户
 * @param {*} payload
 */
export const dispatchBuyerAccountByUser = payload => createAction({
  url: API_BUYER_ACCOUNT_USER+`/${payload.userId}`,
  type: BUYER_ACCOUNT_USER,
  method: 'GET',
  payload
})



/**
 * 创建卖家账户
 * @param {*} payload
 */
export const dispatchSellerAccountCreate = payload => createAction({
  url: API_SELLER_ACCOUNT,
  type: SELLER_ACCOUNT_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新卖家账户
 * @param {*} payload
 */
export const dispatchSellerAccountUpdate = payload => createAction({
  url: API_SELLER_ACCOUNT,
  type: SELLER_ACCOUNT_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除卖家账户
 * @param {*} payload
 */
export const dispatchSellerAccountDelete = payload => createAction({
  url: API_SELLER_ACCOUNT,
  type: SELLER_ACCOUNT_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 根据用户id查询卖家账户
 * @param {*} payload
 */
export const dispatchSellerAccountByUser = payload => createAction({
  url: API_SELLER_ACCOUNT_USER+`/${payload.userId}`,
  type: SELLER_ACCOUNT_USER,
  method: 'GET',
  payload
})


