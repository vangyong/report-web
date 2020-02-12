import { REPORT_ADDRESS_CREATE,REPORT_ADDRESS_UPDATE,REPORT_ADDRESS_DELETE,REPORT_ADDRESS_LIST,REPORT_ADDRESS_GET,REPORT_ADDRESS_STATUS} from '@constants/report'

const INITIAL_STATE = {}

export default function address(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REPORT_ADDRESS_CREATE: {
      return { ...state }
    }
    case REPORT_ADDRESS_UPDATE: {
      return { ...state }
    }
    case REPORT_ADDRESS_DELETE: {
      return { ...state }
    }
    case REPORT_ADDRESS_LIST: {
      return { ...state }
    }
    case REPORT_ADDRESS_GET: {
      return { ...state }
    }
    case REPORT_ADDRESS_STATUS: {
      return { ...state }
    }
    default:
      return state
  }
}
