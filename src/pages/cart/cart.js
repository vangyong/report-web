import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import { Loading, CheckboxItem, ButtonItem,InputNumber} from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/cart'
import { USER_KEY } from '@constants/common'
import { getWindowHeight } from '@utils/style'
import Empty from './empty'
import './cart.scss'

@connect(state => state.cart, actions)
class Cart extends Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  constructor(props) {
    super(props)
    this.state = {
      cartDetailList:[],
      totalMoney:0
    }
  }

  componentDidShow() {
    this.getCartDetailList()
  }

  getCartDetailList(){
    let user = Taro.getStorageSync(USER_KEY)
    if(user){
      let payload = {
        userId: user.userId
      }
      this.props.dispatchCartDetailList(payload).then((res) => {
        if(res){
          let money = 0;
          for(let detail of res){
            if(detail.checkState==1){
              money = money+detail.unitPrice * detail.amount
            }
          }
          this.setState({
            totalMoney:money,
            cartDetailList:res
          })
        }
      })
    }else{
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }
  }

  handleUpdate = (item, amount) => {
    let oldList = this.state.cartDetailList
    oldList.forEach(i=>{
      if(i.cartDetailId==item.cartDetailId){
        i.amount =amount
      }
    })

    let payload = {
      cartDetailId: item.cartDetailId,
      userId: item.userId,
      goodsId: item.goodsId,
      goodsName: item.goodsName,
      unit: item.unit,
      amount:item.amount,
      unitPrice: item.unitPrice,
      checkState: item.checkState,
      createTime: item.createTime,
      tenantId: item.tenantId,
      tenantName: item.tenantName
    }
    this.props.dispatchCartDetailUpdate(payload).then((res) => {
      if(res){
        this.getCartDetailList()
      }
    })
    this.setState({
      cartDetailList:oldList
    })
  }

  handleUpdateCheck = (item) => {
    let user = Taro.getStorageSync(USER_KEY)
    let payload = {
      cartDetailId: item.cartDetailId,
      userId: user.userId,
      checkState: item.checkState==1?0:1
    }
    this.props.dispatchCartDetailStateUpdate(payload).then((res) => {
      if(res){
        this.getCartDetailList()
      }
    })
  }

  handleCheckAll = (item) => {
    let list = this.state.cartDetailList
    if(list){
      for(let detail of list){
        this.handleUpdateCheck(detail)
      }
    }
    this.getCartDetailList()
  }

  toPayment = () => {
    Taro.navigateTo({
      url: '/pages/cart/order/index'
    })
  }

  render () {
    const list = this.state.cartDetailList
    const isEmpty = !list.length
    const isShowFooter = !isEmpty

    return (
      <View className='cart'>
        <ScrollView
          scrollY
          className='cart__wrap'
          style={{height: getWindowHeight()}}
        >

          {isEmpty && <Empty />

          }

          {!isEmpty &&

          <View className='cart-list'>
            {list.map(item => (
              <View key={item.cartDetailId} className='cart-list__item' >
                <CheckboxItem  checked={item.checkState} onClick={this.handleUpdateCheck.bind(this, item)} />
                <View className='cart-list__item-info'>
                  <View className='cart-list__item-title'>
                    <Text className='cart-list__item-title-name' numberOfLines={1}>
                    {item.goodsName}
                    </Text>
                  </View>

                  <View className='cart-list__item-wrap'>
                    <Text className='cart-list__item-price'>
                    ¥{item.unitPrice}
                    </Text>
                    <Text className='cart-list__item-price'>
                    ／{item.unit}
                    </Text>
                    <View className='cart-list__item-num'>
                        <InputNumber num={item.amount} onChange={this.handleUpdate.bind(this, item)} />
                    </View>
                  </View>
                </View>
              </View>
              ))
            }
          </View>


          }
        {isShowFooter &&

        <View className='cart-footer'>
          <View className='cart-footer__select'>
            <CheckboxItem onClick={this.handleCheckAll} >
              <Text className='cart-footer__select-txt'>
                {'全选'}
              </Text>
            </CheckboxItem>
          </View>

          <View className='cart-footer__amount'>
            <Text className='cart-footer__amount-txt'>
              合计：¥{parseFloat(this.state.totalMoney).toFixed(2)}
            </Text>
          </View>

          <View className='cart-footer__btn'>
            <ButtonItem
              type='primary'
              text='去结算'
              onClick={this.toPayment}
            />
          </View>
        </View>

        }

        </ScrollView>
      </View>
    )
  }
}

export default Cart
