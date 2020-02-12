import { DELIVER_CREATE,DELIVER_UPDATE,DELIVER_GET,DELIVER_LIST_ORDER} from '@constants/deliver'

const INITIAL_STATE = {}

export default function deliver(state = INITIAL_STATE, action) {
  switch(action.type) {
    case DELIVER_CREATE: {
      return { ...state }
    }
    case DELIVER_UPDATE: {
      return { ...state }
    }
    case DELIVER_GET: {
      return { ...state }
    }
    case DELIVER_LIST_ORDER: {
      return { ...state }
    }
    default:
      return state
  }
}
