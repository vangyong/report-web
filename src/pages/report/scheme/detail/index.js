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
        navigationBarTitleText: '方案详情'
    }

    constructor(props) {
        super(props)
        this.state = {
            schemeId: '',
            schemeDetail: '',
            addressId: '',
            addressDetail: '',
            status: ''
        }
    }

    componentDidShow() {
        let schemeId = this.$router.params.schemeId
        if (schemeId != undefined) {
            this.props.dispatchReportSchemeGet({schemeId: schemeId}).then((res) => {
                this.setState({
                    schemeDetail: res.schemeDetail,
                    schemeId: res.schemeId,
                    addressId: res.addressId,
                    addressDetail: res.addressDetail,
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
        this.setState({
            status: value
        })
    }


    handleSubmit = () => {
        if (!this.state.schemeDetail) {
            Taro.showToast({
                title: '详细不能为空',
                icon: 'none'
            })
            return
        }
        let payload = {
            schemeDetail: this.state.schemeDetail,
            addressId: this.state.addressId,
            addressDetail: this.state.addressDetail,
            schemeId: this.state.schemeId
        }
        if (!this.state.schemeId) {
            this.props.dispatchReportSchemeCreate(payload).then((res) => {
                Taro.navigateTo({
                    url: `/pages/report/scheme/scheme`
                })
            }).catch(() => {
                Taro.showToast({
                    title: '收货地址添加失败，请联系客服',
                    icon: 'none'
                })
            })
        } else {
            this.props.dispatchReportSchemeUpdate(payload).then((res) => {
                Taro.navigateTo({
                    url: `/pages/report/scheme/scheme`
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
        className = 'scheme-detail' >
            < View
        className = 'scheme-detail__wrap' >

        < AtInput
        name = 'schemeDetail'
        title = '方案详细：'
        type = 'text'
        placeholder = '方案详细'
        value = {this.state.schemeDetail
    }
        onChange = {this.handleChange.bind(this, 'schemeDetail')
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
