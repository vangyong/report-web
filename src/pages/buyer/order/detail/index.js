import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/order'
import {dispatchCommentCreate,dispatchCommentUpdate} from '@actions/comment'
import {USER_KEY} from '@constants/common'
import {AtButton, AtCard, AtFloatLayout, AtInput, AtMessage, AtRate, AtTextarea} from "taro-ui";
import './index.scss'
import title from "../../../../assets/list-title.png";

@connect(state => state.order, {...actions,dispatchCommentCreate,dispatchCommentUpdate})
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '订单详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      address:{},
      orderDetail: [],
      order: {},
      receiveAddress: {},
      comment:{},
      payIsOpened:false
    }
  }

  getBuyerOrderDetail=()=>{
    let orderId = this.$router.params.orderId
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.props.dispatchOrderDetail({orderId:orderId}).then((res) => {
        this.setState({
          address: res.address,
          orderDetail: res.orderDetail,
          order: res.order,
          receiveAddress: res.receiveAddress,
          comment:res.comment
        })
      })
    }
  }

  componentDidMount() {
    let orderId = this.$router.params.orderId
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.props.dispatchOrderDetail({orderId:orderId}).then((res) => {
        this.setState({
          address: res.address,
          orderDetail: res.orderDetail,
          order: res.order,
          receiveAddress: res.receiveAddress,
          comment:res.comment
        })
      })
    }
  }

  openPay = () => {
    this.setState({
      payIsOpened:true
    })
  }

  cancelBuyerOrder = () => {
    this.props.dispatchOrderDelete({orderId:this.state.order.orderId}).then((res) => {
      Taro.showToast({
        title: '订单已经取消',
        icon: 'none'
      })
      Taro.navigateBack({delta: 1})
    })
  }

  receiveBuyerOrder = () => {
    let orderId = this.state.order.orderId;
    this.props.dispatchOrderStatus({orderId:orderId,status:3})
      .then((r1) => {
        this.props.dispatchOrderDetail({orderId:orderId}).then((res) => {
          this.setState({
            address: res.address,
            orderDetail: res.orderDetail,
            order: res.order,
            receiveAddress: res.receiveAddress,
            comment:res.comment
          })
        })
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  handleChangeComment (key, value) {
    if(key=='score'){
      this.setState({
        comment:{
          commentId: this.state.comment.commentId,
          orderId: this.state.comment.orderId,
          userId: this.state.comment.userId,
          score: value,
          content:this.state.comment.content
        }
      })
    }
  }

  handleChangeContent (event) {
    this.setState({
      comment:{
        commentId: this.state.comment.commentId,
        orderId: this.state.comment.orderId,
        userId: this.state.comment.userId,
        score: this.state.comment.score,
        content: event.target.value
      }
    })
  }

  commentBuyerOrder=()=>{
    let orderId = this.state.comment.orderId
    let user = Taro.getStorageSync(USER_KEY)
    let payload = {
      commentId: this.state.comment.commentId,
      buyerOrderId: buyerOrderId,
      level: this.state.comment.level,
      score:this.state.comment.score,
      content:this.state.comment.content,
      status: this.state.comment.status,
      userId:user.userId
    }
    if(payload.commentId=='undefined'||payload.commentId==null){
      this.props.dispatchCommentCreate(payload).then((res) => {
        this.props.dispatchOrderStatus({orderId:orderId,status:4})
          .then((r1) => {
              Taro.navigateTo({
                url: `/pages/buyer/order/order`
              })
          })
          .catch((err)=> {
            console.log(err);
          })
      })
    }else{
      this.props.dispatchCommentUpdate(payload).then((res) => {
        this.props.dispatchOrderStatus({orderId:orderId,status:4})
          .then((r1) => {
              Taro.navigateTo({
                url: `/pages/buyer/order/order`
              })
          })
          .catch((err)=> {
            console.log(err);
          })
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
      let orderPay = {
        orderId: this.state.order.orderId,
        payType:1,
        payMoney:this.state.order.orderMoney
      }
      orderPays.push(orderPay)

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
    const order = this.state.order
    const address = this.state.address
    const list = this.state.orderDetail

    return (
      <View className='order-detail'>
        <View className='order-total'>
          <Text className='order-total-txt'>
            {'总金额:'}{this.state.order.orderMoney}
          </Text>
        </View>

        <View className='receive-address'>
          <AtCard className='buyer-contact__card-item'
            extra={this.state.receiveAddress.mobileNumber}
                  title={this.state.receiveAddress.receiverName}
                  thumb={title}
          >
            {address.provinceName}{address.cityName}{address.countyName},
            {address.detailContent}
          </AtCard>
        </View>

        <View className='order-detail-list'>
          {list.map(item => (
            <View key={item.cartDetailId} className='order-detail-list__item' >
              <View className='order-detail-list__item-info'>
                <View className='order-detail-list__item-wrap'>
                  <Text className='order-detail-list__item-name'>
                    {item.goodsName}
                  </Text>
                  <Text className='order-detail-list__item-price'>
                    ¥{item.unitPrice}／{item.unit}
                  </Text>
                  <View className='order-detail-list__item-amount'>
                    {item.amount}{item.unit}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View>
          {
            order && order.status==1 &&
            <View>
              <AtButton formType='submit' onClick={this.cancelBuyerOrder}>取消订单</AtButton>
              <AtButton formType='submit' onClick={this.openPay.bind(this)}>去支付</AtButton>

              <View>
                <AtFloatLayout isOpened={this.state.payIsOpened} title='支付'>
                  <Text className='order_total-money-txt'>
                    {'支付总金额:'} {this.state.order.orderMoney}
                  </Text>
                  <AtButton onClick={this.payOrder.bind(this)}>支付</AtButton>
                </AtFloatLayout>
              </View>
            </View>

          }
          {
            order && order.status==2 &&
            <View>
              <AtButton formType='submit' onClick={this.receiveBuyerOrder}>确认收货</AtButton>
            </View>
          }
          {
            order && order.status==3 &&
            <View className='comment'>
              <AtRate max={5} value={this.state.comment.score} onChange={this.handleChangeComment.bind(this, 'score')} />
              <AtTextarea
                value={this.state.comment.content}
                onChange={this.handleChangeContent.bind(this)}
                maxLength={200}
                placeholder='你的评论详述...'
              />
              <AtButton className='comment-button' formType='submit' onClick={this.commentBuyerOrder}>评论</AtButton>
            </View>
          }
          {
            order && order.status==4 &&
            <View className='comment'>
              <AtRate max={5} value={this.state.comment.score}/>
              <AtTextarea
                value={this.state.comment.content}
                onChange={this.handleChangeContent.bind(this)}
                disabled='false'
                maxLength={200}
                placeholder='你的评论详述...'
              />
            </View>
          }
        </View>
      </View>
    )
  }
}
