import { FEEDBACK_CREATE,FEEDBACK_UPDATE,FEEDBACK_DELETE,FEEDBACK_PAGE,FEEDBACK_DETAIL} from '@constants/feedback'

const INITIAL_STATE = {}

export default function feedback(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FEEDBACK_CREATE: {
      return { ...state }
    }
    case FEEDBACK_UPDATE: {
      return { ...state }
    }
    case FEEDBACK_DELETE: {
      return { ...state }
    }
    case FEEDBACK_PAGE: {
      return { ...state }
    }
    case FEEDBACK_DETAIL: {
      return { ...state }
    }
    default:
      return state
  }
}
