import { COMMENT_CREATE,COMMENT_UPDATE,COMMENT_DELETE,COMMENT_PAGE,COMMENT_GOODS} from '@constants/comment'

const INITIAL_STATE = {}

export default function address(state = INITIAL_STATE, action) {
  switch(action.type) {
    case COMMENT_CREATE: {
      return { ...state }
    }
    case COMMENT_UPDATE: {
      return { ...state }
    }
    case COMMENT_DELETE: {
      return { ...state }
    }
    case COMMENT_PAGE: {
      return { ...state }
    }
    case COMMENT_GOODS: {
      return { ...state }
    }
    default:
      return state
  }
}
