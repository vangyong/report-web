import { REPORT_ADDRESS_CREATE, REPORT_ADDRESS_UPDATE,REPORT_ADDRESS_DELETE, REPORT_ADDRESS_LIST, REPORT_ADDRESS_GET,REPORT_ADDRESS_STATUS,
    REPORT_SCHEME_CREATE, REPORT_SCHEME_UPDATE,REPORT_SCHEME_DELETE, REPORT_SCHEME_LIST, REPORT_SCHEME_GET,
    REPORT_ORDER_CREATE, REPORT_ORDER_UPDATE,REPORT_ORDER_DELETE, REPORT_ORDER_LIST, REPORT_ORDER_GET} from '@constants/report'
import { API_REPORT_ADDRESS, API_REPORT_ADDRESS_LIST,API_REPORT_ADDRESS_STATUS,
    API_REPORT_SCHEME, API_REPORT_SCHEME_LIST,
    API_REPORT_ORDER, API_REPORT_ORDER_LIST,} from '@constants/api'
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


/**
 * 创建方案
 * @param {*} payload
 */
export const dispatchReportSchemeCreate = payload => createAction({
    url: API_REPORT_SCHEME,
    type: REPORT_SCHEME_CREATE,
    method: 'POST',
    payload
})

/**
 * 更新方案
 * @param {*} payload
 */
export const dispatchReportSchemeUpdate = payload => createAction({
    url: API_REPORT_SCHEME,
    type: REPORT_SCHEME_UPDATE,
    method: 'PUT',
    payload
})

/**
 * 删除方案
 * @param {*} payload
 */
export const dispatchReportSchemeDelete = payload => createAction({
    url: API_REPORT_SCHEME,
    type: REPORT_SCHEME_DELETE,
    method: 'DELETE',
    payload
})

/**
 * 查询方案列表
 * @param {*} payload
 */
export const dispatchReportSchemeList = payload => createAction({
    url: API_REPORT_SCHEME_LIST,
    type: REPORT_SCHEME_LIST,
    method: 'GET',
    payload
})


/**
 * 查询方案
 * @param {*} payload
 */
export const dispatchReportSchemeGet = payload => createAction({
    url: API_REPORT_SCHEME+`/${payload.schemeId}`,
    type: REPORT_SCHEME_GET,
    method: 'GET',
    payload
})


/**
 * 创建报单
 * @param {*} payload
 */
export const dispatchReportOrderCreate = payload => createAction({
    url: API_REPORT_ORDER,
    type: REPORT_ORDER_CREATE,
    method: 'POST',
    payload
})

/**
 * 更新报单
 * @param {*} payload
 */
export const dispatchReportOrderUpdate = payload => createAction({
    url: API_REPORT_ORDER,
    type: REPORT_ORDER_UPDATE,
    method: 'PUT',
    payload
})

/**
 * 删除报单
 * @param {*} payload
 */
export const dispatchReportOrderDelete = payload => createAction({
    url: API_REPORT_ORDER,
    type: REPORT_ORDER_DELETE,
    method: 'DELETE',
    payload
})

/**
 * 查询报单列表
 * @param {*} payload
 */
export const dispatchReportOrderList = payload => createAction({
    url: API_REPORT_ORDER_LIST,
    type: REPORT_ORDER_LIST,
    method: 'GET',
    payload
})


/**
 * 查询报单
 * @param {*} payload
 */
export const dispatchReportOrderGet = payload => createAction({
    url: API_REPORT_ORDER+`/${payload.orderId}`,
    type: REPORT_ORDER_GET,
    method: 'GET',
    payload
})
