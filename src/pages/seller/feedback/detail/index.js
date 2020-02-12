import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtInput, AtButton, AtCard} from 'taro-ui'
import { connect } from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/feedback'
import './index.scss'

@connect(state => state.feedback, {...actions})
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '反馈详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      feedbackId: '',
      module: '',
      description: '',
      resolve: '',
      resolveTime: '',
      userId: '',
      mobileNumber:''
    }
  }

  componentDidShow() {
    let feedbackId = this.$router.params.feedbackId
    if (feedbackId!='undefined') {
      this.props.dispatchFeedbackDetail({feedbackId:feedbackId}).then((res) => {
        this.setState({
          feedbackId: res.feedbackId,
          module: res.module,
          description: res.description,
          resolve: res.resolve,
          resolveTime: res.resolveTime,
          userId: res.userId,
          nickName: res.nickName,
          mobileNumber: res.mobileNumber

        })
      })
    }
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handleSubmit = () => {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.setState({
        userId:user.userId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/login/account/account`
      })
    }
    let payload = {
      "feedbackId": this.state.feedbackId,
      "module": this.state.module,
      "description": this.state.description,
      "resolve": this.state.resolve,
      "resolveTime": this.state.resolveTime,
      "userId": this.state.userId,
      "nickName": this.state.nickName,
      "mobileNumber": this.state.mobileNumber
    }
    if(this.state.description){
      if(!this.state.feedbackId){
        this.props.dispatchFeedbackCreate(payload).then((res) => {
          Taro.navigateBack({delta: 2})
        }).catch(()=>{
          Taro.showToast({
            title: '意见添加失败，请联系客服',
            icon: 'none'
          })
        })
      }else{
        this.props.dispatchFeedbackUpdate(payload).then((res) => {
          Taro.navigateBack({delta: 2})
        }).catch(()=>{
          Taro.showToast({
            title: '意见修改失败，请联系客服',
            icon: 'none'
          })
        })
      }
    }else{
      Taro.showToast({
        title: '请填写意见详情',
        icon: 'none'
      })
    }
  }

  render () {
    return (
      <View className='feedback'>
        <View className='feedback__wrap'>
          <AtInput
            name='module'
            title='模块：'
            type='text'
            placeholder='模块'
            value={this.state.module}
            onChange={this.handleChange.bind(this,'module')}
          />
          <AtInput
            name='description'
            title='意见描述：'
            type='text'
            placeholder='意见描述'
            value={this.state.description}
            onChange={this.handleChange.bind(this, 'description')}
          />

          <AtInput
            name='nickName'
            title='昵称：'
            type='text'
            placeholder='昵称'
            value={this.state.nickName}
            onChange={this.handleChange.bind(this, 'nickName')}
          />

          <AtInput
            name='mobileNumber'
            title='电话：'
            type='text'
            placeholder='电话号码'
            value={this.state.mobileNumber}
            onChange={this.handleChange.bind(this, 'mobileNumber')}
          />

          <AtInput
            name='resolve'
            title='收货人：'
            type='text'
            placeholder='收货人姓名'
            value={this.state.resolve}
            onChange={this.handleChange.bind(this, 'resolve')}
          />

          <AtCard className='feedback__card'
            //note={this.state.resolveTime}
            extra={this.state.resolveTime}
            title='解决办法：'
            thumb=''
          >
            {this.state.resolve}
          </AtCard>

        </View>
        <View >
          <AtButton formType='submit' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
