import { FILE_DELETE } from '@constants/filecenter'
import { API_FILE_DELETE } from '@constants/api'
import { createAction } from '@utils/redux'

/**
 * 删除文件
 * @param {*} payload
 */
export const dispatchFileDelete = payload => createAction({
  url: API_FILE_DELETE+`/${payload.fileId}`,
  method: 'DELETE',
  type: FILE_DELETE,
  payload
})
