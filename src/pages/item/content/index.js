import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Content extends Component {
  static defaultProps = {
    html: ''
  }

  render () {
    const { html } = this.props

    // XXX 这边直接把 img 提取出来展示，没有用 RichText
    const imgList = []
    const reg = /<img.*?src="(.*?)".*?\/>/g
    let res = null
    while (res = reg.exec(html)) {
      imgList.push(res[1])
    }

    return (
      <View className='item-content'>
        {imgList.map((item, index) => (
          <Image
            key={index}
            className='item-content__img'
            src={item}
            mode='widthFix'
          />
        ))}
      </View>
    )
  }
}
