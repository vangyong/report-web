import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {ButtonItem, InputItem} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import {host} from '@constants/api'
import { TOKEN_KEY,USER_KEY } from '@constants/common'
import './setting.scss'
import {AtButton, AtList, AtListItem} from "taro-ui";

const LOGO = `${host}/v1/filecenter/download/276263075625984`

@connect(state => state.user, actions)
class Setting extends Component {
  config = {
    navigationBarTitleText: '用户设置'
  }

  constructor(props) {
    super(props)
    this.state = {
      mobileNumber:'',
      nickName: '',
      password: '',
      loading: false
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user) {
      this.setState({
        mobileNumber:user.mobileNumber,
        nickName:user.nickName
      })
    }
  }

  toMobile() {
    Taro.navigateTo({
      url: `/pages/user/setting/mobile/index`
    })
  }

  toPassword() {
    Taro.navigateTo({
      url: `/pages/user/setting/password/index`
    })
  }

  toPersonal() {
    Taro.navigateTo({
      url: `/pages/user/setting/personal/index`
    })
  }

  handleLogout() {
    Taro.setStorage({key: USER_KEY, data: ''})
    Taro.setStorage({key: TOKEN_KEY, data: ''})
    Taro.navigateTo({
      url: `/pages/login/login`
    })
  }

  handleClose = () => {
    Taro.navigateTo({
      url: `/pages/user/user`
    })
  }

  render() {
    return (
      <View className='user-setting'>
        <View className='user-setting__wrap'>
        <AtList>
          {
            <AtListItem
              key={1}
              title={'手机号码'}
              arrow='right'
              onClick={this.toMobile.bind(this)}
            />
          }
          {
            <AtListItem
              key={2}
              title={'账号密码'}
              arrow='right'
              onClick={this.toPassword.bind(this)}
            />
          }
          {
            <AtListItem
              key={3}
              title={'个人资料'}
              arrow='right'
              onClick={this.toPersonal.bind(this)}
            />
          }
          {
            <AtListItem
              key={4}
              title={'退出登录'}
              arrow='right'
              onClick={this.handleLogout.bind(this)}
            />
          }
        </AtList>
        <AtButton formType='submit' onClick={this.handleClose.bind(this)}>完成</AtButton>
        </View>
      </View>
    )
  }
}

export default Setting
