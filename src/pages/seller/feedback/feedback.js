import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/feedback'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './feedback.scss'
import listTitle from "./assets/title.png";

@connect(state => state.feedback, { ...actions })
export default class Feedback extends Component {
  config = {
    navigationBarTitleText: '反馈意见'
  }

  constructor () {
    super(...arguments)
    this.state = {
      list: []
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.props.dispatchFeedbackPage({userId:user.userId}).then((res) => {
        this.setState({
          list: res.content
        })
      })
    }
  }

  handleItemClick (item) {
    Taro.navigateTo({
      url: `/pages/seller/feedback/detail/index?feedbackId=`+item.feedbackId
    })
  }

  render () {
    const list = this.state.list
    return (
      <View className='receive-address'>
        <View className='receive-address__wrap'>

          <AtList className='receive-address__list'>
            {
              list.map(item=>(
                  <AtListItem
                    key={item.feedbackId}
                    title={item.description}
                    note={item.resolve}
                    arrow='right'
                    onClick={this.handleItemClick.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>
          <AtButton formType='submit' onClick={this.handleItemClick.bind(this)}>添加意见</AtButton>
        </View>
      </View>
    )
  }
}
