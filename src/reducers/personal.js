import { PERSONAL_CREATE,PERSONAL_UPDATE,PERSONAL_USER_ID } from '@constants/user'

const INITIAL_STATE = {
  userInfo: {}
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PERSONAL_CREATE: {
      return { ...state }
    }
    case PERSONAL_UPDATE: {
      return { ...state }
    }
    case PERSONAL_USER_ID: {
      return { ...state }
    }
    default:
      return state
  }
}
