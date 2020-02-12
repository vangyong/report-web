import { REPORT_ADDRESS_CREATE, REPORT_ADDRESS_UPDATE,REPORT_ADDRESS_DELETE, REPORT_ADDRESS_LIST, REPORT_ADDRESS_GET,REPORT_ADDRESS_STATUS} from '@constants/report'
import { API_REPORT_ADDRESS, API_REPORT_ADDRESS_LIST,API_REPORT_ADDRESS_STATUS} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建收货地址
 * @param {*} payload
 */
export const dispatchReportAddressCreate = payload => createAction({
  url: API_REPORT_ADDRESS,
  type: REPORT_ADDRESS_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新收货地址
 * @param {*} payload
 */
export const dispatchReportAddressUpdate = payload => createAction({
  url: API_REPORT_ADDRESS,
  type: REPORT_ADDRESS_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除收货地址
 * @param {*} payload
 */
export const dispatchReportAddressDelete = payload => createAction({
  url: API_REPORT_ADDRESS,
  type: REPORT_ADDRESS_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 查询详细收货地址
 * @param {*} payload
 */
export const dispatchReportAddressList = payload => createAction({
  url: API_REPORT_ADDRESS_LIST,
  type: REPORT_ADDRESS_LIST,
  method: 'GET',
  payload
})


/**
 * 查询收货地址
 * @param {*} payload
 */
export const dispatchReportAddressGet = payload => createAction({
  url: API_REPORT_ADDRESS+`/${payload.addressId}`,
  type: REPORT_ADDRESS_GET,
  method: 'GET',
  payload
})


/**
 * 取消其他收货地址默认状态
 * @param {*} payload
 */
export const dispatchReportAddresStatus = payload => createAction({
  url: API_REPORT_ADDRESS_STATUS,
  type: REPORT_ADDRESS_STATUS,
  method: 'PUT',
  payload
})
