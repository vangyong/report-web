import Taro, { Component } from '@tarojs/taro'
import { ButtonItem } from '@components'

export default class AUth extends Component {
  handleClick = () => {
    Taro.showToast({
      title: '目前未实现微信H5登录',
      icon: 'none'
    })

  }

  render () {
    return (
      <ButtonItem
        type='primary'
        text='登录'
        onClick={this.handleClick}
      />
    )
  }
}
