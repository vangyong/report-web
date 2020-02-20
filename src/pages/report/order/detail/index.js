import Taro, {Component} from '@tarojs/taro'
import {View, Picker} from '@tarojs/components'
import {AtInput, AtButton, AtRadio, AtTextarea} from 'taro-ui'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/report'
import './index.scss'


@connect(state => state.report, {...actions})
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '报单详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      orderId: '',
      nickName: '',
      addressDetail: '',
      status: '',
      schemeSelector: [],
      schemeChecked: '',
    }
  }

  componentDidShow() {
    let orderId = this.$router.params.orderId
    let addressId = this.$router.params.addressId
    let addressDetail = this.$router.params.addressDetail
    let schemeId = this.$router.params.schemeId
    let schemeDetail = this.$router.params.schemeDetail

    this.props.dispatchReportSchemeList({'addressId': addressId}).then((res) => {
      this.setState({
        schemeSelector: res
      })
    })

    if (orderId != undefined) {
      this.props.dispatchReportOrderGet({orderId: orderId}).then((res) => {
        this.setState({
          nickName: res.nickName,
          orderId: res.orderId,
          addressId: res.addressId,
          addressDetail: res.addressDetail,
          schemeId: res.schemeId,
          schemeDetail: res.schemeDetail,
          schemeChecked: res.schemeDetail,
          payType: '' + res.payType,
          status: res.status,
          expressOrder: res.expressOrder,
          couponLateMoney: res.couponLateMoney,
          payMoney: res.payMoney,
          expressTotal: res.expressTotal,
          alipayAccount: res.alipayAccount,
          realName: res.realName,
          remarks: res.remarks
        })
      })
    } else {
      this.setState({
        orderId: orderId,
        addressId: addressId,
        addressDetail: addressDetail,
        schemeId: schemeId,
        schemeDetail: schemeDetail,
        schemeChecked: schemeDetail,
      })
    }
  }

  onSchemeChange = e => {
    let schemeId = this.state.schemeSelector[e.detail.value].schemeId
    this.setState({
      schemeChecked: this.state.schemeSelector[e.detail.value].schemeDetail,
      schemeDetail: this.state.schemeSelector[e.detail.value].schemeDetail,
      schemeId: schemeId
    })
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  handlePayType = value => {
    this.setState({
      payType: value
    })
  }

  handleExpressOrder(event) {
    this.setState({
      expressOrder: event.target.value
    })
  }


  handleSubmit = () => {
    if (!this.state.addressDetail) {
      Taro.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
      return
    }
    let payload = {
      orderId: this.state.orderId,
      addressId: this.state.addressId,
      addressDetail: this.state.addressDetail,
      nickName: this.state.nickName,
      schemeId: this.state.schemeId,
      schemeDetail: this.state.schemeDetail,
      payType: '' + this.state.payType,
      expressOrder: this.state.expressOrder,
      couponLateMoney: this.state.couponLateMoney,
      payMoney: this.state.payMoney,
      expressTotal: this.state.expressTotal,
      alipayAccount: this.state.alipayAccount,
      realName: this.state.realName,
      remarks: this.state.remarks
    }
    if (!this.state.orderId) {
      this.props.dispatchReportOrderCreate(payload).then((res) => {
        Taro.showToast({
          title: '报单上报成功',
          icon: 'none'
        })

        Taro.navigateTo({
          url: `/pages/report/order/fill`
        })
      }).catch(() => {
        Taro.showToast({
          title: '报单添加失败，请联系客服',
          icon: 'none'
        })
      })
    } else {
      this.props.dispatchReportOrderUpdate(payload).then((res) => {
        Taro.showToast({
          title: '报单更新成功',
          icon: 'none'
        })

        Taro.navigateTo({
          url: `/pages/report/order/fill`
        })
      }).catch(() => {
        Taro.showToast({
          title: '报单修改失败，请联系客服',
          icon: 'none'
        })
      })
    }
  }


  render() {
    return (
      <View
        className='order-detail'>
        <View
          className='order-detail__wrap'>
          <AtInput
            name='nickName'
            title='微信昵称：'
            type='text'
            placeholder='微信昵称'
            value={this.state.nickName}
            onChange={this.handleChange.bind(this, 'nickName')}
          />

          <AtInput
            name='addressDetail'
            title='详细地址：'
            type='text'
            placeholder='详细地址'
            value={this.state.addressDetail}
            onChange={this.handleChange.bind(this, 'addressDetail')}
          />

          <View>
            <Picker mode='selector' range={this.state.schemeSelector} rangeKey='schemeDetail' onChange={this.onSchemeChange}>
              <View className='picker'> 方案：{this.state.schemeChecked} </View>
            </Picker>
          </View>

          <AtRadio
            options={[
              {label: '在线付', value: '1'},
              {label: '货到付', value: '2'}
            ]}
            value={this.state.payType} onClick={this.handlePayType.bind(this)}/>

          <AtTextarea count={false} value={this.state.expressOrder}
                      onChange={this.handleExpressOrder.bind(this)}
                      placeholder='运单号'/>

          <AtInput
            name='couponLateMoney'
            title='券后金额：'
            type='text'
            placeholder='券后金额'
            value={this.state.couponLateMoney}
            onChange={this.handleChange.bind(this, 'couponLateMoney')}/>

          <AtInput
            name='expressTotal'
            title='几单：'
            type='text'
            placeholder='几单'
            value={this.state.expressTotal}
            onChange={this.handleChange.bind(this, 'expressTotal')}/>

          <AtInput
            name='payMoney'
            title='应返总额：'
            type='text'
            placeholder='应返总额(本金+佣金)。到付只填红包'
            value={this.state.payMoney}
            onChange={this.handleChange.bind(this, 'payMoney')}/>

          <AtInput
            name='alipayAccount'
            title='ZFB帐号：'
            type='text'
            placeholder='ZFB帐号'
            value={this.state.alipayAccount}
            onChange={this.handleChange.bind(this, 'alipayAccount')}/>

          <AtInput
            name='realName'
            title='真实姓名：'
            type='text'
            placeholder='真实姓名'
            value={this.state.realName}
            onChange={this.handleChange.bind(this, 'realName')}/>

          <AtInput
            name='remarks'
            title='备注说明：'
            type='text'
            placeholder='备注说明'
            value={this.state.remarks}
            onChange={this.handleChange.bind(this, 'remarks')}/>

        </View>
        <View>
          <AtButton onClick={this.handleSubmit.bind(this)}> 提交 </AtButton>
        </View>
      </View>
    )
  }
}
