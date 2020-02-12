import { FILE_DELETE } from '@constants/filecenter'

const INITIAL_STATE = {
  itemInfo: {
  }
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FILE_DELETE: {
      return {
        ...state,
        itemInfo: action.payload
      }
    }
    default:
      return state
  }
}
