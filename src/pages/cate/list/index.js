import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import { host } from '@constants/api'
import './index.scss'

const HOST_FILE_DOWNLOAD = `${host}/v1/filecenter/download/`

export default class List extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (item) => {
    Taro.navigateTo({
      url: `/pages/item/item?goodsId=`+item.goodsId
    })
  }

  render () {
    const { list } = this.props
    return (
      <View className='cate-list'>
        <View className='cate-list__wrap'>
          {list.map((item, index) => (
            <View
              key={item.goodsId}
              className={classNames('cate-list__item',
                { 'cate-list__item--right': (index + 1) % 2 === 0 }
              )}
              onClick={this.handleClick.bind(this, item)}
            >
              <Image className='cate-list__item-img' src={HOST_FILE_DOWNLOAD+ item.listPictureUrl} />
              <View className='cate-list__item-txt-wrap'>
                <Text className='cate-list__item-txt'>{item.goodsName}</Text>
              </View>
            </View>
          ))}
        </View>

      </View>
    )
  }
}
