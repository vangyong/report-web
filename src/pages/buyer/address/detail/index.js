import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import {AtInput, AtButton,AtSwitch,AtRadio} from 'taro-ui'
import { connect } from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/address'
import { dispatchProvince,dispatchCity,dispatchCounty,dispatchTowns,dispatchChild } from '@actions/region'
import './index.scss'


@connect(state => state.address, {...actions,dispatchProvince,dispatchCity,dispatchCounty,dispatchTowns,dispatchChild})
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '地址详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      detailContent: '',
      longitude: '',
      latitude: '',
      receiveAddressId: '',
      userId: '',
      addressId: '',
      receiverName: '',
      mobileNumber:'',
      status:'',
      defaultStatus:'',
      regionCode:'110101004',
      description:'',
      province: [],
      provinceChecked: '北京市',
      city: [],
      cityChecked: '北京市',
      county: [],
      countyChecked: '朝阳区',
      towns: [],
      townsChecked: '安定门街道办事处'
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.setState({
        userId:user.userId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/login/account/account`
      })
    }
    let receiveAddressId = this.$router.params.receiveAddressId
    if (receiveAddressId!=undefined) {
      this.props.dispatchReceiveAddressDetail({receiveAddressId:receiveAddressId}).then((res) => {
        this.setState({
          detailContent: res.addressDetail.detailContent,
          longitude: res.addressDetail.longitude,
          latitude: res.addressDetail.latitude,
          receiveAddressId: res.receiveAddress.receiveAddressId,
          userId: res.receiveAddress.userId,
          addressId: res.receiveAddress.addressId,
          receiverName: res.receiveAddress.receiverName,
          mobileNumber: res.receiveAddress.mobileNumber,
          defaultStatus: res.receiveAddress.defaultStatus,
          status:res.receiveAddress.defaultStatus==1?true:false,
          regionCode: res.addressDetail.regionCode,
          description: res.addressDetail.detailContent,
          provinceChecked: res.addressDetail.provinceName,
          cityChecked: res.addressDetail.cityName,
          countyChecked: res.addressDetail.countyName,
          townsChecked: res.addressDetail.townsName
        })
        //获取地区数据
        this.props.dispatchProvince({countryCode:'CHN'}).then((res) => {
          this.setState({
            province: res
          })
        })
        this.props.dispatchCity({regionCode:res.addressDetail.provinceCode}).then((res) => {
          this.setState({
            city: res
          })
        })
        this.props.dispatchCounty({regionCode:res.addressDetail.cityCode}).then((res) => {
          this.setState({
            county: res
          })
        })
        this.props.dispatchTowns({regionCode:res.addressDetail.countyCode}).then((res) => {
          this.setState({
            towns: res
          })
        })

    })
    }else{
      this.props.dispatchProvince({countryCode:'CHN'}).then((res) => {
        this.setState({
          province: res
        })
      })
    }
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handleDefaultStatus = value => {
    if(value==true){
      this.props.dispatchReceiveAddresStatus({defaultStatus:0,userId:this.state.userId,receiveAddressId:this.state.receiveAddressId==''?'1':this.state.receiveAddressId}).then((res) => {
        this.setState({ status:value ,
          defaultStatus:value==true?1:0
        })
        console.log(res)
      })
    }
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

  handleSubmit = () => {
    if(!this.state.detailContent){
      Taro.showToast({
        title: '详细地址不能为空',
        icon: 'none'
      })
      return
    }
    let payload = {
      detailContent: this.state.detailContent,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      receiveAddressId: this.state.receiveAddressId,
      userId: this.state.userId,
      addressId: this.state.addressId,
      receiverName: this.state.receiverName,
      mobileNumber: this.state.mobileNumber,
      defaultStatus: this.state.status==true?1:0,
      regionCode: this.state.regionCode,
      description: this.state.description,
    }
    if(!this.state.receiveAddressId){
      this.props.dispatchReceiveAddressCreate(payload).then((res) => {
        Taro.navigateTo({
          url: `/pages/user/user`
        })
      }).catch(()=>{
        Taro.showToast({
          title: '收货地址添加失败，请联系客服',
          icon: 'none'
        })
      })
    }else{
      this.props.dispatchReceiveAddressUpdate(payload).then((res) => {
        Taro.navigateTo({
          url: `/pages/user/user`
        })
      }).catch(()=>{
        Taro.showToast({
          title: '收货地址修改失败，请联系客服',
          icon: 'none'
        })
      })
    }
  }



  render () {
    return (
      <View className='receive-address'>
        <View className='receive-address__wrap'>
          <AtInput
            name='receiverName'
            title='收货人：'
            type='text'
            placeholder='收货人姓名'
            value={this.state.receiverName}
            onChange={this.handleChange.bind(this, 'receiverName')}
          />
          <AtInput
            name='mobileNumber'
            title='手机号码：'
            type='text'
            placeholder='手机号码'
            value={this.state.mobileNumber}
            onChange={this.handleChange.bind(this, 'mobileNumber')}
          />
          <View className='at-row' style={{fontSize:'18px'}}>
            <View className='at-col'>
              <Picker mode='selector' range={this.state.province} rangeKey='regionName' onChange={this.onProvinceChange}>
                <View className='picker'>
                  {this.state.provinceChecked}
                </View>
              </Picker>
            </View>
            <View className='at-col'>
              <Picker mode='selector' range={this.state.city} rangeKey='regionName' onChange={this.onCityChange}>
                <View className='picker'>
                  {this.state.cityChecked}
                </View>
              </Picker>
            </View>
            <View className='at-col'>
              <Picker mode='selector' range={this.state.county} rangeKey='regionName' onChange={this.onCountyChange}>
                <View className='picker'>
                  {this.state.countyChecked}
                </View>
              </Picker>
            </View>
            <View className='at-col'>
              <Picker mode='selector' range={this.state.towns} rangeKey='regionName' onChange={this.onTownsChange}>
                <View className='picker'>
                  {this.state.townsChecked}
                </View>
              </Picker>
            </View>

          </View>

          <AtInput
            name='detailContent'
            title='详细地址：'
            type='text'
            placeholder='详细地址'
            value={this.state.detailContent}
            onChange={this.handleChange.bind(this, 'detailContent')}
          />

          <AtSwitch title='设为默认' checked={this.state.status} onChange={this.handleDefaultStatus} />

        </View>
        <View>
          <AtButton formType='submit' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
