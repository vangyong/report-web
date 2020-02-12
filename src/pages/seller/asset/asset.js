import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/seller'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './asset.scss'
import listTitle from "./assets/list-title.png";

@connect(state => state.seller, { ...actions })
export default class Asset extends Component {
  config = {
    navigationBarTitleText: '资产'
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
      this.props.dispatchSellerExtractPage({userId:user.userId}).then((res) => {
        this.setState({
          list: res.content
        })
      })
    }
  }

  toExtract (item) {
    Taro.navigateTo({
      url: `/pages/seller/asset/extract/index?sellerExtractId=`+item.sellerExtractId
    })
  }

  render () {
    const list = this.state.list
    return (
      <View className='seller-asset'>
        <View className='seller-asset__wrap'>

          <AtList className='seller-asset__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.sellerExtractId}
                    title={item.extractMoney}
                    note={item.createTime}
                    arrow='right'
                    onClick={this.toExtract.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>
          <AtButton formType='submit' onClick={this.toExtract.bind(this)}>新增提现</AtButton>
        </View>
      </View>
    )
  }
}
