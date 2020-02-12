import { GOODS_QUERY, GOODS_ATTRIBUTE_CREATE, GOODS_ATTRIBUTE_UPDATE, GOODS_ATTRIBUTE_DELETE,GOODS_ATTRIBUTE_LIST,
  GOODS_GALLERY_CREATE, GOODS_GALLERY_UPDATE, GOODS_GALLERY_DELETE,GOODS_GALLERY_LIST,
  GOODS_SPECIFICATION_CREATE, GOODS_SPECIFICATION_UPDATE, GOODS_SPECIFICATION_DELETE,GOODS_SPECIFICATION_LIST,
} from '@constants/goods'

const INITIAL_STATE = {
  goodsDetail: {}
}

export default function goods(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GOODS_QUERY: {
      return { ...state }
    }
    case GOODS_ATTRIBUTE_CREATE: {
      return { ...state }
    }
    case GOODS_ATTRIBUTE_UPDATE: {
      return { ...state }
    }
    case GOODS_ATTRIBUTE_DELETE: {
      return { ...state }
    }
    case GOODS_ATTRIBUTE_LIST: {
      return { ...state }
    }
    case GOODS_GALLERY_CREATE: {
      return { ...state }
    }
    case GOODS_GALLERY_UPDATE: {
      return { ...state }
    }
    case GOODS_GALLERY_DELETE: {
      return { ...state }
    }
    case GOODS_GALLERY_LIST: {
      return { ...state }
    }
    case GOODS_SPECIFICATION_CREATE: {
      return { ...state }
    }
    case GOODS_SPECIFICATION_UPDATE: {
      return { ...state }
    }
    case GOODS_SPECIFICATION_DELETE: {
      return { ...state }
    }
    case GOODS_SPECIFICATION_LIST: {
      return { ...state }
    }
    default:
      return state
  }
}
