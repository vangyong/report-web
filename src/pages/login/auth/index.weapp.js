import Taro, { Component } from '@tarojs/taro'
import { ButtonItem } from '@components'
import * as actions from '@actions/user'
import {connect} from "@tarojs/redux";

// XXX 仅仅作为多端组件示例，实际只实现了账号登录
@connect(state => state.user, actions)
export default class AUth extends Component {
  agreeAuth = () => {
    Taro.getUserInfo().then((res) => {
      console.log(res)
      const { errMsg, userInfo } = res
      if (errMsg === 'getUserInfo:ok') {

        Taro.login({
          success (res) {
            if (res.code) {
              console.log('res.code:')
              console.log(res.code)

            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        }).then(() => {
          Taro.showToast({
            title: '登录失败',
            icon: 'none'
          })
          this.setState({loading: false})
        })

         // Taro.showToast({
         //   title: `微信昵称: ${userInfo.nickName}，请使用账号登录`,
         //   icon: 'none'
         // })
         // this.setState({
         //   userInfo: `${userInfo.nickName}`
         // })

      } else {
        Taro.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
    })
  }

  render () {
    return (
      <ButtonItem
        type='primary'
        text='微信登录'
        openType='getUserInfo'
        onGetUserInfo={this.agreeAuth}
      />
    )
  }
}
