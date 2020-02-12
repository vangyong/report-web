import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/buyer'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './integral.scss'
import listTitle from "../../../assets/list-title.png";


@connect(state => state.buyer, { ...actions })
export default class Integral extends Component {
  config = {
    navigationBarTitleText: '积分'
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
      this.props.dispatchBuyerIntegralPage({userId:user.userId}).then((res) => {
        this.setState({
          list: res.content
        })
      })
    }
  }

  handleItemClick (item) {

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
                    key={item.buyerIntegralId}
                    title={item.integralAmount}
                    note={item.goodsName}
                    arrow='right'
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
