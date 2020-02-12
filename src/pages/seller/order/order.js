import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/order'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem, AtTabBar} from 'taro-ui'
import './order.scss'
import listTitle from "../../../assets/list-title.png";


@connect(state => state.order, { ...actions })
export default class Order extends Component {
  config = {
    navigationBarTitleText: '订单管理'
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      list: []
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.tenantId) {
      this.props.dispatchOrderSellerPage({tenantId:user.tenantId,status:2}).then((res) => {
        this.setState({
          list: res.content
        })
      })
    }
  }

  handleClick (value) {
    let user = Taro.getStorageSync(USER_KEY)
    let payload = {
      userId:user.userId,
      status: 0
    }
    if(value==0){
      payload.status= 2
    }else if(value==1){
      payload.status= 3
    }else if(value==2){
      payload.status= 4
    }else if(value==3){
      payload.status= 5
    }
    this.props.dispatchOrderSellerPage(payload).then((res) => {
      this.setState({
        list: res.content,
        current: value
      })
    })
  }

  handleItemClick (item) {
    Taro.navigateTo({
      url: `/pages/seller/order/detail/index?orderId=`+item.orderId
    })
  }

  render () {
    const {list} = this.state
    return (
      <View className='seller-order'>
        <View className='seller-order__wrap'>
          <AtTabBar
            tabList={[
              { title: '待发货' },
              { title: '运输中' },
              { title: '已达到' },
              { title: '退货/售后' }
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />

          <AtList className='seller-order__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.orderId}
                    title={item.orderName}
                    note={item.orderMoney}
                    arrow='right'
                    onClick={this.handleItemClick.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>
        </View>
      </View>
    )
  }
}
