import Taro, {Component} from '@tarojs/taro'
import {View, Text, Picker} from '@tarojs/components'
import {AtInput, AtButton, AtSwitch, AtRadio, AtTextarea} from 'taro-ui'
import {connect} from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/report'
import {dispatchProvince, dispatchCity, dispatchCounty, dispatchTowns, dispatchChild} from '@actions/region'
import './index.scss'


@connect(state => state.report, {...actions})
export default class Query extends Component {

    config = {
        navigationBarTitleText: '报单查询'
    }

    constructor(props) {
        super(props)
        this.state = {
            orderId: '',
            nickName: '',
            detailContent: '',
            status: ''
        }
    }

    componentDidShow() {
        let addressId = this.$router.params.addressId
        let addressDetail = this.$router.params.addressDetail
        this.setState({
            addressId: addressId,
            addressDetail: addressDetail,
        })
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleSubmit = () => {
        if (!this.state.alipayAccount) {
            Taro.showToast({
                title: 'ZFB账号不能为空',
                icon: 'none'
            })
            return
        }

        this.props.dispatchReportOrderQuery({alipayAccount: this.state.alipayAccount}).then((res) => {
            if(res && res[0]){
                let order = res[0]
                this.setState({
                    orderId:order.orderId,
                    nickName: order.nickName,
                    addressId: order.addressId,
                    addressDetail: order.addressDetail,
                    schemeId: order.schemeId,
                    schemeDetail: order.schemeDetail,
                    payType: order.payType,
                    status: order.status,
                    expressOrder: order.expressOrder,
                    payMoney: order.payMoney,
                    expressTotal: order.expressTotal,
                    alipayAccount: order.alipayAccount,
                    realName: order.realName,
                    remarks: order.remarks
                })
            }else{
                Taro.showToast({
                    title: '未查询到报单',
                    icon: 'none'
                })
            }
        })

    }


    render() {
        return (
            < View
        className = 'order-detail' >
            < View
        className = 'order-detail__wrap' >
            < AtInput
        name = 'alipayAccount'
        title = 'ZFB账号：'
        type = 'text'
        placeholder = 'ZFB账号'
        value = {this.state.alipayAccount}
        onChange = {this.handleChange.bind(this, 'alipayAccount')}
        />

        < AtButton onClick = {this.handleSubmit.bind(this)}> 查询 < /AtButton>

        < AtInput
        name = 'addressDetail'
        title = '详细地址：'
        type = 'text'
        placeholder = '详细地址'
        value = {this.state.addressDetail}
        />

        < AtInput
        name = 'schemeDetail'
        title = '方案：'
        type = 'text'
        placeholder = '详细方案'
        value = {this.state.schemeDetail}
        />

        < AtSwitch
        title = '支付方式(1:在线付,2:货到付)'
        checked = {this.state.payType}
        />

        <AtTextarea count={false} value={this.state.expressOrder}
        maxLength={2000}
        placeholder='运单号'/>

        < AtInput
        name = 'payMoney'
        title = '支付金额：'
        type = 'text'
        placeholder = '支付金额(本金+返佣)'
        value = {this.state.payMoney}/>

        < AtInput
        name = 'expressTotal'
        title = '运单总数：'
        type = 'text'
        placeholder = '运单总数'
        value = {this.state.expressTotal}/>

        < AtInput
        name = 'alipayAccount'
        title = 'ZFB帐号：'
        type = 'text'
        placeholder = 'ZFB帐号'
        value = {this.state.alipayAccount}/>

        < AtInput
        name = 'realName'
        title = '真实姓名：'
        type = 'text'
        placeholder = '真实姓名'
        value = {this.state.realName}/>

        < AtInput
        name = 'remarks'
        title = '备注说明：'
        type = 'text'
        placeholder = '备注说明'
        value = {this.state.remarks}/>

        < /View>
        < View >

        < /View>
        < /View>
    )
    }
}
