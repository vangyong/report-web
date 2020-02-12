import { BUYER_ACCOUNT_CREATE,BUYER_ACCOUNT_UPDATE,BUYER_ACCOUNT_DELETE,BUYER_ACCOUNT_USER,
  SELLER_ACCOUNT_CREATE,SELLER_ACCOUNT_UPDATE,SELLER_ACCOUNT_DELETE,SELLER_ACCOUNT_USER} from '@constants/account'

const INITIAL_STATE = {}

export default function address(state = INITIAL_STATE, action) {
  switch(action.type) {
    case BUYER_ACCOUNT_CREATE: {
      return { ...state }
    }
    case BUYER_ACCOUNT_UPDATE: {
      return { ...state }
    }
    case BUYER_ACCOUNT_DELETE: {
      return { ...state }
    }
    case BUYER_ACCOUNT_USER: {
      return { ...state }
    }
    case SELLER_ACCOUNT_CREATE: {
      return { ...state }
    }
    case SELLER_ACCOUNT_UPDATE: {
      return { ...state }
    }
    case SELLER_ACCOUNT_DELETE: {
      return { ...state }
    }
    case SELLER_ACCOUNT_USER: {
      return { ...state }
    }
    default:
      return state
  }
}
