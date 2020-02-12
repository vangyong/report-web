import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import {Loading} from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/seller'
import {USER_KEY} from '@constants/common'
import { AtTabBar, AtList,AtListItem,AtButton } from 'taro-ui'
import './goods.scss'
import listTitle from "./assets/list-title.png";

@connect(state => state.seller, { ...actions })
export default class Goods extends Component {
  config = {
    navigationBarTitleText: '我的商品'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      list: []
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.tenantId) {
        this.props.dispatchSellerGoodsPage({tenantId:user.tenantId,status:1}).then((res) => {
            this.setState({
              loaded: true,
              list: res.content
            })
        })
    }
  }

  handleTabClick (value) {
    let user = Taro.getStorageSync(USER_KEY)
    let payload = {
      tenantId:user.tenantId,
      status: 1
    }
    if(value==0){
      payload.status= 1
    }else if(value==1){
      payload.status= 2
    }else if(value==2){
      payload.status= 3
    }else if(value==3){
      payload.status= 4
    }
    this.props.dispatchSellerGoodsPage(payload).then((res) => {
      this.setState({
        list: res.content,
        current: value
      })
    })
  }

  handleItemClick (item) {
    Taro.navigateTo({
      url: `/pages/seller/goods/detail/index?goodsId=`+item.goodsId
    })
  }

  toDetail () {
    Taro.navigateTo({
      url: `/pages/seller/goods/detail/index`
    })
  }

  render () {
    const {list} = this.state
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='seller-goods'>
        <View className='seller-goods__wrap'>
          <AtTabBar
            tabList={[
              { title: '待上架'},
              { title: '审核失败'},
              { title: '正热销' },
              { title: '已下架' }
            ]}
            onClick={this.handleTabClick.bind(this)}
            current={this.state.current}
          />

          <AtList className='seller-goods__list'>
            {
              list.map(item=>(
                <AtListItem
                  key={item.goodsId}
                  title={item.goodsName}
                  note={item.brief}
                  arrow='right'
                  onClick={this.handleItemClick.bind(this,item)}
                  thumb={listTitle}
                />
                )
              )
            }
          </AtList>
          <AtButton formType='submit' onClick={this.toDetail.bind(this)}>添加商品</AtButton>
        </View>
      </View>
    )
  }
}
