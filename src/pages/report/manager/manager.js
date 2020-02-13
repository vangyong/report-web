import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './manager.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.report, { ...actions })
export default class Manager extends Component {
  config = {
    navigationBarTitleText: '报单管理'
  }

  constructor () {
    super(...arguments)
    this.state = {
      list: []
    }
  }

  componentDidShow() {
      this.props.dispatchReportAddressList().then((res) => {
          this.setState({
              list: res
          })
      })
  }

  toAddress (item) {
      Taro.navigateTo({
          url: `/pages/report/address/address`
      })
  }

  toScheme (item) {
      Taro.navigateTo({
          url: `/pages/report/scheme/scheme`
      })
  }

    toOrder (item) {
      Taro.navigateTo({
          url: `/pages/report/order/order`
      })
  }

  render () {
    const list = this.state.list
    return (
      <View className='manager'>
        <View className='manager__wrap'>
          <AtButton onClick={this.toAddress.bind(this)} className='manager-btn'>收货地址</AtButton>
          <AtButton onClick={this.toScheme.bind(this)} className='manager-btn'>方案设置</AtButton>
          <AtButton onClick={this.toOrder.bind(this)} className='manager-btn'>报单</AtButton>
        </View>
      </View>
    )
  }
}
