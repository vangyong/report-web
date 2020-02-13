/**
 * NOTE HOST在 config 中通过 defineConstants 配置的
 * 之所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST  //统一用host请求后台接口
export const report_host = REPORT_HOST
/* eslint-enable */

// file
export const API_FILE_DOWNLOAD = `${host}/v1/filecenter/download/`
export const API_FILE_UPLOAD = `${host}/v1/filecenter/uploadfile`
export const API_FILE_UPLOAD_PARAM = `${host}/v1/filecenter/uploadfile/param`
export const API_FILES_UPLOAD = `${host}/v1/filecenter/uploadfiles`
export const API_FILE_DELETE = `${host}/v1/filecenter/delete`

// thirdpart
export const API_SMS_VERIFY_CODE = `${host}/v1/thirdpart/tencent/sms/verify-code`

// home
export const API_HOME_INDEX = `${host}/v1/mall/home/index`
export const API_HOME_PIN = `${host}/v1/mall/goods/page`

export const API_HOME_RECOMMEND_PAGE = `${host}/v1/mall/home/recommend/page`
export const API_HOME_POPULAR_PAGE = `${host}/v1/mall/home/popular/page`

// cate
export const API_CATE = `${host}/v1/mall/category/list`
export const API_CATE_GOODS = `${host}/v1/mall/goods/page`

// item
export const API_ITEM_DETAIL = `${host}/v1/mall/goods/detail`

// cart
export const API_CART_DETAIL_NUM = `${host}/v1/mall/cart/detail/user`
export const API_CART_DETAIL = `${host}/v1/mall/cart/detail`
export const API_CART_DETAIL_PAGE = `${host}/v1/mall/cart/detail/page`
export const API_CART_DETAIL_LIST = `${host}/v1/mall/cart/detail/list`
export const API_CART_DETAIL_STATE = `${host}/v1/mall/cart/detail/state`
export const API_CART_DETAIL_USER_STATE = `${host}/v1/mall/cart/detail/user/state`

// user
export const API_USER_NAME = `${host}/v1/system/user/user-name`
export const API_USER_LOGIN = `${host}/v1/sso-server/form/token`
export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`
export const API_USER= `${host}/v1/system/user`
export const API_USER_MOBILE= `${host}/v1/system/user/mobile`
export const API_USER_PASSWORD= `${host}/v1/system/user/password`
export const API_PERSONAL= `${host}/v1/system/personal`
export const API_PERSONAL_USER_ID= `${host}/v1/system/personal/user`

// seller
export const API_SELLER_REGISTER = `${host}/v1/system/tenant`
export const API_SELLER_USER = `${host}/v1/system/tenant/user`
export const API_SELLER_SHOP = `${host}/v1/system/tenant/user`
export const API_SELLER_SHOP_UPDATE = `${host}/v1/system/tenant`
export const API_SELLER_GOODS = `${host}/v1/mall/goods`
export const API_SELLER_GOODS_TENANT_PAGE = `${host}/v1/mall/goods/tenant/page`

export const API_SELLER_CERTIFICATE = `${host}/v1/system/certificate`
export const API_SELLER_CERTIFICATE_BUSINESS = `${host}/v1/system/certificate/business`

export const API_SELLER_ACCOUNT = `${host}/v1/mall/seller/account`
export const API_SELLER_ACCOUNT_USER = `${host}/v1/mall/seller/account/user`

//order
export const API_ORDER = `${host}/v1/mall/order`
export const API_ORDER_SELLER_PAGE = `${host}/v1/mall/order/seller/page`
export const API_ORDER_DETAIL = `${host}/v1/mall/order/detail`
export const API_ORDER_DELIVER = `${host}/v1/mall/order/deliver`
export const API_ORDER_STATUS = `${host}/v1/mall/order/status`
export const API_ORDER_BUYER_PAGE = `${host}/v1/mall/order/buyer/page`
export const API_ORDER_PAY = `${host}/v1/mall/order/pay`


// extract
export const API_SELLER_EXTRACT = `${host}/v1/mall/seller/extract`
export const API_SELLER_EXTRACT_ALL = `${host}/v1/mall/seller/extract/user`
export const API_SELLER_EXTRACT_PAGE = `${host}/v1/mall/seller/extract/page`

// buyer
export const API_BUYER_ACCOUNT = `${host}/v1/mall/buyer/account`
export const API_BUYER_ACCOUNT_USER = `${host}/v1/mall/buyer/account/user`

// redpacket
export const API_BUYER_REDPACKET = `${host}/v1/mall/buyer/redpacket`
export const API_BUYER_REDPACKET_PAGE = `${host}/v1/mall/buyer/redpacket/page`
export const API_BUYER_REDPACKET_DETAIL = `${host}/v1/mall/buyer/redpacket/detail`
// integral
export const API_BUYER_INTEGRAL = `${host}/v1/mall/buyer/integral`
export const API_BUYER_INTEGRAL_PAGE = `${host}/v1/mall/buyer/integral/page`
export const API_BUYER_INTEGRAL_DETAIL = `${host}/v1/mall/buyer/integral/detail`

// address
export const API_RECEIVE_ADDRESS = `${host}/v1/mall/receive/address`
export const API_RECEIVE_ADDRESS_LIST = `${host}/v1/mall/receive/address/user`
export const API_RECEIVE_ADDRESS_DETAIL = `${host}/v1/mall/receive/address/detail`
export const API_RECEIVE_ADDRESS_STATUS = `${host}/v1/mall/receive/address/status`

// experience
export const API_EXPERIENCE = `${host}/v1/mall/experience`
export const API_EXPERIENCE_PAGE = `${host}/v1/mall/experience/page`
export const API_EXPERIENCE_DETAIL = `${host}/v1/mall/experience/detail`

// region
export const API_REGION_PROVINCE = `${host}/v1/system/region/province`
export const API_REGION_CITY = `${host}/v1/system/region/city`
export const API_REGION_COUNTY = `${host}/v1/system/region/county`
export const API_REGION_TOWNS = `${host}/v1/system/region/towns`
export const API_REGION_CHILD = `${host}/v1/system/region/child`

// feedback
export const API_FEEDBACK = `${host}/v1/system/feedback`
export const API_FEEDBACK_PAGE = `${host}/v1/system/feedback/page`

// coupon
export const API_COUPON = `${host}/v1/mall/coupon`
export const API_COUPON_PAGE = `${host}/v1/mall/coupon/page`
export const API_COUPON_USER = `${host}/v1/mall/coupon/user`


// goods
export const API_GOODS = `${host}/v1/mall/goods`
export const API_GOODS_ATTRIBUTE = `${host}/v1/mall/goods/attribute`
export const API_GOODS_ATTRIBUTE_LIST = `${host}/v1/mall/goods/attribute/list`
export const API_GOODS_GALLERY = `${host}/v1/mall/goods/gallery`
// export const API_GOODS_GALLERY_LIST = `${host}/v1/mall/goods/gallery/list`
export const API_GOODS_GALLERY_LIST = `${host}/v1/filecenter/files`
export const API_GOODS_GALLERY_DELETE = `${host}/v1/filecenter/delete`
export const API_GOODS_SPECIFICATION = `${host}/v1/mall/goods/specification`
export const API_GOODS_SPECIFICATION_LIST = `${host}/v1/mall/goods/specification/list`

// comment
export const API_COMMENT = `${host}/v1/mall/comment`
export const API_COMMENT_PAGE = `${host}/v1/mall/comment/page`
export const API_COMMENT_GOODS = `${host}/v1/mall/comment/goods`

// deliver
export const API_DELIVER = `${host}/v1/mall/deliver`
export const API_DELIVER_LIST_ORDER = `${host}/v1/mall/deliver/order`


// report_address
export const API_REPORT_ADDRESS = `${report_host}/v2/address`
export const API_REPORT_ADDRESS_LIST = `${report_host}/v2/address/list`
export const API_REPORT_ADDRESS_DETAIL = `${report_host}/v2/address/detail`
export const API_REPORT_ADDRESS_STATUS = `${report_host}/v2/address/status`

// report_scheme
export const API_REPORT_SCHEME = `${report_host}/v2/scheme`
export const API_REPORT_SCHEME_LIST = `${report_host}/v2/scheme/list`

// report_order
export const API_REPORT_ORDER = `${report_host}/v2/order`
export const API_REPORT_ORDER_LIST = `${report_host}/v2/order/list`
