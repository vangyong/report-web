import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {ButtonItem} from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/cart'
import {dispatchOrderCreate,dispatchOrderPay} from '@actions/order'
import {dispatchReceiveAddressList,dispatchReceiveAddressDetail} from '@actions/address'
import {USER_KEY} from '@constants/common'
import { AtIcon,AtRadio,AtFloatLayout,AtButton } from 'taro-ui'
import './index.scss'


@connect(state => state.cart, {...actions,dispatchOrderCreate,dispatchOrderPay,dispatchReceiveAddressList,dispatchReceiveAddressDetail})
export default class Order extends Component {

  config = {
    navigationBarTitleText: '填写订单'
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedCartDetailList: [],
      totalMoney:0,
      goodsList:[],
      addressListIsOpened:false,
      payIsOpened:false,
      receiveAddressList:[],
      options:[],
      orderList:[],
      receiveAddress:{},
      addressDetail:{}
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (!user) {
      Taro.showToast({
        title: '获取用户信息失败，请联系客服',
        icon: 'none'
      })
    } else {
      this.props.dispatchCartDetailByUserState({userId:user.userId,checkState:1}).then((cartDetailList) => {
        if(cartDetailList){
          let total_money = 0
          let goods_list =[]
          for(let i=0;i<cartDetailList.length;i++){
            let item =cartDetailList[i]
            total_money = total_money+ item.amount *item.unitPrice
            let goods ={
              goodsId: item.goodsId,
              goodsName: item.goodsName,
              tenantId: item.tenantId,
              unit: item.unit,
              amount: item.amount,
              unitPrice: item.unitPrice
            }
            goods_list.push(goods)
          }
          this.setState({
            checkedCartDetailList: cartDetailList,
            totalMoney: total_money,
            goodsList: goods_list
          })
        }
      }).catch(() => {
        Taro.showToast({
          title: '获取购物车明细失败，请联系客服',
          icon: 'none'
        })
      })

      this.props.dispatchReceiveAddressList({userId:user.userId}).then((receiveAddressList) => {
        let options = []
        if(receiveAddressList.length<=0){
          Taro.navigateTo({
            url: `/pages/buyer/address/detail/index`
          })
        }
        for(let receiveAddress of receiveAddressList){
          if(receiveAddress.defaultStatus==1){
            this.getReceiveAddressDetail(receiveAddress.receiveAddressId)
          }
          //组装AtRadio的options数据
          let option={ label: receiveAddress.receiverName+receiveAddress.mobileNumber,
                        value: receiveAddress.receiveAddressId,
                        desc: receiveAddress.defaultStatus==1?'默认':''
                    }
          options.push(option)
        }
        this.setState({
          receiveAddressList:receiveAddressList,
          options:options
        })
      })
    }
  }

  getReceiveAddressDetail(receiveAddressId){
    this.props.dispatchReceiveAddressDetail({receiveAddressId:receiveAddressId}).then((res) => {
      this.setState({
        receiveAddress:res.receiveAddress,
        addressDetail:res.addressDetail
      })
    })
  }

  openAddressList=()=>{
    this.setState({
      addressListIsOpened:true
    })
  }

  changeAddress=(item)=>{
    let receiveAddressList = this.state.receiveAddressList
    for(let receiveAddress of receiveAddressList){
      if(receiveAddress.receiveAddressId==item){
        this.getReceiveAddressDetail(receiveAddress.receiveAddressId)
        this.setState({
          receiveAddress:receiveAddress
        })
      }
    }
    this.setState({
      addressListIsOpened:false
    })
  }

  toAddAddress=()=>{
    Taro.navigateTo({
      url: `/pages/buyer/address/detail/index`
    })
  }

  handleOrder = () => {
    let user = Taro.getStorageSync(USER_KEY)
    if (!user) {
      Taro.showToast({
        title: '获取用户信息失败，请联系客服',
        icon: 'none'
      })
    } else {
      if(!this.state.receiveAddress.receiveAddressId){
        Taro.showToast({
          title: '请选择收货地址',
          icon: 'none'
        })
        return
      }

      let payload = {
        userId: user.userId,
        receiveAddressId:this.state.receiveAddress.receiveAddressId,
        goodsList:this.state.goodsList
      }
      this.props.dispatchOrderCreate(payload).then((res) => {
        if(res){
          this.setState({
            payIsOpened:true,
            orderList:res
          })
        }
      })
    }
  }

  payOrder = () => {
    let user = Taro.getStorageSync(USER_KEY)
    if (!user) {
      Taro.showToast({
        title: '获取用户信息失败，请联系客服',
        icon: 'none'
      })
    } else {
      //选择付款类型支付(1:微信 2:支付宝 3:优惠券)
      let orderPays=[]
      for(let i=0;i<this.state.orderList.length;i++){
          let order = this.state.orderList[i]
          let orderPay = {
            orderId: order.orderId,
            payType:1,
            payMoney:order.orderMoney
          }
          orderPays.push(orderPay)
      }

      let payload = {
        userId: user.userId,
        orderPays:orderPays
      }
      this.props.dispatchOrderPay(payload).then((res) => {
        if(res){
          Taro.showToast({
            title: '支付成功',
            icon: 'none'
          })
          this.setState({
            payIsOpened:false
          })

          Taro.navigateBack({delta: 1})
        }
      })
    }
  }

  render () {
    const list = this.state.checkedCartDetailList
    const total_money = this.state.totalMoney
    return (
      <View className='cart-order'>
        <View className='receive-address'>
          <Text className='receive-address__txt'>
            {'收货地址'}
          </Text>
          <View className='receive-address__detail'>
            <View>
              {this.state.receiveAddress.receiverName}
              {this.state.receiveAddress.mobileNumber}
            </View>
            <View>
              {this.state.addressDetail.provinceName}
              {this.state.addressDetail.cityName}
              {this.state.addressDetail.countyName}
              {this.state.addressDetail.townsName}
              {this.state.addressDetail.detailContent}
              <AtIcon value='chevron-right' onClick={this.openAddressList}></AtIcon>
            </View>
          </View>
        </View>
        <View className='cartdetail-list'>
          {list.map(item => (
            <View key={item.cartDetailId} className='cartdetail-list__item' >
              <View className='cartdetail-list__item-info'>
                <View className='cartdetail-list__item-wrap'>
                  <Text className='cartdetail-list__item-name'>
                    {item.goodsName}
                  </Text>
                  <Text className='cartdetail-list__item-price'>
                    ¥{item.unitPrice}／{item.unit}
                  </Text>
                  <View className='cartdetail-list__item-amount'>
                    {item.amount}{item.unit}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View className='order_total-money'>
          <Text className='order_total-money-txt'>
            {'订单总金额:'} {total_money}
          </Text>
        </View>
        <View >
          <ButtonItem
            type='primary'
            text='下单'
            onClick={this.handleOrder}
          />
        </View>

        <AtFloatLayout isOpened={this.state.addressListIsOpened} title='选择地址'>
          <AtRadio
            options={this.state.options}
            value={this.state.receiveAddress.receiveAddressId}
            onClick={this.changeAddress.bind(this)}
          />
          <AtButton onClick={this.toAddAddress.bind(this)}>添加</AtButton>
        </AtFloatLayout>


        <AtFloatLayout isOpened={this.state.payIsOpened} title='支付'>
          <Text className='order_total-money-txt'>
            {'支付总金额:'} {total_money}
          </Text>
          <AtButton onClick={this.payOrder.bind(this)}>支付</AtButton>
        </AtFloatLayout>

      </View>
    )
  }
}
