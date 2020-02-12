import { RECEIVE_ADDRESS_CREATE,RECEIVE_ADDRESS_UPDATE,RECEIVE_ADDRESS_DELETE,RECEIVE_ADDRESS_LIST,RECEIVE_ADDRESS_DETAIL,RECEIVE_ADDRESS_STATUS} from '@constants/address'

const INITIAL_STATE = {}

export default function address(state = INITIAL_STATE, action) {
  switch(action.type) {
    case RECEIVE_ADDRESS_CREATE: {
      return { ...state }
    }
    case RECEIVE_ADDRESS_UPDATE: {
      return { ...state }
    }
    case RECEIVE_ADDRESS_DELETE: {
      return { ...state }
    }
    case RECEIVE_ADDRESS_LIST: {
      return { ...state }
    }
    case RECEIVE_ADDRESS_DETAIL: {
      return { ...state }
    }
    case RECEIVE_ADDRESS_STATUS: {
      return { ...state }
    }
    default:
      return state
  }
}
