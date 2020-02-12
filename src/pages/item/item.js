import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Popup, Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/item'
import {USER_KEY} from '@constants/common'
import { dispatchCartDetailCreate } from '@actions/cart'
import { getWindowHeight } from '@utils/style'
import Gallery from './gallery'
import Detail from './detail'
import Attribute from './attribute'
import Content from './content'
import Footer from './footer'
import Specification from "./specification/index";
import './item.scss'

@connect(state => state.item, { ...actions, dispatchCartDetailCreate })
class Item extends Component {
  config = {
    navigationBarTitleText: '商品详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      itemDtail:{},
      amount: 1
    }
  }

  componentWillMount (){
    let goodsId = this.$router.params.goodsId
    this.setState({
      goodsId: goodsId
    })
  }

  componentDidMount() {
    this.props.dispatchItemDetail({goodsId:this.state.goodsId}).then((res) => {
      this.setState({
        loaded: true,
        itemDtail: res
      })
    })
  }

  updateAmount = (num) => {
    this.setState({
      amount: num
    })
  }

  handleAdd = () => {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId){
      let payload = {
        userId: user.userId,
        goodsId: this.state.goodsId,
        goodsName: this.state.itemDtail.goods.goodsName,
        amount: this.state.amount
      }
      this.props.dispatchCartDetailCreate(payload).then(() => {
        Taro.showToast({
          title: '加入购物车成功',
          icon: 'none'
        })
      })
    }else{
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    }
  }

  // toggleVisible = () => {
  //   this.setState({
  //     visible: !this.state.visible,
  //     selected: {}
  //   })
  // }

  render () {
    const {itemDtail} = this.state
    const gallery = itemDtail.gallery
    const specification = itemDtail.specification
    const attribute = itemDtail.attribute
    const height = getWindowHeight(false)
    // XXX RN 的 transform 写法不同，这块可以统一放到 @utils/style 的 postcss() 中处理
    const popupStyle = process.env.TARO_ENV === 'rn' ?
      { transform: [{ translateY: Taro.pxTransform(-100) }] } :
      { transform: `translateY(${Taro.pxTransform(-100)})` }

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View className='item'>
        <ScrollView
          scrollY
          className='item__wrap'
          style={{ height }}
        >
          <Gallery list={gallery} />
          <Detail data={itemDtail} />
          <Specification list={specification} onCallback={this.updateAmount} />
          <Attribute list={attribute} />
          {/*<Content html={itemDetail.content} />*/}
        </ScrollView>

        {/* NOTE Popup 一般的实现是 fixed 定位，但 RN 不支持，只能用 absolute，要注意引入位置 */}
        {/*<Popup*/}
          {/*visible={this.state.visible}*/}
          {/*onClose={this.toggleVisible}*/}
          {/*compStyle={popupStyle}*/}
        {/*>*/}
          {/*<Spec*/}
            {/*data={itemDtail}*/}
            {/*selected={this.state.selected}*/}
            {/*onSelect={this.handleSelect}*/}
          {/*/>*/}
        {/*</Popup>*/}

        <View className='item__footer'>
          <Footer onAdd={this.handleAdd} />
        </View>
      </View>
    )
  }
}

export default Item
