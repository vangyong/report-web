import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/deliver'
import {USER_KEY} from '@constants/common'
import {AtButton} from "taro-ui";
import './index.scss'


@connect(state => state.deliver, {...actions})
export default class Deliver extends Component {

  config = {
    navigationBarTitleText: '发货单'
  }

  constructor(props) {
    super(props)
    this.state = {
      deliver: []

    }
  }

  componentDidShow(){
      let orderId = this.$router.params.orderId
      let user = Taro.getStorageSync(USER_KEY)
      if (user && user.userId) {
        this.props.dispatchByOrder({orderId: orderId}).then((res) => {
          this.setState({
            deliver: res
          })
        })
      }
  }

  render(){
      const list = this.state.deliver
      return (
        <View className='deliver'>
          <View className='deliver_title'>
            <Text>
              {'快递单'}
            </Text>
          </View>
          <View className='deliver-list'>
            {list.map(item => (
              <View key={item.cartDetailId} className='deliver-list__item' >
                  <View className='deliver-list__item-wrap'>
                    <Text className='deliver-list__item-name'>
                      {item.buyerOrderId}
                    </Text>
                    <Text className='deliver-list__item-price'>
                      ¥{item.createTime}
                    </Text>
                    <View className='deliver-list__item-amount'>
                      {item.remarks}
                    </View>
                  </View>
              </View>
            ))}
          </View>
        </View>
      )
  }
}
