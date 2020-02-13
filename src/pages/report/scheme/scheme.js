import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
      list: []
    }
  }

  componentDidShow() {
      this.props.dispatchReportSchemeList().then((res) => {
          this.setState({
              list: res
          })
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
