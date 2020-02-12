import { SELLER_CREATE, SELLER_UPDATE, SELLER_USER, SELLER_SHOP,SELLER_SHOP_UPDATE,SELLER_GOODS_CREATE ,SELLER_GOODS_UPDATE,SELLER_GOODS_TENANT_PAGE,SELLER_CERTIFICATE_CREATE,SELLER_CERTIFICATE_DELETE,SELLER_CERTIFICATE_BUSINESS,
  SELLER_EXTRACT_CREATE,SELLER_EXTRACT_UPDATE,SELLER_EXTRACT_DELETE,SELLER_EXTRACT_ALL,SELLER_EXTRACT_PAGE,SELLER_EXTRACT_DETAIL} from '@constants/seller'
import { API_SELLER_REGISTER,API_SELLER_USER, API_SELLER_SHOP,API_SELLER_SHOP_UPDATE,API_SELLER_GOODS, API_SELLER_GOODS_TENANT_PAGE,API_SELLER_CERTIFICATE,API_SELLER_CERTIFICATE_BUSINESS,
  API_SELLER_EXTRACT,API_SELLER_EXTRACT_ALL,API_SELLER_EXTRACT_PAGE} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 商家入驻
 * @param {*} payload
 */
export const dispatchSellerCreate = payload => createAction({
  url: API_SELLER_REGISTER,
  type: SELLER_CREATE,
  method: 'POST',
  payload
})

/**
 * 入驻信息修改
 * @param {*} payload
 */
export const dispatchSellerUpdate = payload => createAction({
  url: API_SELLER_REGISTER,
  type: SELLER_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 根据用户获取注册信息
 * @param {*} payload
 */
export const dispatchSellerUser = payload => createAction({
  url: API_SELLER_USER+`/${payload.userId}`,
  type: SELLER_USER,
  method: 'GET',
  payload
})

/**
 * 根据userId获取店铺信息
 * @param {*} payload
 */
export const dispatchSellerShop = payload => createAction({
  url: API_SELLER_SHOP+`/${payload.userId}`,
  type: SELLER_SHOP,
  method: 'GET',
  payload
})

/**
 * 商品更新
 * @param {*} payload
 */
export const dispatchSellerShopUpdate = payload => createAction({
  url: API_SELLER_SHOP_UPDATE,
  type: SELLER_SHOP_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 商品上架
 * @param {*} payload
 */
export const dispatchSellerGoodsCreate = payload => createAction({
  url: API_SELLER_GOODS,
  type: SELLER_GOODS_CREATE,
  method: 'POST',
  payload
})


/**
 * 商品更新
 * @param {*} payload
 */
export const dispatchSellerGoodsUpdate = payload => createAction({
  url: API_SELLER_GOODS,
  type: SELLER_GOODS_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 根据租户、状态分页获取商品
 * @param {*} payload
 */
export const dispatchSellerGoodsPage = payload => createAction({
  url: API_SELLER_GOODS_TENANT_PAGE,
  type: SELLER_GOODS_TENANT_PAGE,
  method: 'GET',
  payload
})




/**
 * 根据tenantId获取证件信息
 * @param {*} payload
 */
export const dispatchSellerCertificate = payload => createAction({
  url: API_SELLER_CERTIFICATE_BUSINESS+`/${payload.tenantId}`,
  type: SELLER_CERTIFICATE_BUSINESS,
  method: 'GET'
})

/**
 * 商家证件上传
 * @param {*} payload
 */
export const dispatchSellerCertificateCreate = payload => createAction({
  url: API_SELLER_CERTIFICATE,
  type: SELLER_CERTIFICATE_CREATE,
  method: 'POST',
  payload
})

/**
 * 商家证件删除
 * @param {*} payload
 */
export const dispatchSellerCertificateDelete = payload => createAction({
  url: API_SELLER_CERTIFICATE+`/${payload.certificateId}`,
  type: SELLER_CERTIFICATE_DELETE,
  method: 'DELETE'
})


/**
 * 新增提现
 * @param {*} payload
 */
export const dispatchSellerExtractCreate = payload => createAction({
  url: API_SELLER_EXTRACT,
  type: SELLER_EXTRACT_CREATE,
  method: 'POST',
  payload
})


/**
 * 提现更新
 * @param {*} payload
 */
export const dispatchSellerExtractUpdate = payload => createAction({
  url: API_SELLER_EXTRACT,
  type: SELLER_EXTRACT_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除提现
 * @param {*} payload
 */
export const dispatchSellerExtractDelete = payload => createAction({
  url: API_SELLER_EXTRACT,
  type: SELLER_EXTRACT_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 获取全部提现
 * @param {*} payload
 */
export const dispatchSellerAllExtract = payload => createAction({
  url: API_SELLER_EXTRACT_ALL,
  type: SELLER_EXTRACT_ALL,
  method: 'GET',
  payload
})

/**
 * 分页获取提现
 * @param {*} payload
 */
export const dispatchSellerExtractPage = payload => createAction({
  url: API_SELLER_EXTRACT_PAGE,
  type: SELLER_EXTRACT_PAGE,
  method: 'GET',
  payload
})


/**
 * 根据状态查询买家订单
 * @param {*} payload
 */
export const dispatchSellerExtractDetail = payload => createAction({
  url: API_SELLER_EXTRACT+`/${payload.sellerExtractId}`,
  type: SELLER_EXTRACT_DETAIL,
  method: 'GET',
  payload
})
