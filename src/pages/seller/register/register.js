import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/seller'
import { dispatchProvince,dispatchCity,dispatchCounty,dispatchTowns,dispatchChild } from '@actions/region'
import { ButtonItem, InputItem } from '@components'
import Snowflake from 'snowflake-id'
import {USER_KEY} from '@constants/common'
import './register.scss'
@connect(state => state.seller, {...actions,dispatchProvince,dispatchCity,dispatchCounty,dispatchTowns,dispatchChild})
export default class Register extends Component {
  config = {
    navigationBarTitleText: '入驻商城'
  }

  constructor () {
    super(...arguments)
    this.state = {
      userId:'',
      mobileNumber:'',
      tenantId:'',
      tenantName:'',
      officePhone:'',
      mainProduct:'',
      businessModelSelector: [{'id':1,'name':'生产厂家'},{'id':2,'name':'经销商'}, {'id':3,'name':'种植户'},{'id':4,'name':'养殖户'}, {'id':5,'name':'合作社'}, {'id':6,'name':'个体户'}],
      businessModelChecked: '合作社',
      businessModel:'',
      addressId:'',
      regionCode:'',
      detailContent:'',
      province: [],
      provinceChecked: '四川省',
      city: [],
      cityChecked: '成都市',
      county: [],
      countyChecked: '武侯区',
      towns: [],
      townsChecked: '双楠街道办事处',
      longitude: '',
      latitude: ''
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.setState({
        mobileNumber:user.mobileNumber,
        userId:user.userId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/login/account/account`
      })
    }

    this.props.dispatchSellerUser({userId:user.userId}).then((register) => {
      if(register && register.tenant){
        const businessModelSelector = this.state.businessModelSelector;
        for(let i=0;i<businessModelSelector.length;i++){
          if(register.tenant.businessModel==businessModelSelector[i].id){
            this.setState({
              businessModelChecked: businessModelSelector[i].name
            })
          }
        }

        this.setState({
          tenantId:register.tenant.tenantId,
          userId: register.tenant.userId,
          tenantName:register.tenant.tenantName,
          tenantCode:register.tenant.tenantCode,
          status:register.tenant.status,
          mobileNumber: register.tenant.mobileNumber,
          officePhone: register.tenant.officePhone,
          mainProduct: register.tenant.mainProduct,
          addressId: register.tenant.addressId,
          regionCode: register.addressDetail.regionCode,
          detailContent: register.addressDetail.detailContent,
          provinceChecked: register.addressDetail.provinceName,
          cityChecked: register.addressDetail.cityName,
          countyChecked: register.addressDetail.countyName,
          townsChecked: register.addressDetail.townsName,
          longitude: register.addressDetail.longitude,
          latitude: register.addressDetail.latitude
        })

        //获取地区数据
        this.props.dispatchProvince({countryCode:'CHN'}).then((res) => {
          this.setState({
            province: res
          })
        })
        this.props.dispatchCity({regionCode:register.addressDetail.provinceCode}).then((res) => {
          this.setState({
            city: res
          })
        })
        this.props.dispatchCounty({regionCode:register.addressDetail.cityCode}).then((res) => {
          this.setState({
            county: res
          })
        })
        this.props.dispatchTowns({regionCode:register.addressDetail.countyCode}).then((res) => {
          this.setState({
            towns: res
          })
        })
      }else{
        //获取默认地区数据
        this.props.dispatchProvince({countryCode:'CHN'}).then((res) => {
          this.setState({
            province: res
          })
        })
        this.props.dispatchCity({regionCode:'510000000'}).then((res) => {
          this.setState({
            city: res
          })
        })
        this.props.dispatchCounty({regionCode:'510100000'}).then((res) => {
          this.setState({
            county: res
          })
        })
        this.props.dispatchTowns({regionCode:'510107000'}).then((res) => {
          this.setState({
            towns: res,
            regionCode: 510107008
          })
        })
      }

    })

  }

  onBusinessModelChange = e => {
    this.setState({
      businessModelChecked: this.state.businessModelSelector[e.detail.value].name,
      businessModel: this.state.businessModelSelector[e.detail.value].id
    })
  }

  onProvinceChange = e => {
    let regionCode = this.state.province[e.detail.value].regionCode
    this.props.dispatchCity({regionCode:regionCode}).then((res) => {
      this.setState({
        provinceChecked: this.state.province[e.detail.value].regionName,
        regionCode:regionCode,
        city: res
      })
    })
  }

  onCityChange = e => {
    let regionCode = this.state.city[e.detail.value].regionCode
    this.props.dispatchCounty({regionCode:regionCode}).then((res) => {
      this.setState({
        cityChecked: this.state.city[e.detail.value].regionName,
        regionCode:regionCode,
        county: res
      })
    })
  }

  onCountyChange = e => {
    let regionCode = this.state.county[e.detail.value].regionCode
    this.props.dispatchTowns({regionCode:regionCode}).then((res) => {
      this.setState({
        countyChecked: this.state.county[e.detail.value].regionName,
        regionCode:regionCode,
        towns: res
      })
    })
  }

  onTownsChange = e => {
    this.setState({
      townsChecked: this.state.towns[e.detail.value].regionName,
      regionCode:this.state.towns[e.detail.value].regionCode
    })
  }

  handleInput = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleRegister = () => {
      let tenant = {
        "userId": this.state.userId,
        "tenantName": this.state.tenantName,
        "mobileNumber": this.state.mobileNumber,
        "officePhone": this.state.officePhone,
        "businessModel": this.state.businessModel,
        "mainProduct": this.state.mainProduct,
        "addressId": this.state.addressId,
        "regionCode":this.state.regionCode,
        "detailContent":this.state.detailContent
      }
      let tenantId = this.state.tenantId
      if(tenantId==''||tenantId==undefined){
        this.props.dispatchSellerCreate(tenant).then((res) => {
          if(res && res.tenantId){
            this.setState({
              tenantId:res.tenantId
            })
            Taro.navigateTo({
              url: '/pages/seller/shop/shop'
            })
          }else{
            Taro.showToast({
              title: '商户注册失败',
              icon: 'none'
            })
          }
        })
      }else{
        tenant.tenantId=tenantId
        this.props.dispatchSellerUpdate(tenant).then((res) => {
          if(res && res.tenantId){
            this.setState({
              tenantId:res.tenantId
            })
            Taro.navigateTo({
              url: '/pages/user/user'
            })
          }else{
            Taro.showToast({
              title: '商户注册失败',
              icon: 'none'
            })
          }
        })
      }
  }

  uploadQualification = () => {
    Taro.navigateTo({
      url: `/pages/seller/shop/shop?tenantId=`+this.state.tenantId
    })
  }

  render () {
    const {mobileNumber,tenantName,officePhone,mainProduct,detailContent} = this.state
    return (
      <View className='seller-register'>
        <View className='seller-register__wrap'>
          <InputItem
            value={tenantName}
            placeholder='商户名称'
            onInput={this.handleInput.bind(this, 'tenantName')}
          />
          <InputItem
            value={mobileNumber}
            placeholder='手机号码'
            onInput={this.handleInput.bind(this, 'mobileNumber')}
          />
          <InputItem
            value={officePhone}
            placeholder='座机号码'
            onInput={this.handleInput.bind(this, 'officePhone')}
          />
          <InputItem
            value={mainProduct}
            placeholder='主营产品'
            onInput={this.handleInput.bind(this, 'mainProduct')}
          />
          <View className='businessModel-picker'>
            <View>经营模式：</View>
            <Picker mode='selector' range={this.state.businessModelSelector} rangeKey='name' onChange={this.onBusinessModelChange}>
              <View className='picker'>
                {this.state.businessModelChecked}
              </View>
            </Picker>
          </View>
          <View className='address-picker'>
            <Picker mode='selector' range={this.state.province} rangeKey='regionName' onChange={this.onProvinceChange}>
              <View className='picker'>
                {this.state.provinceChecked}
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.city} rangeKey='regionName' onChange={this.onCityChange}>
              <View className='picker'>
                {this.state.cityChecked}
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.county} rangeKey='regionName' onChange={this.onCountyChange}>
              <View className='picker'>
                {this.state.countyChecked}
              </View>
            </Picker>
            <Picker mode='selector' range={this.state.towns} rangeKey='regionName' onChange={this.onTownsChange}>
              <View className='picker'>
                {this.state.townsChecked}
              </View>
            </Picker>
          </View>
          <InputItem
            value={detailContent}
            placeholder='详细地址'
            onInput={this.handleInput.bind(this, 'detailContent')}
          />
        </View>
        <ButtonItem
          plain
          text='注册'
          onClick={this.handleRegister.bind(this)}
        />
        {
          this.state.tenantId &&
          <ButtonItem
            plain
            text='上传资质'
            onClick={this.uploadQualification.bind(this)}
          />
        }

      </View>
    )
  }
}
