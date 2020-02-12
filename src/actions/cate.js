import { CATE_MENU, CATE_SUB, CATE_SUB_LIST,CATE_GOODS } from '@constants/cate'
import { API_CATE,API_CATE_GOODS} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 分类菜单、列表
 * @param {*} payload
 */
export const dispatchMenu = payload => createAction({
  url: API_CATE+`/${payload.channelId}`,
  type: CATE_MENU,
  payload
})

/**
 * 分类商品列表
 * @param {*} payload
 */
export const dispatchGoods = payload => createAction({
  url: API_CATE_GOODS,
  type: CATE_GOODS,
  payload
})
