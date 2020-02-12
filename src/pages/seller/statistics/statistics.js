import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/address'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './statistics.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.address, { ...actions })
export default class Statistics extends Component {
  config = {
    navigationBarTitleText: '数据统计'
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
      url: `/pages/buyer/statistics/detail/index?receiveAddressId=`+item.receiveAddressId
    })
  }

  handleClose = () => {
    Taro.navigateBack({delta: 1})
  }

  render () {
    return (
      <View className='seller-statistics'>
        <View className='seller-statistics__wrap'>

          <View >统计数据暂时未完成</View>

          <Canvas style='width: 300px; height: 200px;' canvasId='canvas' />

          <AtButton formType='submit' onClick={this.handleClose.bind(this)}>完成</AtButton>
        </View>
      </View>
    )
  }
}
