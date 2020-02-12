import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import { API_FILE_DOWNLOAD } from '@constants/api'
import './index.scss'

export default class Recommend extends Component {

  static defaultProps = {
    list: []
  }

  handleClick = (item) => {
    Taro.navigateTo({
      url: `/pages/item/item?goodsId=`+item.goodsId
    })
  }

  render() {
    const {list} = this.props
    return (
      <View className='home-recommend'>
        {/*<View className='home-recommend__title'>*/}
          {/*<Text className='home-recommend__title-txt'>为你推荐</Text>*/}
        {/*</View>*/}
        <View className='home-recommend__list'>
          {list.map(item => (
              <View
                key={item.goodsId}
                className='home-recommend__list-item'
                onClick={this.handleClick.bind(this, item)}
              >
                <Image className='home-recommend__list-item-img' src={API_FILE_DOWNLOAD+ item.listPictureUrl} />
                <View className='home-recommend__list-item-info'>
                  <Text className='home-recommend__list-item-name' numberOfLines={1}>
                    {item.goodsName}
                  </Text>

                  <View className='home-recommend__list-item-price-wrap'>
                    <Text className='home-recommend__list-item-price'>
                      ¥{item.unitPrice}
                    </Text>
                  </View>
                </View>
              </View>
            )
          )}
        </View>
      </View>
    )
  }
}
