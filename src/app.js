import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/home/home',
      'pages/cate/cate',
      'pages/cart/cart',
      'pages/cart/order/index',
      'pages/cart/payment/index',
      'pages/user/user',
      'pages/user/setting/setting',
      'pages/user/setting/mobile/index',
      'pages/user/setting/password/index',
      'pages/user/setting/personal/index',
      'pages/login/login',
      'pages/login/account/account',
      'pages/login/register/register',
      'pages/item/item',
      'pages/webview/webview',
      'pages/seller/shop/shop',
      'pages/seller/goods/goods',
      'pages/seller/goods/detail/index',
      'pages/seller/goods/specs/index',
      'pages/seller/goods/content/index',
      'pages/seller/register/register',
      'pages/seller/order/order',
      'pages/seller/order/detail/index',
      'pages/seller/order/deliver/index',
      'pages/seller/statistics/statistics',
      'pages/seller/statistics/detail/index',
      'pages/seller/asset/asset',
      'pages/seller/asset/extract/index',
      'pages/seller/feedback/feedback',
      'pages/seller/feedback/detail/index',
      'pages/buyer/order/order',
      'pages/buyer/order/detail/index',
      'pages/buyer/redpacket/redpacket',
      'pages/buyer/redpacket/detail/index',
      'pages/buyer/integral/integral',
      'pages/buyer/integral/detail/index',
      'pages/buyer/coupon/coupon',
      'pages/buyer/coupon/detail/index',
      'pages/buyer/experience/experience',
      'pages/buyer/experience/detail/index',
      'pages/buyer/address/address',
      'pages/buyer/address/detail/index',
      'pages/buyer/help/help',
      'pages/buyer/contact/contact'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '风土味',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "首页"
      }, {
        pagePath: "pages/cate/cate",
        iconPath: "./assets/tab-bar/cate.png",
        selectedIconPath: "./assets/tab-bar/cate-active.png",
        text: "发现"
      }, {
        pagePath: "pages/cart/cart",
        iconPath: "./assets/tab-bar/cart.png",
        selectedIconPath: "./assets/tab-bar/cart-active.png",
        text: "购物车"
      }, {
        pagePath: "pages/user/user",
        iconPath: "./assets/tab-bar/user.png",
        selectedIconPath: "./assets/tab-bar/user-active.png",
        text: "个人"
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
