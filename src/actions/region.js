import { REGION_PROVINCE, REGION_CITY,REGION_COUNTY,REGION_TOWNS,REGION_CHILD } from '@constants/region'
import { API_REGION_PROVINCE, API_REGION_CITY, API_REGION_COUNTY,API_REGION_TOWNS,API_REGION_CHILD } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 省级地区
 * @param {*} payload
 */
export const dispatchProvince = payload => createAction({
  url: API_REGION_PROVINCE+`/${payload.countryCode}`,
  type: REGION_PROVINCE,
  payload
})

/**
 * 市级地区
 * @param {*} payload
 */
export const dispatchCity = payload => createAction({
  url: API_REGION_CITY+`/${payload.regionCode}`,
  type: REGION_CITY,
  payload
})

/**
 * 县级地区
 * @param {*} payload
 */
export const dispatchCounty = payload => createAction({
  url: API_REGION_COUNTY+`/${payload.regionCode}`,
  type: REGION_COUNTY,
  payload
})

/**
 * 乡镇级地区
 * @param {*} payload
 */
export const dispatchTowns = payload => createAction({
  url: API_REGION_TOWNS+`/${payload.regionCode}`,
  type: REGION_TOWNS,
  payload
})

/**
 * 根据父级获取下级地区
 * @param {*} payload
 */
export const dispatchChild = payload => createAction({
  url: API_REGION_CHILD+`/${payload.parentCode}`,
  type: REGION_CHILD,
  payload
})
