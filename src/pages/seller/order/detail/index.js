import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/order'
import {USER_KEY} from '@constants/common'
import './index.scss'
import {AtButton} from "taro-ui";


@connect(state => state.order, {...actions})
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '订单详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      order: {},
      orderDetail: [],
      receiveAddress: {}
    }
  }

  componentDidShow() {
    let orderId = this.$router.params.orderId
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.props.dispatchOrderDetail({orderId:orderId}).then((res) => {
        this.setState({
          order: res.order,
          orderDetail: res.orderDetail,
          receiveAddress: res.receiveAddress
        })
      })
    }
  }

  handleDeliver = () => {
    let user = Taro.getStorageSync(USER_KEY)
    if (!user) {
      Taro.showToast({
        title: '获取用户信息失败，请联系客服',
        icon: 'none'
      })
    } else {
      Taro.showToast({
        title: '支付暂未发货，请联系客服',
        icon: 'none'
      })
    }
  }

  toDeliver = () => {
    Taro.navigateTo({
      url: '/pages/seller/order/deliver/index?orderId='+this.state.order.orderId
    })
  }

  render () {
    const order = this.state.order
    const list = this.state.orderDetail
    return (
      <View className='seller-order-detail'>
        <View className='receive_address'>
          <Text className='receive_address-txt'>
            {'详细:'}{this.state.receiveAddress.detailContent}
          </Text>
        </View>

        <View className='order'>
          <Text className='order-txt'>
            {'总金额:'}{this.state.order.orderMoney}
          </Text>
        </View>

        <View className='order-detail-list'>
          {list.map(item => (
            <View key={item.cartDetailId} className='order-detail-list__item' >
              <View className='order-detail-list__item-info'>
                <View className='order-detail-list__item-wrap'>
                  <Text className='order-detail-list__item-name'>
                    {item.goodsName}
                  </Text>
                  <Text className='order-detail-list__item-price'>
                    ¥{item.unitPrice}／{item.unit}
                  </Text>
                  <View className='order-detail-list__item-amount'>
                    {item.amount}{item.unit}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View>
          <AtButton formType='submit' onClick={this.handleDeliver}>发货</AtButton>
          <AtButton formType='submit' onClick={this.toDeliver}>发货单</AtButton>
        </View>
      </View>
    )
  }
}
