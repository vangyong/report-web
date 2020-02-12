import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Detail extends Component {
  static defaultProps = {
    data: {}
  }

  componentWillMount (){
    let { data } = this.props
    let { comment } = data
    let level =comment.level
    let score = comment.score
    this.setState({
      level:level,
      score:score
    })
  }

  render () {
    let { data } = this.props
    let { goods } = data
    return (
      <View className='item-detail'>
        <View className='item-detail__header'>
          <View className='item-detail__header-wrap'>
            <Text className='item-detail__header-name'>{goods.goodsName}</Text>
            <Text className='item-detail__header-desc'>{goods.brief}</Text>
          </View>

        </View>

        <View className='item-detail__price'>
            <Text className='item-detail__price-symbol'>¥</Text>
            <Text className='item-detail__price-txt'>
              {goods.unitPrice}
            </Text>
            <Text className='item-detail__price-origin'>
              {goods.unit}
            </Text>

            <View className='item-detail__price-star'>
              <Text className='item-detail__price-star-link'>{'<评分>'}</Text>
              <Text className='item-detail__price-star-txt'>
                {this.state.score}
              </Text>
            </View>

        </View>

      </View>
    )
  }
}
