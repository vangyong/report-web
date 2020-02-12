import { HOME_INDEX, HOME_SEARCH_COUNT, HOME_RECOMMEND_PAGE,HOME_POPULAR_PAGE, HOME_PIN} from '@constants/home'

const INITIAL_STATE = {
  homeInfo: {},
  searchCount: 0,
  pin: [],
  recommend: []
}

export default function home(state = INITIAL_STATE, action) {
  switch(action.type) {
    case HOME_INDEX: {
      return {
        ...state,
        homeInfo: action.payload
      }
    }
    case HOME_SEARCH_COUNT: {
      return {
        ...state,
        searchCount: action.payload.count
      }
    }
    case HOME_PIN: {
      // 每3个分成一组
      const pin = []
      action.payload.forEach((item, index) => {
        const groupIndex = parseInt(index / 3)
        if (!pin[groupIndex]) {
          pin[groupIndex] = []
        }
        pin[groupIndex].push(item)
      })
      return { ...state, pin }
    }
    case HOME_RECOMMEND_PAGE: {
      return {
        ...state
      }
    }
    case HOME_POPULAR_PAGE: {
      return {
        ...state
      }
    }
    default:
      return state
  }
}
