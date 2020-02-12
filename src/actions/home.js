import { HOME_INDEX, HOME_SEARCH_COUNT, HOME_PIN,HOME_RECOMMEND_PAGE, HOME_POPULAR_PAGE } from '@constants/home'
import { API_HOME_INDEX, API_HOME_PIN, API_HOME_RECOMMEND_PAGE,API_HOME_POPULAR_PAGE } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchHomeIndex = payload => createAction({
  url: API_HOME_INDEX,
  type: HOME_INDEX,
  payload
})

/**
 * 商品总数
 * @param {*} payload
 */
// export const dispatchSearchCount = payload => createAction({
//   url: API_HOME_SEARCH_COUNT,
//   type: HOME_SEARCH_COUNT,
//   payload
// })

/**
 * 拼团
 * @param {*} payload
 */
export const dispatchPin = payload => createAction({
  url: API_HOME_PIN,
  type: HOME_PIN,
  payload
})

/**
 * 分页获取推荐商品
 * @param {*} payload
 */
export const dispatchRecommendPage = payload => createAction({
  url: API_HOME_RECOMMEND_PAGE,
  type: HOME_RECOMMEND_PAGE,
  payload
})

/**
 * 分页获取热销产品
 * @param {*} payload
 */
export const dispatchPopularPage = payload => createAction({
  url: API_HOME_POPULAR_PAGE,
  type: HOME_POPULAR_PAGE,
  payload
})
