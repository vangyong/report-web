import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class Menu extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (categoryId) => {
    this.props.onClick(categoryId)
  }

  render () {
    const { current, list } = this.props
    return (
      <View className='cate-menu'>
        {list.map((item) => {
          const active = item.categoryId === current
          return (
            <View
              key={item.categoryId}
              className={classNames('cate-menu__item', active && 'cate-menu__item--active')}
              onClick={this.handleClick.bind(this, item.categoryId)}
            >
              <Text className={classNames('cate-menu__item-name', active && 'cate-menu__item-name--active')}>
                {item.categoryName}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }
}
