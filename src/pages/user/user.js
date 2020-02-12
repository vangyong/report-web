import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import {dispatchCartDetailNum} from '@actions/cart'
import {TOKEN_KEY, USER_KEY} from '@constants/common'
import {getWindowHeight} from '@utils/style'
import Header from './header'
import Menu from './menu'
import './user.scss'
import jwt_decode from "jwt-decode";

@connect(state => state.user, {...actions, dispatchCartDetailNum})
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  componentDidShow() {
    let token = Taro.getStorageSync(TOKEN_KEY)
    if (!token) {
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      //解析token
      let decodedToken = jwt_decode(token, {complete: true})
      let userName = decodedToken.user_name

      this.props.dispatchUser({userName: userName}).then((user) => {
        Taro.setStorage({key: USER_KEY, data: user})
        let userInfo = Taro.getStorageSync(USER_KEY)
        //获取购物车数量
        //this.props.dispatchCartDetailNum({userId:user.userId})
        this.setState({
          user: userInfo
        })
      }).catch(() => {
        Taro.showToast({
          title: '获取用户信息失败，请重新登录',
          icon: 'none'
        })
      })
    }
  }

  render() {
    let user = this.state.user;
    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{height: getWindowHeight()}}
        >
          <Header user={user} />
          <Menu user={user} />
        </ScrollView>
        {/*<View className='user__activity'>*/}
        {/*<Activity />*/}
        {/*</View>*/}
      </View>
    )
  }
}

export default User
