import { RECEIVE_ADDRESS_CREATE, RECEIVE_ADDRESS_UPDATE,RECEIVE_ADDRESS_DELETE, RECEIVE_ADDRESS_LIST, RECEIVE_ADDRESS_DETAIL,RECEIVE_ADDRESS_STATUS} from '@constants/address'
import { API_RECEIVE_ADDRESS, API_RECEIVE_ADDRESS_LIST, API_RECEIVE_ADDRESS_DETAIL,API_RECEIVE_ADDRESS_STATUS} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建收货地址
 * @param {*} payload
 */
export const dispatchReceiveAddressCreate = payload => createAction({
  url: API_RECEIVE_ADDRESS,
  type: RECEIVE_ADDRESS_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新收货地址
 * @param {*} payload
 */
export const dispatchReceiveAddressUpdate = payload => createAction({
  url: API_RECEIVE_ADDRESS,
  type: RECEIVE_ADDRESS_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除收货地址
 * @param {*} payload
 */
export const dispatchReceiveAddressDelete = payload => createAction({
  url: API_RECEIVE_ADDRESS,
  type: RECEIVE_ADDRESS_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 查询详细收货地址
 * @param {*} payload
 */
export const dispatchReceiveAddressList = payload => createAction({
  url: API_RECEIVE_ADDRESS_LIST+`/${payload.userId}`,
  type: RECEIVE_ADDRESS_LIST,
  method: 'GET',
  payload
})


/**
 * 查询详细收货地址
 * @param {*} payload
 */
export const dispatchReceiveAddressDetail = payload => createAction({
  url: API_RECEIVE_ADDRESS_DETAIL+`/${payload.receiveAddressId}`,
  type: RECEIVE_ADDRESS_DETAIL,
  method: 'GET',
  payload
})


/**
 * 取消其他收货地址默认状态
 * @param {*} payload
 */
export const dispatchReceiveAddresStatus = payload => createAction({
  url: API_RECEIVE_ADDRESS_STATUS,
  type: RECEIVE_ADDRESS_STATUS,
  method: 'PUT',
  payload
})
