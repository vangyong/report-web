import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import { dispatchVerifyCode } from '@actions/thirdpart'
import { TOKEN_KEY,USER_KEY,SMS_TEMP_MOBILE } from '@constants/common'
import {AtButton, AtInput} from "taro-ui";
import './index.scss'

@connect(state => state.user, {...actions,dispatchVerifyCode})
class Index extends Component {
  config = {
    navigationBarTitleText: '手机号码'
  }

  constructor(props) {
    super(props)
    this.state = {
      userId:'',
      mobileNumber:'',
      newMobileNumber: '',
      code: '',
      loading: false
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user) {
      this.setState({
        userId:user.userId,
        mobileNumber:user.mobileNumber,
        nickName:user.nickName
      })
    }
  }

  handleInput = (key, value) => {
    this.setState({[key]: value})
  }

  getVerifyCode = () => {
    let payload = {
      smsTempId:SMS_TEMP_MOBILE,
      mobileNumber:this.state.newMobileNumber
    }
    this.props.dispatchVerifyCode(payload).then((res) => {
      if(res){
        console.log('验证码发送成功')
        console.log(res.code)
      }
    })
  }

  handleEditMobile = () => {
    let payload = {
      userId:this.state.userId,
      code:this.state.code,
      mobileNumber:this.state.newMobileNumber
    }
    this.props.dispatchUserMobileUpdate(payload).then((res) => {
      if(res){
        Taro.navigateTo({
          url: `/pages/user/setting/setting`
        })
      }
    })
  }

  render() {
    return (
      <View className='user-setting-mobile'>
        <View className='user-setting-mobile__wrap'>

          <AtInput
            name='mobileNumber'
            title='原号码'
            type='text'
            placeholder='原号码'
            value={this.state.mobileNumber}
            onChange={this.handleInput.bind(this,'mobileNumber')}
          />

          <AtInput
            name='newMobileNumber'
            title='新号码'
            type='text'
            placeholder='新号码'
            value={this.state.newMobileNumber}
            onChange={this.handleInput.bind(this,'newMobileNumber')}
          />

          <View className='user-setting-mobile__code'>
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

          <AtButton formType='submit' onClick={this.handleEditMobile.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}

export default Index
