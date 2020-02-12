import Taro, {Component} from '@tarojs/taro'
import {View, Text, Picker} from '@tarojs/components'
import {AtInput, AtButton, AtSwitch, AtRadio} from 'taro-ui'
import {connect} from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/report'
import {dispatchProvince, dispatchCity, dispatchCounty, dispatchTowns, dispatchChild} from '@actions/region'
import './index.scss'


@connect(state => state.report, {...actions})
export default class Detail extends Component {

    config = {
        navigationBarTitleText: '地址详情'
    }

    constructor(props) {
        super(props)
        this.state = {
            addressId: '',
            shortName: '',
            detailContent: '',
            status: ''
        }
    }

    componentDidShow() {
        let addressId = this.$router.params.addressId
        if (addressId != undefined) {
            this.props.dispatchReportAddressGet({addressId: addressId}).then((res) => {
                console.log(res)
                this.setState({
                    detailContent: res.detailContent,
                    addressId: res.addressId,
                    shortName: res.shortName,
                    status: res.status == 1 ? true : false
                })
            })
        }
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleStatus = value => {
        if (value == true) {
            this.props.dispatchReportAddresStatus({
                status: 0,
                userId: this.state.userId,
                addressId: this.state.addressId == '' ? '1' : this.state.addressId
            }).then((res) => {
                this.setState({
                    status: value == true ? 1 : 0
                })
                console.log(res)
            })
        }
    }


    handleSubmit = () => {
        if (!this.state.detailContent) {
            Taro.showToast({
                title: '详细地址不能为空',
                icon: 'none'
            })
            return
        }
        let payload = {
            detailContent: this.state.detailContent,
            addressId: this.state.addressId,
            shortName: this.state.shortName,
            status: this.state.status == true ? 1 : 0,
        }
        if (!this.state.addressId) {
            this.props.dispatchReportAddressCreate(payload).then((res) => {
                Taro.navigateTo({
                    url: `/pages/report/address/address`
                })
            }).catch(() => {
                Taro.showToast({
                    title: '收货地址添加失败，请联系客服',
                    icon: 'none'
                })
            })
        } else {
            this.props.dispatchReportAddressUpdate(payload).then((res) => {
                Taro.navigateTo({
                    url: `/pages/report/address/address`
                })
            }).catch(() => {
                Taro.showToast({
                    title: '收货地址修改失败，请联系客服',
                    icon: 'none'
                })
            })
        }
    }


    render() {
        return (
            < View
        className = 'receive-address' >
            < View
        className = 'receive-address__wrap' >
            < AtInput
        name = 'shortName'
        title = '简称：'
        type = 'text'
        placeholder = '简称'
        value = {this.state.shortName
    }
        onChange = {this.handleChange.bind(this, 'shortName')
    }
        />
        < AtInput
        name = 'detailContent'
        title = '详细地址：'
        type = 'text'
        placeholder = '详细地址'
        value = {this.state.detailContent
    }
        onChange = {this.handleChange.bind(this, 'detailContent')
    }
        />

        < AtSwitch
        title = '状态'
        checked = {this.state.status
    }
        onChange = {this.handleStatus
    }
        />

        < /View>
        < View >
        < AtButton
        formType = 'submit'
        onClick = {this.handleSubmit.bind(this)
    }>
        提交 < /AtButton>
        < /View>
        < /View>
    )
    }
}
