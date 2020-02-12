import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import {ButtonItem} from '@components'
import {AtInput, AtButton} from 'taro-ui'
import { connect } from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/seller'
import './index.scss'


@connect(state => state.seller, {...actions})
export default class Extract extends Component {

  config = {
    navigationBarTitleText: '商户提现'
  }

  constructor(props) {
    super(props)
    this.state = {
      createTime: '',
      extractMoney: '',
      realName: '',
      sellerAccountId: '',
      status: '',
      sellerExtractId: '',
      userId: ''
    }
  }

  componentDidShow() {
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

    let sellerExtractId = this.$router.params.sellerExtractId
    if (sellerExtractId!='undefined') {
      this.props.dispatchSellerExtractDetail({sellerExtractId:sellerExtractId}).then((res) => {
        this.setState({
          createTime: res.createTime,
          extractMoney: res.extractMoney,
          realName: res.realName,
          sellerAccountId: res.sellerAccountId,
          status: res.status,
          sellerExtractId: res.sellerExtractId,
          userId: res.userId
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
    let payload = {
      "createTime": this.state.createTime,
      "extractMoney": this.state.extractMoney,
      "realName": this.state.realName,
      "sellerAccountId": this.state.sellerAccountId,
      "status": this.state.status,
      "sellerExtractId": this.state.sellerExtractId,
      "userId": this.state.userId
    }
    if(!this.state.receiveAddressId){
      this.props.dispatchSellerExtractCreate(payload).then((res) => {
        Taro.navigateTo({
          url: `/pages/seller/asset/asset`
        })
      }).catch(()=>{
        Taro.showToast({
          title: '提现失败，请联系客服',
          icon: 'none'
        })
      })
    }else{
      this.props.dispatchSellerExtractUpdate(payload).then((res) => {
        Taro.navigateTo({
          url: `/pages/seller/asset/asset`
        })
      }).catch(()=>{
        Taro.showToast({
          title: '提现修改失败，请联系客服',
          icon: 'none'
        })
      })
    }
  }

  render () {
    return (
      <View className='receive-address'>
        <View className='receive-address__wrap'>
          <AtInput
            name='extractMoney'
            title='金额：'
            type='text'
            placeholder='金额'
            value={this.state.extractMoney}
            onChange={this.handleChange.bind(this,'extractMoney')}
          />
          <AtInput
            name='createTime'
            title='时间：'
            type='text'
            placeholder='时间'
            value={this.state.createTime}
            onChange={this.handleChange.bind(this, 'createTime')}
          />
          <AtInput
            name='status'
            title='状态：'
            type='text'
            placeholder='状态'
            value={this.state.status}
            onChange={this.handleChange.bind(this, 'status')}
          />

          <AtInput
            name='realName'
            title='姓名：'
            type='text'
            placeholder='姓名'
            value={this.state.realName}
            onChange={this.handleChange.bind(this, 'realName')}
          />

        </View>
        <View >
          <AtButton formType='submit' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
