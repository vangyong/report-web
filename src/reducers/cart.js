import Taro from '@tarojs/taro'
import {CART_DETAIL_PAGE,CART_DETAIL_LIST, CART_DETAIL_NUM, CART_DETAIL_CREATE, CART_DETAIL_UPDATE, CART_DETAIL_STATE_UPDATE,CART_DETAIL_USER_STATE} from '@constants/cart'

const INITIAL_STATE = {
  cartInfo: {},
  recommend: {}
}

// TODO H5、RN 还不支持 setTabBarBadge
const updateTabBar = (count) => {
  console.log(count)
  if (count > 0) {
    Taro.setTabBarBadge({
      index: 2,
      text: `${count}`
    })
  } else {
    Taro.removeTabBarBadge({
      index: 2
    })
  }
}

export default function cart(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CART_DETAIL_PAGE:
    case CART_DETAIL_LIST:
    case CART_DETAIL_CREATE:
    case CART_DETAIL_UPDATE:
    case CART_DETAIL_STATE_UPDATE: {
      return {
        ...state,
        cartInfo: action.payload
      }
    }
    case CART_DETAIL_NUM: {
      updateTabBar(action.payload.countCornerMark)
      return state
    }
    case CART_DETAIL_USER_STATE: {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
