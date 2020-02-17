import Taro, { Component } from '@tarojs/taro'
import {Picker, Text, View} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {USER_KEY} from '@constants/common'
import {AtButton, AtInput, AtList, AtListItem} from 'taro-ui'
import './order.scss'
import offlineTitle from "./assets/paypal-offline.png";
import onlineTitle from "./assets/paypal-online.png";

@connect(state => state.report, { ...actions })
export default class Order extends Component {
  config = {
    navigationBarTitleText: '上报单号'
  }

  constructor () {
    super(...arguments)
    this.state = {
      list: [],
        addressSelector: [],
        addressChecked: '',
        schemeSelector: [],
        schemeChecked: '',
    }
  }

  onAddressChange = e => {
        let addressId = this.state.addressSelector[e.detail.value].addressId
        this.setState({
            addressChecked: this.state.addressSelector[e.detail.value].addressDetail,
            addressDetail: this.state.addressSelector[e.detail.value].addressDetail,
            addressId:addressId
        })

        this.props.dispatchReportSchemeList({'addressId':addressId}).then((res) => {
            this.setState({
                schemeSelector: res
            })
        })
  }

  onSchemeChange = e => {
        let schemeId = this.state.schemeSelector[e.detail.value].schemeId
        this.setState({
            schemeChecked: this.state.schemeSelector[e.detail.value].schemeDetail,
            schemeDetail: this.state.schemeSelector[e.detail.value].schemeDetail,
            schemeId:schemeId
        })

        this.props.dispatchReportOrderList({'addressId':this.state.addressId,'schemeId':schemeId}).then((res) => {
            this.setState({
                list: res
            })
        })
  }

  onExpressOrderChange(key, value) {
        this.setState({
            [key]: value
        })

        this.props.dispatchReportOrderList({'addressId':this.state.addressId,'schemeId':this.state.schemeId,'expressOrder':this.state.expressOrder}).then((res) => {
            this.setState({
                list: res
            })
        })
  }

  componentDidShow() {
      this.props.dispatchReportAddressList().then((res) => {
          this.setState({
              addressSelector: res
          })
      })

      this.props.dispatchReportOrderList().then((res) => {
          this.setState({
              list: res
          })
      })
  }

  toDetail (item) {
    if(item && item.orderId){
      Taro.navigateTo({
        url: `/pages/report/order/detail/index?orderId=`+item.orderId+`&addressId=`+ item.addressId+`&addressDetail=`+ item.addressDetail+`&schemeId=`+ item.schemeId+`&schemeDetail=`+ item.schemeDetail
      })
    }else{
      Taro.navigateTo({
        url: `/pages/report/order/detail/index?addressId=`+ this.state.addressId+`&addressDetail=`+ this.state.addressDetail+`&schemeId=`+ this.state.schemeId+`&schemeDetail=`+ this.state.schemeDetail
      })
    }
  }

  render () {
    const list = this.state.list
    return (
      <View className='order'>
        <View className='page-section'>
          <View>
            <Picker mode='selector' range={this.state.addressSelector} rangeKey='addressDetail' onChange={this.onAddressChange}>
                <View className='picker'> 收货地址：{this.state.addressChecked} </View>
            </Picker>
           </View>
        </View>
        <View className='page-section'>
          <View>
              <Picker mode='selector' range={this.state.schemeSelector} rangeKey='schemeDetail' onChange={this.onSchemeChange}>
                <View className='picker'> 方案：{this.state.schemeChecked} </View>
               </Picker>
          </View>
        </View>

        < AtInput
          name = 'expressOrder'
          title = '运单号：'
          type = 'text'
          placeholder = '模糊查询'
          onChange={this.onExpressOrderChange.bind(this, 'expressOrder')}
          value = {this.state.expressOrder}/>

        <View className='order__wrap'>
          <AtList className='address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.orderId}
                    title={item.nickName+'：'+item.payMoney}
                    note={item.alipayAccount}
                    arrow='right'
                    extraText={item.payType==1?'线付':'到付'}
                    onClick={this.toDetail.bind(this,item)}
                    thumb= {item.payType==1? onlineTitle:offlineTitle}
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
