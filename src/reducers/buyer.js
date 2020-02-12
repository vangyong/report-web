import {BUYER_REDPACKET_CREATE, BUYER_REDPACKET_PAGE, BUYER_REDPACKET_DETAIL,
  BUYER_INTEGRAL_CREATE, BUYER_INTEGRAL_PAGE, BUYER_INTEGRAL_DETAIL} from '@constants/buyer'

const INITIAL_STATE = {
  userInfo: {}
}

export default function seller(state = INITIAL_STATE, action) {
  switch(action.type) {
    case BUYER_REDPACKET_CREATE: {
      return { ...state }
    }
    case BUYER_REDPACKET_PAGE: {
      return { ...state }
    }
    case BUYER_REDPACKET_DETAIL: {
      return { ...state }
    }
    case BUYER_INTEGRAL_CREATE: {
      return { ...state }
    }
    case BUYER_INTEGRAL_PAGE: {
      return { ...state }
    }
    case BUYER_INTEGRAL_DETAIL: {
      return { ...state }
    }
    default:
      return state
  }
}
