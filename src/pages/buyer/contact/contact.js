import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/address'
import {USER_KEY} from '@constants/common'
import {AtButton, AtCard} from 'taro-ui'
import './contact.scss'
import title from "../../../assets/list-title.png";

@connect(state => state.address, { ...actions })
export default class Contact extends Component {
  config = {
    navigationBarTitleText: '联系客服'
  }

  constructor () {
    super(...arguments)
    this.state = {
      list: []
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.props.dispatchReceiveAddressList({userId:user.userId}).then((res) => {
        this.setState({
          list: res
        })
      })
    }
  }

  handleItemClick (item) {
    Taro.navigateTo({
      url: `/pages/buyer/address/detail/index?receiveAddressId=`+item.receiveAddressId
    })
  }


  handleClose () {
    Taro.navigateBack({delta: 1})
  }

  render () {
    return (
      <View className='buyer-contact'>
        <View className='buyer-contact__wrap'>
          <AtCard className='buyer-contact__card-item'
           // note='公司信息'
            // extra='公司信息'
            title='公司信息'
            thumb={title}
          >
            风土味特产馆
            www.fengtuwei.com
          </AtCard>

          <AtCard className='buyer-contact__card-item'
            //note='联系客服'
            //extra='额外信息'
            title='联系客服'
            thumb={title}
          >
            电话：18682561280
            微信：531818608
          </AtCard>

          <AtButton formType='submit' onClick={this.handleClose.bind(this)}>完成</AtButton>
        </View>
      </View>
    )
  }
}
