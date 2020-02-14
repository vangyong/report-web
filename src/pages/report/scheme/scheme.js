import Taro, { Component } from '@tarojs/taro'
import { Text, View, Picker} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/report'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './scheme.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.report, { ...actions })
export default class Scheme extends Component {
  config = {
    navigationBarTitleText: '方案'
  }

  constructor () {
    super(...arguments)
    this.state = {
        selector: ['美国', '中国', '巴西', '日本'],
        selectorChecked: '美国',
        list: []
    }
  }

  componentDidShow() {

      this.props.dispatchReportAddressList().then((res) => {
          this.setState({
              selector: res
          })
      })

      this.props.dispatchReportSchemeList().then((res) => {
          this.setState({
              list: res
          })
      })
  }

  onChange = e => {
    this.setState({
        selectorChecked: this.state.selector[e.detail.value]
    })
  }

  toDetail (item) {
    if(item && item.schemeId){
      Taro.navigateTo({
        url: `/pages/report/scheme/detail/index?schemeId=`+item.schemeId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/report/scheme/detail/index`
      })
    }
  }

  render () {
    const list = this.state.list
    return (
      <View className='scheme'>
        <View className='scheme__wrap'>
          <View className='page-section'>
          <Text>收货地址</Text>
          <View>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                    <View className='picker'> 当前选择：{this.state.selectorChecked} </View>
              </Picker>
          </View>
          </View>
          <AtButton formType='submit' onClick={this.toDetail.bind(this)}>添加方案</AtButton>
          <AtList className='address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.schemeId}
                    note={item.schemeDetail}
                    arrow='right'
                    onClick={this.toDetail.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>

        </View>
      </View>
    )
  }
}
