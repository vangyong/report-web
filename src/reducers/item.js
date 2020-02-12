import { ITEM_DETAIL } from '@constants/item'

const INITIAL_STATE = {
  itemInfo: {
    //gallery:[]
  }
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ITEM_DETAIL: {
      return {
        ...state,
        itemInfo: action.payload
      }
    }
    default:
      return state
  }
}
