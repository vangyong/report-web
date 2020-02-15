import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {AtButton, AtList, AtListItem, AtTextarea} from 'taro-ui'
import './fill.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.report, { ...actions })
export default class Fill extends Component {
  config = {
    navigationBarTitleText: '报单填写'
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

  toQuery (item) {
        if(item && item.addressId){
            Taro.navigateTo({
                url: `/pages/report/order/query/index?addressId=`+item.addressId
            })
        }else{
            Taro.navigateTo({
                url: `/pages/report/order/query/index`
            })
        }
  }

  toDetail (item,addressId) {
      console.log(addressId)
    if(item && item.addressId){
      Taro.navigateTo({
        url: `/pages/report/order/detail/index?addressId=`+item.addressId
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
      <View className='fill'>
        <View className='fill__wrap'>
          <View className='address__list'>
            {
              list.map(item=>(
                  < View className = 'address__wrap' >
                    <AtTextarea value={item.addressDetail} />
                    <AtButton onClick={this.toQuery.bind(this,item.addressId)}>查询</AtButton>
                    <AtButton onClick={this.toDetail.bind(this,item.addressId)}>报单</AtButton>
                  </View>
                )
              )
            }
          </View>

        </View>
      </View>
    )
  }
}
