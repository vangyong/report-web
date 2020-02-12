import { COUPON_PAGE,COUPON_USER} from '@constants/coupon'

const INITIAL_STATE = {}

export default function coupon(state = INITIAL_STATE, action) {
  switch(action.type) {
    case COUPON_PAGE: {
      return { ...state }
    }
    case COUPON_USER: {
      return { ...state }
    }
    default:
      return state
  }
}
