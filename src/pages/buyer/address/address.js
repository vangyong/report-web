import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/address'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './address.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.address, { ...actions })
export default class Address extends Component {
  config = {
    navigationBarTitleText: '收货地址'
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

  toDetail (item) {
    if(item && item.receiveAddressId){
      Taro.navigateTo({
        url: `/pages/buyer/address/detail/index?receiveAddressId=`+item.receiveAddressId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/buyer/address/detail/index`
      })
    }
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
                    key={item.receiveAddressId}
                    title={item.receiverName}
                    note={item.mobileNumber}
                    arrow='right'
                    extraText={item.defaultStatus==1?'默认':''}
                    onClick={this.toDetail.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>
          <AtButton formType='submit' onClick={this.toDetail.bind(this)}>添加地址</AtButton>
        </View>
      </View>
    )
  }
}
