import { ORDER_CREATE,ORDER_UPDATE, ORDER_DELETE,ORDER_STATUS,ORDER_BUYER_PAGE,ORDER_SELLER_PAGE,ORDER_DETAIL,ORDER_DELIVER,ORDER_PAY} from '@constants/order'

const INITIAL_STATE = {
  userInfo: {}
}

export default function seller(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ORDER_CREATE: {
      return { ...state }
    }
    case ORDER_UPDATE: {
      return { ...state }
    }
    case ORDER_DELETE: {
      return { ...state }
    }
    case ORDER_STATUS: {
      return { ...state }
    }
    case ORDER_BUYER_PAGE: {
      return { ...state }
    }
    case ORDER_SELLER_PAGE: {
      return { ...state }
    }
    case ORDER_DETAIL: {
      return { ...state }
    }
    case ORDER_DELIVER: {
      return { ...state }
    }
    case ORDER_PAY: {
      return { ...state }
    }
    default:
      return state
  }
}
