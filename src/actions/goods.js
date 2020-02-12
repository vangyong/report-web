import { GOODS_QUERY, GOODS_ATTRIBUTE_CREATE, GOODS_ATTRIBUTE_UPDATE,GOODS_ATTRIBUTE_DELETE,GOODS_ATTRIBUTE_LIST ,
  GOODS_GALLERY_CREATE, GOODS_GALLERY_UPDATE,GOODS_GALLERY_DELETE,GOODS_GALLERY_LIST,
  GOODS_SPECIFICATION_CREATE, GOODS_SPECIFICATION_UPDATE,GOODS_SPECIFICATION_DELETE,GOODS_SPECIFICATION_LIST ,
} from '@constants/goods'
import { API_GOODS, API_GOODS_ATTRIBUTE, API_GOODS_ATTRIBUTE_LIST,API_GOODS_GALLERY,API_GOODS_GALLERY_LIST,API_GOODS_GALLERY_DELETE, API_GOODS_SPECIFICATION,API_GOODS_SPECIFICATION_LIST} from '@constants/api'
import { GOODS_GALLERY } from '@constants/common'
import { createAction } from '@utils/redux'

/**
 * 获取商品
 * @param {*} payload
 */
export const dispatchGoods = payload => createAction({
  url: API_GOODS+`/${payload.goodsId}`,
  type: GOODS_QUERY,
  method: 'GET'
})


/**
 * 商品属性新增
 * @param {*} payload
 */
export const dispatchGoodsAttributeCreate = payload => createAction({
  url: API_GOODS_ATTRIBUTE,
  type: GOODS_ATTRIBUTE_CREATE,
  method: 'POST',
  payload
})

/**
 * 商品属性更新
 * @param {*} payload
 */
export const dispatchGoodsAttributeUpdate = payload => createAction({
  url: API_GOODS_ATTRIBUTE,
  type: GOODS_ATTRIBUTE_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 商品属性删除
 * @param {*} payload
 */
export const dispatchGoodsAttributeDelete = payload => createAction({
  url: API_GOODS_ATTRIBUTE+`/${payload.goodsAttributeId}`,
  type: GOODS_ATTRIBUTE_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 获取商品属性列表
 * @param {*} payload
 */
export const dispatchGoodsAttributeList = payload => createAction({
  url: API_GOODS_ATTRIBUTE_LIST+`/${payload.goodsId}`,
  type: GOODS_ATTRIBUTE_LIST,
  method: 'GET'
})


/**
 * 商品画廊新增
 * @param {*} payload
 */
export const dispatchGoodsGalleryCreate = payload => createAction({
  url: API_GOODS_GALLERY,
  type: GOODS_GALLERY_CREATE,
  method: 'POST',
  payload
})

/**
 * 商品画廊更新
 * @param {*} payload
 */
export const dispatchGoodsGalleryUpdate = payload => createAction({
  url: API_GOODS_GALLERY,
  type: GOODS_GALLERY_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 商品画廊删除
 * @param {*} payload
 */
export const dispatchGoodsGalleryDelete = payload => createAction({
  url: API_GOODS_GALLERY_DELETE+`/${payload.fileId}`,
  type: GOODS_GALLERY_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 获取商品画廊列表
 * @param {*} payload
 */
export const dispatchGoodsGalleryList = payload => createAction({
  url: API_GOODS_GALLERY_LIST+`/${payload.goodsId}/`+GOODS_GALLERY,
  type: GOODS_GALLERY_LIST,
  method: 'GET'
})

/**
 * 商品规格新增
 * @param {*} payload
 */
export const dispatchGoodsSpecificationCreate = payload => createAction({
  url: API_GOODS_SPECIFICATION,
  type: GOODS_SPECIFICATION_CREATE,
  method: 'POST',
  payload
})

/**
 * 商品规格更新
 * @param {*} payload
 */
export const dispatchGoodsSpecificationUpdate = payload => createAction({
  url: API_GOODS_SPECIFICATION,
  type: GOODS_SPECIFICATION_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 商品规格删除
 * @param {*} payload
 */
export const dispatchGoodsSpecificationDelete = payload => createAction({
  url: API_GOODS_SPECIFICATION+`/${payload.goodsSpecificationId}`,
  type: GOODS_SPECIFICATION_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 获取商品规格列表
 * @param {*} payload
 */
export const dispatchGoodsSpecificationList = payload => createAction({
  url: API_GOODS_SPECIFICATION_LIST+`/${payload.goodsId}`,
  type: GOODS_SPECIFICATION_LIST,
  method: 'GET',
  payload
})
