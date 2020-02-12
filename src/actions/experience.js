import { EXPERIENCE_CREATE, EXPERIENCE_UPDATE,EXPERIENCE_DELETE, EXPERIENCE_PAGE, EXPERIENCE_DETAIL} from '@constants/experience'
import { API_EXPERIENCE, API_EXPERIENCE_PAGE, API_EXPERIENCE_DETAIL} from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 创建用户体验
 * @param {*} payload
 */
export const dispatchExperienceCreate = payload => createAction({
  url: API_EXPERIENCE,
  type: EXPERIENCE_CREATE,
  method: 'POST',
  payload
})

/**
 * 更新用户体验
 * @param {*} payload
 */
export const dispatchExperienceUpdate = payload => createAction({
  url: API_EXPERIENCE,
  type: EXPERIENCE_UPDATE,
  method: 'PUT',
  payload
})

/**
 * 删除用户体验
 * @param {*} payload
 */
export const dispatchExperienceDelete = payload => createAction({
  url: API_EXPERIENCE,
  type: EXPERIENCE_DELETE,
  method: 'DELETE',
  payload
})

/**
 * 查询详细用户体验
 * @param {*} payload
 */
export const dispatchExperiencePage = payload => createAction({
  url: API_EXPERIENCE_PAGE,
  type: EXPERIENCE_PAGE,
  method: 'GET',
  payload
})


/**
 * 查询详细用户体验
 * @param {*} payload
 */
export const dispatchExperienceDetail = payload => createAction({
  url: API_EXPERIENCE+`/${payload.experienceId}`,
  type: EXPERIENCE_DETAIL,
  method: 'GET',
  payload
})

