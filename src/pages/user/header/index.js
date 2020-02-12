import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import defaultAvatar from '@assets/default-avatar.png'
import bg from './assets/bg.png'
import './index.scss'
import qrCode from "./assets/qr-code.png";
import setting from "./assets/setting.png";
import level01 from "./assets/level-01.png";

export default class Header extends Component {

  static defaultProps = {
    user: {}
  }

  toLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  toSetting = () => {
    Taro.navigateTo({
      url: '/pages/user/setting/setting'
    })
  }

  render() {
    const user = this.props.user

    return (
      <View className='user-header'>
        <Image
          className='user-header__bg'
          src={bg}
          mode='widthFix'
        />

        <View className='user-header__wrap'>
          <View className='user-header__avatar'>
            <Image
              className='user-header__avatar-img'
              src={user.avatarUrl || defaultAvatar}
              onClick={this.toLogin}
            />
          </View>

          <View className='user-header__info' onClick={this.toLogin}>
            <Text className='user-header__info-name'>
              {user ? user.nickName : '未登录'}
            </Text>
            {!user ?
              <View className='user-header__info-wrap'>
                <Image className='user-header__info-level' src={level01} />
              </View> :
              <Text className='user-header__info-tip'>登录/切换账号</Text>
            }
          </View>


          <View className='user-header__extra'>
            <View className='user-header__extra-qr'>
              <Image
                className='user-header__extra-qr-img'
                src={qrCode}
              />
            </View>
            <View className='user-header__extra-setting' onClick={this.toSetting}>
              <Image
                className='user-header__extra-setting-img'
                src={setting}
              />
            </View>
          </View>

        </View>

      </View>
    )
  }
}
