import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import jump from '@utils/jump'
import classNames from 'classnames'
import './index.scss'

const BUYER_MENU_LIST = [{
  key: 'buyer-order',
  text: '我的订单',
  url: '/pages/buyer/order/order',
  img: require('./assets/order.png')
}, {
  key: 'buyer-redpacket',
  text: '红包',
  url: '/pages/buyer/redpacket/redpacket',
  img: require('./assets/redpacket.png')
}, {
  key: 'buyer-integral',
  text: '我的积分',
  url: '/pages/buyer/integral/integral',
  img: require('./assets/credit.png')
}, {
  key: 'buyer-coupon',
  text: '优惠券',
  url: '/pages/buyer/coupon/coupon',
  img: require('./assets/coupon.png')
}, {
  key: 'buyer-experience',
  text: '写体验',
  url: '/pages/buyer/experience/experience',
  img: require('./assets/experience.png')
}, {
  key: 'buyer-address',
  text: '收货地址',
  url: '/pages/buyer/address/address',
  img: require('./assets/address.png')
}, {
  key: 'buyer-register-seller',
  text: '入驻商城',
  url:'/pages/seller/register/register',
  img: require('./assets/safe.png')
}, {
    key: 'buyer-help',
    text: '帮助中心',
    url: '/pages/buyer/help/help',
    img: require('./assets/help.png')
},{
  key: 'buyer-contact',
  text: '联系客服',
  url: '/pages/buyer/contact/contact',
  img: require('./assets/contact.png')
}];

const SELLER_MENU_LIST = [{
  key: 'seller-shop',
  text: '店铺管理',
  url:'/pages/seller/shop/shop',
  img: require('./assets/shop.png')
}, {
  key: 'seller-goods',
  text: '商品管理',
  url:'/pages/seller/goods/goods',
  img: require('./assets/goods.png')
}, {
  key: 'seller-order',
  text: '订单管理',
  url:'/pages/seller/order/order',
  img: require('./assets/order.png')
}, {
  key: 'seller-statistics',
  text: '数据统计',
  url:'/pages/seller/statistics/statistics',
  img: require('./assets/statistics.png')
}, {
  key: 'seller-asset',
  text: '资产',
  url:'/pages/seller/asset/asset',
  img: require('./assets/asset.png')
}, {
  key: 'seller-feedback',
  text: '用户反馈',
  url:'/pages/seller/feedback/feedback',
  img: require('./assets/feedback.png')
}];

const COUNT_LINE = 3

export default class Menu extends Component {

  static defaultProps = {
    user: {}
  }

  handleClick = (menu) => {
    if (menu.key === 'seller-shop') {
      jump({ url: menu.url, title: menu.text })
      //Taro.navigateTo({url:menu.url})
    }
    else if (menu.key === 'seller-goods') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'seller-order') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'seller-statistics') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'seller-asset') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'seller-feedback') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-order') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-redpacket') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-integral') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-coupon') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-experience') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-address') {
      jump({ url: menu.url, title: menu.text })
    }
    else if(menu.key === 'buyer-register-seller') {
      jump({url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-help') {
      jump({ url: menu.url, title: menu.text })
    }
    else if (menu.key === 'buyer-contact') {
      jump({ url: menu.url, title: menu.text })
    }
    else {
      Taro.showToast({
        title: '正在加紧实现，敬请期待',
        icon: 'none'
      })
    }
  };

  render () {
    let user = this.props.user;
    return (
      <View className='user-menu-border'>
        {user && user.tenantId &&
          <View>
            <View className='user-title'>掌柜管理</View>
            <View className='user-menu'>
              {SELLER_MENU_LIST.map((menu, index) => {
                // NOTE 不用伪元素选择器，需自行计算
                const nth = (index + 1) % COUNT_LINE === 0
                const lastLine = parseInt(index / COUNT_LINE) === parseInt(SELLER_MENU_LIST.length / COUNT_LINE)
                return (
                  <View
                    key={menu.key}
                    className={classNames(
                      'user-menu__item',
                      nth && 'user-menu__item--nth',
                      lastLine && 'user-menu__item--last',
                    )}
                    onClick={this.handleClick.bind(this, menu)}
                  >
                    <Image className='user-menu__item-img' src={menu.img} />
                    <Text className='user-menu__item-txt'>{menu.text}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        }

        <View className='user-title'>买家信息</View>
        <View className='user-menu'>
          {BUYER_MENU_LIST.map((menu) => {
            // NOTE 不用伪元素选择器，需自行计算
            //const nth = (index + 1) % COUNT_LINE === 0
            //const lastLine = parseInt(index / COUNT_LINE) === parseInt(BUYER_MENU_LIST.length / COUNT_LINE)
             if(user && user.tenantId && menu.key === 'buyer-register-seller'){
              return
            }
            return (
              <View
                key={menu.key}
                className={classNames(
                  'user-menu__item'
                )}
                onClick={this.handleClick.bind(this, menu)}
              >
                <Image className='user-menu__item-img' src={menu.img} />
                <Text className='user-menu__item-txt'>{menu.text}</Text>
              </View>
            )
          })}
        </View>

      </View>
    )
  }
}
