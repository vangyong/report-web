import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import {ButtonItem} from '@components'
import Snowflake from 'snowflake-id'
import {AtInput, AtButton} from 'taro-ui'
import { connect } from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/address'
import './index.scss'


@connect(state => state.address, {...actions})
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '地址详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      detailContent: '',
      longitude: '',
      latitude: '',
      receiveAddressId: '',
      userId: '',
      addressId: '',
      receiverName: '',
      mobileNumber:'',
      defaultStatus:'',
      regionCode:'',
      description:'',
    }
  }

  componentDidShow() {
    let receiveAddressId = this.$router.params.receiveAddressId
    if (receiveAddressId!='undefined') {
      this.props.dispatchReceiveAddressDetail({receiveAddressId:receiveAddressId}).then((res) => {
        this.setState({
          detailContent: res.addressDetail.detailContent,
          longitude: res.addressDetail.longitude,
          latitude: res.addressDetail.latitude,
          receiveAddressId: res.receiveAddress.receiveAddressId,
          userId: res.receiveAddress.userId,
          addressId: res.receiveAddress.addressId,
          receiverName: res.receiveAddress.receiverName,
          mobileNumber: res.receiveAddress.mobileNumber,
          defaultStatus: res.receiveAddress.defaultStatus,
          regionCode: res.receiveAddress.regionCode,
          description: res.addressDetail.detailContent
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
      "detailContent": this.state.detailContent,
      "longitude": this.state.longitude,
      "latitude": this.state.latitude,
      "receiveAddressId": this.state.receiveAddressId,
      "userId": this.state.userId,
      "addressId": this.state.addressId,
      "receiverName": this.state.receiverName,
      "mobileNumber": this.state.mobileNumber,
      "defaultStatus": this.state.defaultStatus,
      "regionCode": this.state.regionCode,
      "description": this.state.description,
    }
    if(!this.state.receiveAddressId){
      this.props.dispatchReceiveAddressCreate(payload).then((res) => {
        console.log('dispatchReceiveAddressCreate：')
        console.log(res)
        Taro.navigateTo({
          url: `/pages/buyer/address/address`
        })
      }).catch(()=>{
        Taro.showToast({
          title: '地址添加失败，请联系客服',
          icon: 'none'
        })
      })
    }else{
      this.props.dispatchReceiveAddressUpdate(payload).then((res) => {
        console.log('dispatchReceiveAddressUpdate：')
        console.log(res)
        Taro.navigateTo({
          url: `/pages/buyer/address/address`
        })
      }).catch(()=>{
        Taro.showToast({
          title: '地址修改失败，请联系客服',
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
            name='regionCode'
            title='区域：'
            type='text'
            placeholder='区域'
            value={this.state.regionCode}
            onChange={this.handleChange.bind(this,'regionCode')}
          />
          <AtInput
            name='detailContent'
            title='详细地址：'
            type='text'
            placeholder='详细地址'
            value={this.state.detailContent}
            onChange={this.handleChange.bind(this, 'detailContent')}
          />

          <AtInput
            name='receiverName'
            title='收货人：'
            type='text'
            placeholder='收货人姓名'
            value={this.state.receiverName}
            onChange={this.handleChange.bind(this, 'receiverName')}
          />
          <AtInput
            name='mobileNumber'
            title='电话：'
            type='text'
            placeholder='电话号码'
            value={this.state.mobileNumber}
            onChange={this.handleChange.bind(this, 'mobileNumber')}
          />

        </View>
        <View >
          <AtButton formType='submit' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
