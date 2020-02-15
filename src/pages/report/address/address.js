import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './address.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.report, { ...actions })
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
      this.props.dispatchReportAddressList().then((res) => {
          this.setState({
              list: res
          })
      })
  }

  toDetail (item) {
    if(item && item.addressId){
      Taro.navigateTo({
        url: `/pages/report/address/detail/index?addressId=`+item.addressId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/report/address/detail/index`
      })
    }
  }

  render () {
    const list = this.state.list
    return (
      <View className='address'>
        <View className='address__wrap'>
          <AtButton formType='submit' onClick={this.toDetail.bind(this)}>添加地址</AtButton>
          <AtList className='address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.addressId}
                    title={item.shortName}
                    note={item.addressDetail}
                    arrow='right'
                    extraText={item.status==1?'上报':'关闭'}
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
