import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {ButtonItem, InputItem} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import { dispatchVerifyCode } from '@actions/thirdpart'
import {host} from '@constants/api'
import { TOKEN_KEY,USER_KEY,SMS_TEMP_PASSWORD } from '@constants/common'
import './index.scss'
import {AtButton, AtInput} from "taro-ui";

@connect(state => state.user, {...actions,dispatchVerifyCode})
class Index extends Component {
  config = {
    navigationBarTitleText: '密码设置'
  }

  constructor(props) {
    super(props)
    this.state = {
      userId:'',
      mobileNumber:'',
      code: '',
      loading: false
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user) {
      this.setState({
        mobileNumber:user.mobileNumber,
        userId:user.userId,
        nickName:user.nickName
      })
    }
  }

  handleInput = (key, value) => {
    this.setState({[key]: value})
  }

  getVerifyCode = () => {
    let payload = {
      smsTempId:SMS_TEMP_PASSWORD,
      mobileNumber:this.state.mobileNumber
    }
    this.props.dispatchVerifyCode(payload).then((res) => {
      if(res){
        console.log('验证码发送成功')
        console.log(res.code)
      }
    })
  }

  handleEditPassword= () => {
    let payload = {
      userId:this.state.userId,
      code:this.state.code,
      mobileNumber:this.state.mobileNumber,
      password:this.state.password
    }
    this.props.dispatchUserPasswordUpdate(payload).then((res) => {
      if(res){
        Taro.navigateTo({
          url: `/pages/user/setting/setting`
        })
      }
    })
  }

  render() {
    return (
      <View className='user-setting-password'>
        <View className='user-setting-password__wrap'>
          <AtInput
            editable={false}
            name='mobileNumber'
            title='手机号码'
            type='mobileNumber'
            value={this.state.mobileNumber}
            placeholder='手机号码'
            onInput={this.handleInput.bind(this, 'mobileNumber')}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            value={this.state.password}
            placeholder='密码'
            onInput={this.handleInput.bind(this, 'password')}
          />
          <View className='user-setting-password__code'>
            <AtInput
              name='brief'
              title='验证码'
              type='text'
              placeholder='验证码'
              value={this.state.code}
              onChange={this.handleInput.bind(this,'code')}
            />
            <AtButton type='primary' size='small' onClick={this.getVerifyCode.bind(this)}>获取</AtButton>
          </View>
          <AtButton formType='submit' onClick={this.handleEditPassword.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}

export default Index
