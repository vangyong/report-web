import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './order.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.report, { ...actions })
export default class Order extends Component {
  config = {
    navigationBarTitleText: '上报单号'
  }

  constructor () {
    super(...arguments)
    this.state = {
      list: []
    }
  }

  componentDidShow() {
      this.props.dispatchReportOrderList().then((res) => {
          this.setState({
              list: res
          })
      })
  }

  toDetail (item) {
    if(item && item.orderId){
      Taro.navigateTo({
        url: `/pages/report/order/detail/index?orderId=`+item.orderId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/report/order/detail/index`
      })
    }
  }

  render () {
    const list = this.state.list
    return (
      <View className='order'>
        <View className='order__wrap'>
          <AtList className='address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.orderId}
                    title={item.nickName}
                    note={item.alipayAccount}
                    arrow='right'
                    extraText={item.payType==1?'在线付':'货到付'}
                    onClick={this.toDetail.bind(this,item)}
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
