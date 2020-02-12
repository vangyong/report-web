import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/coupon'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './coupon.scss'
import listTitle from "../../../assets/list-title.png";


@connect(state => state.coupon, { ...actions })
export default class Coupon extends Component {
  config = {
    navigationBarTitleText: '优惠券'
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
      this.props.dispatchCouponUser({userId:user.userId}).then((res) => {
        this.setState({
          list: res.content
        })
      })
    }
  }

  handleItemClick (item) {
    // Taro.navigateTo({
    //   url: `/pages/buyer/address/detail/index?receiveAddressId=`+item.receiveAddressId
    // })
  }

  handleClose () {
    Taro.navigateBack({delta: 1})
  }

  render () {
    const list = this.state.list
    return (
      <View className='receive-address'>
        <View className='receive-address__wrap'>

          <AtList className='receive-address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.userCouponId}
                    title={item.couponId}
                    note={item.totalAmount}
                    arrow='right'
                    onClick={this.handleItemClick.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>
          <AtButton formType='submit' onClick={this.handleClose.bind(this)}>完成</AtButton>
        </View>
      </View>
    )
  }
}
