import Taro, { Component } from '@tarojs/taro'
import { Text, View, Picker} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './scheme.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.report, { ...actions })
export default class Scheme extends Component {
  config = {
    navigationBarTitleText: '方案'
  }

  constructor () {
    super(...arguments)
    this.state = {
        addressSelector: [],
        addressChecked: '',
        addressId:'',
        addressDetail:'',
        list: []
    }
  }

  componentDidShow() {
      let addressId = this.$router.params.addressId
      let addressDetail = this.$router.params.addressDetail
      if(addressId!=null&&addressDetail!=null){
          this.setState({
              addressChecked: addressDetail,
              addressDetail: addressDetail,
              addressId:addressId
          })
      }
      this.props.dispatchReportAddressList().then((res) => {
          this.setState({
              addressSelector: res
          })

          this.props.dispatchReportSchemeList({'addressId':this.state.addressId}).then((res) => {
              this.setState({
                  list: res
              })
          })
      })
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
              list: res
          })
      })
  }

  toDetail (item) {
      if(!this.state.addressId){
          Taro.showToast({
              title: '请先选择收货地址',
              icon: 'none'
          })
          return
      }
    if(item && item.schemeId){
      Taro.navigateTo({
        url: `/pages/report/scheme/detail/index?schemeId=`+item.schemeId+`&addressId=`+this.state.addressId+`&addressDetail=`+this.state.addressDetail
      })
    }else{
      Taro.navigateTo({
        url: `/pages/report/scheme/detail/index?addressId=`+this.state.addressId+`&addressDetail=`+this.state.addressDetail
      })
    }
  }

  render () {
    const list = this.state.list
    return (
      <View className='scheme'>
        <View className='scheme__wrap'>
          <View>
              <Picker mode='selector' range={this.state.addressSelector} rangeKey='addressDetail' onChange={this.onAddressChange}>
                    <View className='picker'> 收货地址：{this.state.addressChecked} </View>
              </Picker>
          </View>
          <AtButton formType='submit' onClick={this.toDetail.bind(this)}>添加方案</AtButton>
          <AtList className='address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.schemeId}
                    note={item.schemeDetail}
                    arrow='right'
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
