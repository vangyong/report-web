import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Attribute extends Component {
  static defaultProps = {
    list: []
  }

  render () {
    const { list } = this.props
    return (
      <View className='item-attribute'>
        <View className='item-attribute__title'>
          <Text className='item-attribute__title-txt'>属性:</Text>
        </View>
        {list.map((item, index) => (
          <View key={index} className='item-attribute__item'>
            <Text className='item-attribute__item-name'>{index+1}</Text>
            <Text className='item-attribute__item-value'>{item.attributeValue}</Text>
          </View>
        ))}
      </View>
    )
  }
}
