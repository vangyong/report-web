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
            status: '',
            schemeSelector: [],
            schemeChecked: '',
        }
    }

    componentDidShow() {
        let addressId = this.$router.params.addressId
        let addressDetail = this.$router.params.addressDetail

        this.props.dispatchReportSchemeList({'addressId':addressId}).then((res) => {
            this.setState({
                schemeSelector: res
            })
        })

        this.setState({
            addressId: addressId,
            addressDetail: addressDetail,
        })
    }

    onSchemeChange = e => {
        let schemeId = this.state.schemeSelector[e.detail.value].schemeId
        this.setState({
            schemeChecked: this.state.schemeSelector[e.detail.value].schemeDetail,
            schemeDetail: this.state.schemeSelector[e.detail.value].schemeDetail,
            schemeId:schemeId
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

    handleSubmit = () => {
        if (!this.state.alipayAccount) {
            Taro.showToast({
                title: 'ZFB账号不能为空',
                icon: 'none'
            })
            return
        }

        this.props.dispatchReportOrderQuery({alipayAccount: this.state.alipayAccount,addressId:this.state.addressId,schemeId:this.state.schemeId}).then((res) => {
            if(res && res[0]){
                let order = res[0]
                this.setState({
                    orderId:order.orderId,
                    nickName: order.nickName,
                    addressId: order.addressId,
                    addressDetail: order.addressDetail,
                    schemeId: order.schemeId,
                    schemeDetail: order.schemeDetail,
                    payType: ''+order.payType,
                    status: order.status,
                    expressOrder: order.expressOrder,
                    couponLateMoney:order.couponLateMoney,
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
                this.setState({
                    payType: '',
                    status: '',
                    expressOrder: '',
                    payMoney: '',
                    expressTotal: '',
                    realName: '',
                    remarks: ''
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

        <View>
            <Picker mode='selector' range={this.state.schemeSelector} rangeKey='schemeDetail' onChange={this.onSchemeChange}>
                <View className='picker'> 方案：{this.state.schemeChecked} </View>
            </Picker>
        </View>


        < AtButton onClick = {this.handleSubmit.bind(this)}> 查询 < /AtButton>

        < AtInput
        disabled
        name = 'addressDetail'
        title = '详细地址：'
        type = 'text'
        placeholder = '详细地址'
        value = {this.state.addressDetail}
        />

        < AtInput
        disabled
        name = 'schemeDetail'
        title = '方案：'
        type = 'text'
        placeholder = '详细方案'
        value = {this.state.schemeDetail}
        />

        <AtRadio options={[{ label: '在线付', value: '1', disabled: true },{ label: '货到付', value: '2' , disabled: true}]}
        value={this.state.payType} onClick= {this.handlePayType.bind(this)} />

        <AtTextarea  disabled count={false} value={this.state.expressOrder} maxLength={2000} placeholder='运单号'/>

        < AtInput
        disabled
        name = 'couponLateMoney'
        title = '券后金额：'
        type = 'text'
        placeholder = '券后金额'
        value = {this.state.couponLateMoney}
        onChange = {this.handleChange.bind(this, 'couponLateMoney')}/>


        < AtInput
        disabled
        name = 'expressTotal'
        title = '几单：'
        type = 'text'
        placeholder = '几单'
        value = {this.state.expressTotal}/>

        < AtInput
        disabled
        name = 'payMoney'
        title = '应返总额：'
        type = 'text'
        placeholder = '应返总额(本金+返佣)。到付只填红包'
        value = {this.state.payMoney}/>

        < AtInput
        disabled
        name = 'alipayAccount'
        title = 'ZFB帐号：'
        type = 'text'
        placeholder = 'ZFB帐号'
        value = {this.state.alipayAccount}/>

        < AtInput
        disabled
        name = 'realName'
        title = '真实姓名：'
        type = 'text'
        placeholder = '真实姓名'
        value = {this.state.realName}/>

        < AtInput
        disabled
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
