import { COMMENT_CREATE, COMMENT_UPDATE,COMMENT_DELETE, COMMENT_PAGE, COMMENT_GOODS} from '@constants/comment'
import { API_COMMENT, API_COMMENT_PAGE, API_COMMENT_GOODS} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建评论
 * @param {*} payload
 */
export const dispatchCommentCreate = payload => createAction({
  url: API_COMMENT,
  type: COMMENT_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新评论
 * @param {*} payload
 */
export const dispatchCommentUpdate = payload => createAction({
  url: API_COMMENT,
  type: COMMENT_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除评论
 * @param {*} payload
 */
export const dispatchCommentDelete = payload => createAction({
  url: API_COMMENT,
  type: COMMENT_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 分页查询评论
 * @param {*} payload
 */
export const dispatchCommentPage = payload => createAction({
  url: API_COMMENT_PAGE+`/${payload.userId}`,
  type: COMMENT_PAGE,
  method: 'GET',
  payload
})


/**
 * 查询商品的评论
 * @param {*} payload
 */
export const dispatchCommentGoods = payload => createAction({
  url: API_COMMENT_GOODS+`/${payload.goodsId}`,
  type: COMMENT_GOODS,
  method: 'GET',
  payload
})

