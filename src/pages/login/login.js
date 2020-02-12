import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import { ButtonItem } from '@components'
import { host } from '@constants/api'
import Auth from './auth'
import './login.scss'

import logo from "../../assets/logo-red.png";

// NOTE 使用统一接口的多端文件进行跨端处理
// auth 中有 index.js/index.weapp.js/index.alipay.js
// 若是编译微信，则实际引入的是 index.weapp.js
// 若是编译 H5，因为不存在 index.h5.js，所以引入的是默认的 index.js

// TODO 由于 RN 的 app.js 中 initPxTransform 执行顺序关系，不能在 class 外用到 Taro.pxTransform
// const BUTTON = {
//   marginTop: Taro.pxTransform(30)
// }

@connect(state => state.user, actions)
class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  handleClick = (type) => {
    if (type === 'register'){
      Taro.navigateTo({
        url: '/pages/login/register/register'
      })
    }else if (type === 'account'){
      Taro.navigateTo({
        url: '/pages/login/account/account'
      })
    }else{
      Taro.showToast({
        title: '登录方式有误',
        icon: 'none'
      })
    }
  };

  render () {
    const BUTTON = {
      marginTop: Taro.pxTransform(30)
    }

    return (
      <View className='login'>
        <View className='login__logo'>
          <Image src={logo} className='login__logo-img' />
        </View>
        <Auth />
        <ButtonItem
          plain
          text='账号登录'
          compStyle={BUTTON}
          onClick={this.handleClick.bind(this, 'account')}
        />
        <ButtonItem
          plain
          text='注册账号'
          compStyle={BUTTON}
          onClick={this.handleClick.bind(this, 'register')}
        />
      </View>
    )
  }
}

export default Login
