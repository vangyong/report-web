import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {ButtonItem} from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/buyer'
import {USER_KEY} from '@constants/common'
import './index.scss'


@connect(state => state.buyer, {...actions})
export default class Payment extends Component {

  config = {
    navigationBarTitleText: '收银台'
  }

  constructor(props) {
    super(props)
    this.state = {
      address:{},
      buyerOrderDetail: [],
      order: {},
      receiveAddress: {}
    }
  }

  componentDidShow() {
    let orderIds = this.$router.params.orderIds
    let totalMoney = this.$router.params.totalMoney

    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.props.dispatchBuyerOrderDetail({buyerOrderId:buyerOrderId}).then((res) => {
        this.setState({
          address: res.address,
          buyerOrderDetail: res.buyerOrderDetail,
          order: res.order,
          receiveAddress: res.receiveAddress
        })
      })

    }else{
      Taro.showToast({
        title: '获取用户信息失败，请重新登录',
        icon: 'none'
      })
    }

  }

  handlePay = () => {
    Taro.showToast({
      title: '支付暂未开通，请联系客服',
      icon: 'none'
    })
  }

  render () {
    return (
      <View>
        <View className='receive_address'>
          <Text className='order-txt'>
            {'总金额:'}{this.state.order.orderMoney}
          </Text>
        </View>
        <View className='cartdetail-list'>

        </View>
        <View >
          <ButtonItem
            type='primary'
            text='支付'
            onClick={this.handlePay}
          />
        </View>
      </View>
    )
  }
}
