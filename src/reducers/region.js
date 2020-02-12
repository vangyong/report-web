import { REGION_PROVINCE,REGION_CITY,REGION_COUNTY,REGION_TOWNS,REGION_CHILD} from '@constants/region'

const INITIAL_STATE = {}

export default function region(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REGION_PROVINCE: {
      return { ...state }
    }
    case REGION_CITY: {
      return { ...state }
    }
    case REGION_COUNTY: {
      return { ...state }
    }
    case REGION_TOWNS: {
      return { ...state }
    }
    case REGION_CHILD: {
      return { ...state }
    }
    default:
      return state
  }
}
