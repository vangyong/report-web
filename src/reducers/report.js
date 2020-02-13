import { REPORT_ADDRESS_CREATE,REPORT_ADDRESS_UPDATE,REPORT_ADDRESS_DELETE,REPORT_ADDRESS_LIST,REPORT_ADDRESS_GET,REPORT_ADDRESS_STATUS,
    REPORT_SCHEME_CREATE,REPORT_SCHEME_UPDATE,REPORT_SCHEME_DELETE,REPORT_SCHEME_LIST,REPORT_SCHEME_GET,
    REPORT_ORDER_CREATE,REPORT_ORDER_UPDATE,REPORT_ORDER_DELETE,REPORT_ORDER_LIST,REPORT_ORDER_GET,} from '@constants/report'

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
    case REPORT_SCHEME_CREATE: {
        return { ...state }
    }
    case REPORT_SCHEME_UPDATE: {
        return { ...state }
    }
    case REPORT_SCHEME_DELETE: {
        return { ...state }
    }
    case REPORT_SCHEME_LIST: {
        return { ...state }
    }
    case REPORT_SCHEME_GET: {
        return { ...state }
    }
    case REPORT_ORDER_CREATE: {
        return { ...state }
    }
    case REPORT_ORDER_UPDATE: {
        return { ...state }
    }
    case REPORT_ORDER_DELETE: {
        return { ...state }
    }
    case REPORT_ORDER_LIST: {
        return { ...state }
    }
    case REPORT_ORDER_GET: {
        return { ...state }
    }

    default:
      return state
  }
}
