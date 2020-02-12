import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {ButtonItem, InputItem} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/personal'
import {host} from '@constants/api'
import { TOKEN_KEY,USER_KEY } from '@constants/common'
import './index.scss'
import {AtButton, AtInput} from "taro-ui";


@connect(state => state.personal, actions)
class Index extends Component {
  config = {
    navigationBarTitleText: '个人资料设置'
  }

  constructor(props) {
    super(props)
    this.state = {
      userId:'',
      personalName: '',
      mobileNumber:'',
      gender: '',
      bornTime: '',
      height: '',
      bloodType: '',
      email: '',
      idCardType: '',
      identityCard: '',
      loading: false
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user) {
      this.setState({
        userId:user.userId
      })
      let payload = {
        userId:user.userId
      }
      this.props.dispatchPersonalByUserId(payload).then((res) => {
        if(res){
          this.setState({
            personalId: res.personal.personalId,
            personalName: res.personal.personalName,
            mobileNumber:user.mobileNumber,
            gender: res.personal.gender,
            bornTime: res.personal.bornTime,
            height: res.personal.height,
            bloodType: res.personal.bloodType,
            email: res.personal.email,
            idCardType: res.personal.idCardType,
            identityCard: res.personal.identityCard
          })
        }
      })
    }
  }

  handleInput = (key, value) => {
    this.setState({[key]: value})
  }

  handleEditPersonal = () => {
    let payload = {
      userId:this.state.userId,
      personalId: this.state.personalId,
      personalName: this.state.personalName,
      mobileNumber:this.state.mobileNumber,
      gender: this.state.gender,
      bornTime: this.state.bornTime,
      height: this.state.height,
      bloodType: this.state.bloodType,
      email: this.state.email,
      idCardType: this.state.idCardType,
      identityCard: this.state.identityCard
    }
    if(this.state.personalId){
      this.props.dispatchPersonalUpdate(payload).then((res) => {
        if(res){
          Taro.navigateTo({
            url: `/pages/user/setting/setting`
          })
        }
      })
    }else{
      this.props.dispatchPersonalCreate(payload).then((res) => {
        if(res){
          Taro.navigateTo({
            url: `/pages/user/setting/setting`
          })
        }
      })
    }
  }

  render() {
    return (
      <View className='user-setting-personal'>
        <View className='user-setting-personal__wrap'>
          <AtInput
            name='personalName'
            title='姓名'
            type='text'
            placeholder='姓名'
            value={this.state.personalName}
            onChange={this.handleInput.bind(this,'personalName')}
          />
          <AtInput
            name='gender'
            title='性别'
            type='text'
            placeholder='性别'
            value={this.state.gender}
            onChange={this.handleInput.bind(this,'gender')}
          />
          <AtInput
            name='bornTime'
            title='出生时间'
            type='text'
            placeholder='出生时间'
            value={this.state.bornTime}
            onChange={this.handleInput.bind(this,'bornTime')}
          />
          <AtInput
            name='height'
            title='身高'
            type='text'
            placeholder='身高'
            value={this.state.height}
            onChange={this.handleInput.bind(this,'height')}
          />
          <AtInput
            name='bloodType'
            title='血型'
            type='text'
            placeholder='血型'
            value={this.state.bloodType}
            onChange={this.handleInput.bind(this,'bloodType')}
          />
          <AtInput
            name='idCardType'
            title='证件类型'
            type='text'
            placeholder='证件类型'
            value={this.state.idCardType}
            onChange={this.handleInput.bind(this,'idCardType')}
          />
          <AtInput
            name='identityCard'
            title='证件号码'
            type='text'
            placeholder='证件号码'
            value={this.state.identityCard}
            onChange={this.handleInput.bind(this,'identityCard')}
          />
          <AtInput
            name='email'
            title='邮箱'
            type='text'
            placeholder='邮箱'
            value={this.state.email}
            onChange={this.handleInput.bind(this,'email')}
          />
          <AtButton formType='submit' onClick={this.handleEditPersonal.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}

export default Index
