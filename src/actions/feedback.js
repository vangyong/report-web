import { FEEDBACK_CREATE, FEEDBACK_UPDATE,FEEDBACK_DELETE, FEEDBACK_PAGE,FEEDBACK_DETAIL} from '@constants/feedback'
import { API_FEEDBACK, API_FEEDBACK_PAGE} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建反馈意见
 * @param {*} payload
 */
export const dispatchFeedbackCreate = payload => createAction({
  url: API_FEEDBACK,
  type: FEEDBACK_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新反馈意见
 * @param {*} payload
 */
export const dispatchFeedbackUpdate = payload => createAction({
  url: API_FEEDBACK,
  type: FEEDBACK_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除反馈意见
 * @param {*} payload
 */
export const dispatchFeedbackDelete = payload => createAction({
  url: API_FEEDBACK,
  type: FEEDBACK_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 分页查询反馈意见
 * @param {*} payload
 */
export const dispatchFeedbackPage = payload => createAction({
  url: API_FEEDBACK_PAGE,
  type: FEEDBACK_PAGE,
  method: 'GET',
  payload
})

/**
 * 分页查询反馈意见
 * @param {*} payload
 */
export const dispatchFeedbackDetail = payload => createAction({
  url: API_FEEDBACK+`/${payload.feedbackId}`,
  type: FEEDBACK_DETAIL,
  method: 'GET',
  payload
})


