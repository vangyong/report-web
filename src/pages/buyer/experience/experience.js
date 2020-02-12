import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/experience'
import {USER_KEY} from '@constants/common'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import './experience.scss'
import listTitle from "../../../assets/list-title.png";

@connect(state => state.experience, { ...actions })
export default class Experience extends Component {
  config = {
    navigationBarTitleText: '用户体验'
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
      this.props.dispatchExperiencePage({userId:user.userId}).then((res) => {
        this.setState({
          list: res.content
        })
      })
    }
  }

  toDetail (item) {
    Taro.navigateTo({
      url: `/pages/buyer/experience/detail/index?experienceId=`+item.experienceId
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
                    key={item.experienceId}
                    title={item.brief}
                    note={item.content}
                    arrow='right'
                    onClick={this.toDetail.bind(this,item)}
                    thumb={listTitle}
                  />
                )
              )
            }
          </AtList>
          <AtButton formType='submit' onClick={this.toDetail.bind(this)}>写体验</AtButton>
        </View>
      </View>
    )
  }
}
