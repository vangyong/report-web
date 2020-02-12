import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/home'
import { API_FILE_DOWNLOAD } from '@constants/api'
import { getWindowHeight } from '@utils/style'
import './index.scss'


@connect(state => state.home, { ...actions})
export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      page: 0,
      total:0,
      totalPages:0,
      last:false,
      popular: [],
    }
  }


  componentDidMount() {
    this.loadPopular()
  }

  // 获取热销榜
  loadPopular = () => {
    if(this.state.last){
      return
    }
    let page =this.state.page+1
    let payload = {
      limit: 10,
      page: page,
    }
    this.props.dispatchPopularPage(payload).then((res) => {
      this.setState({
        popular: res.content,
        page: page,
        total: res.totalElements,
        totalPages: res.totalPages,
        last:res.last,
        loaded: true
      })
    }).catch(() => {
      Taro.showToast({
        title: '获取热销产品失败',
        icon: 'none'
      })
    })
  }





  handleClick = (item) => {
    Taro.navigateTo({
      url: `/pages/item/item?goodsId=`+item.goodsId
    })
  }

  render () {
    let list = this.state.popular
    console.log(getWindowHeight())
    return (
      <View className='home-popular'>
        <View className='home-popular__title'>
          <Text className='home-popular__title-txt'>热销排行</Text>
        </View>
        <ScrollView scrollY className='home__wrap' onScrollToLower={this.loadPopular} style={{ height: getWindowHeight() }} >
        <View className='home-popular__list'>
          {list.map(item => (
              <View
                key={item.goodsId}
                className='home-popular__list-item'
                onClick={this.handleClick.bind(this, item)}
              >
                <Image className='home-popular__list-item-img' src={API_FILE_DOWNLOAD+ item.listPictureUrl} />
                <View className='home-popular__list-item-info'>
                  <Text className='home-popular__list-item-name'>
                    {item.goodsName}
                  </Text>

                  <View className='home-popular__list-item-price-wrap'>
                    <Text className='home-popular__list-item-price'>
                      ¥{item.unitPrice}
                    </Text>
                  </View>
                </View>
              </View>
            )
          )}
        </View>
        </ScrollView>


      </View>
    )
  }
}
