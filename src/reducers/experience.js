import { EXPERIENCE_CREATE,EXPERIENCE_UPDATE,EXPERIENCE_DELETE,EXPERIENCE_PAGE,EXPERIENCE_DETAIL} from '@constants/experience'

const INITIAL_STATE = {}

export default function experience(state = INITIAL_STATE, action) {
  switch(action.type) {
    case EXPERIENCE_CREATE: {
      return { ...state }
    }
    case EXPERIENCE_UPDATE: {
      return { ...state }
    }
    case EXPERIENCE_DELETE: {
      return { ...state }
    }
    case EXPERIENCE_PAGE: {
      return { ...state }
    }
    case EXPERIENCE_DETAIL: {
      return { ...state }
    }
    default:
      return state
  }
}
