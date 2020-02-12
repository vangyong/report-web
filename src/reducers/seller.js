import { SELLER_CREATE, SELLER_UPDATE,SELLER_USER, SELLER_GOODS_CREATE,SELLER_GOODS_UPDATE,SELLER_GOODS_TENANT_PAGE,SELLER_SHOP,SELLER_CERTIFICATE_CREATE,SELLER_CERTIFICATE_DELETE,SELLER_CERTIFICATE_BUSINESS,
  SELLER_EXTRACT_CREATE,SELLER_EXTRACT_UPDATE,SELLER_EXTRACT_DELETE,SELLER_EXTRACT_PAGE,SELLER_EXTRACT_ALL,SELLER_EXTRACT_DETAIL} from '@constants/seller'

const INITIAL_STATE = {
  userInfo: {}
}

export default function seller(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SELLER_CREATE: {
      return { ...state }
    }
    case SELLER_UPDATE: {
      return { ...state }
    }
    case SELLER_USER: {
      return { ...state }
    }
    case SELLER_GOODS_CREATE: {
      return { ...state }
    }
    case SELLER_GOODS_UPDATE: {
      return { ...state }
    }
    case SELLER_GOODS_TENANT_PAGE: {
      return { ...state }
    }
    case SELLER_SHOP: {
      return { ...state }
    }
    case SELLER_CERTIFICATE_CREATE: {
      return {...state }
    }
    case SELLER_CERTIFICATE_DELETE: {
      return {...state }
    }
    case SELLER_CERTIFICATE_BUSINESS: {
      return {...state }
    }
    case SELLER_EXTRACT_CREATE: {
      return { ...state }
    }
    case SELLER_EXTRACT_UPDATE: {
      return { ...state }
    }
    case SELLER_EXTRACT_DELETE: {
      return { ...state }
    }
    case SELLER_EXTRACT_PAGE: {
      return { ...state }
    }
    case SELLER_EXTRACT_ALL: {
      return { ...state }
    }
    case SELLER_EXTRACT_DETAIL: {
      return { ...state }
    }
    default:
      return state
  }
}
