import {combineReducers} from 'redux'
import account from './account'
import address from './address'
import cart from './cart'
import cate from './cate'
import comment from './comment'
import coupon from './coupon'
import deliver from './deliver'
import experience from './experience'
import feedback from './feedback'
import goods from './goods'
import home from './home'
import item from './item'
import order from './order'
import region from './region'
import buyer from './buyer'
import report from './report'
import seller from './seller'
import user from './user'

export default combineReducers({
    account,
    address,
    cart,
    cate,
    comment,
    coupon,
    deliver,
    experience,
    feedback,
    goods,
    home,
    item,
    order,
    region,
    buyer,
    seller,
    report,
    user
})
