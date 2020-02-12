import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtButton, AtList, AtListItem,AtAccordion} from 'taro-ui'
import './help.scss'
import listTitle from "../../../assets/list-title.png";

export default class Help extends Component {
  config = {
    navigationBarTitleText: '帮助'
  }

  constructor () {
    super(...arguments)
    this.state = {
      entering_open:false,
      member_open:false,
      integral_open:false,
      service_open:false
    }
  }

  componentDidShow() {
  }

  handleClick(key,item) {
    if(key=='entering'){
      this.setState({
        entering_open:item
      })
    }else if(key=='member'){
      this.setState({
        member_open:item
      })
    }else if(key=='integral'){
      this.setState({
        integral_open:item
      })
    }else if(key=='service'){
      this.setState({
        service_open:item
      })
    }
  }

  render () {
    return (
      <View className='help'>
        <View className='help__wrap'>
          <AtAccordion title='入驻商城' icon={{ value: 'chevron-down', color: 'red', size: '15' }}
                       open={this.state.entering_open}
                       onClick={this.handleClick.bind(this,'entering')}>
            <AtList hasBorder={false}>
              <AtListItem
                title='标题文字'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb={listTitle}
              />
            </AtList>
          </AtAccordion>

          <AtAccordion title='会员制度' icon={{ value: 'chevron-down', color: 'red', size: '15' }}
                       open={this.state.member_open}
                       onClick={this.handleClick.bind(this,'member')}>
            <AtList hasBorder={false}>
              <AtListItem
                title='标题文字'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb={listTitle}
              />
            </AtList>
          </AtAccordion>

          <AtAccordion title='积分规则' icon={{ value: 'chevron-down', color: 'red', size: '15' }}
                       open={this.state.integral_open}
                       onClick={this.handleClick.bind(this,'integral')}>
            <AtList hasBorder={false}>
              <AtListItem
                title='标题文字'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb={listTitle}
              />
            </AtList>
          </AtAccordion>

          <AtAccordion title='售后服务' icon={{ value: 'chevron-down', color: 'red', size: '15' }}
                       open={this.state.service_open}
                       onClick={this.handleClick.bind(this,'service')}>
            <AtList hasBorder={false}>
              <AtListItem
                title='标题文字'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                arrow='right'
                thumb={listTitle}
              />
              <AtListItem
                title='标题文字'
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb={listTitle}
              />
            </AtList>
          </AtAccordion>
        </View>
      </View>
    )
  }
}
