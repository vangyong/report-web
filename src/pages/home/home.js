import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/home'
import { dispatchCartDetailNum } from '@actions/cart'
import { USER_KEY} from '@constants/common'
import { AtSearchBar } from 'taro-ui'
import { getWindowHeight } from '@utils/style'
import Banner from './banner'
import Recommend from './recommend'
import Popular from './popular'
import './home.scss'

@connect(state => state.home, { ...actions, dispatchCartDetailNum })
class Home extends Component {
  config = {
    navigationBarTitleText: '风土味'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      limit: 10,
      page: 0,
      first:true,
      last:false,
      total:0,
      totalPages:0,
      keyword:'',
      recommend: [],
      homeIndex:{}
    }
  }

  componentDidMount() {
    this.props.dispatchHomeIndex().then((res) => {
      this.setState({
        loaded: true ,
        homeIndex:res
      })
    })

    this.loadRecommend()
  }

  // 获取推荐商品
  loadRecommend = (keyword) => {
    let page =1
    let payload = {
      limit: this.state.limit,
      page: page,
      status:3,
      goodsName: (keyword)?keyword:''
    }
    this.props.dispatchRecommendPage(payload).then((res) => {
      this.setState({
        recommend: res.content,
        page: page,
        last:res.last,
        total:res.totalElements,
        totalPages:res.totalPages,
        loaded: true
      })
    }).catch((e) => {
      console.log(e)
      Taro.showToast({
        title: '获取推荐商品失败',
        icon: 'none'
      })
    })
  }

  loadMore = () => {
    let keyword = this.state.keyword
    if(this.state.last){
      return
    }
    let page =this.state.page+1
    let payload = {
      limit: 10,
      page: page,
      status:3,
      goodsName:(keyword)?keyword:''
    }
    this.props.dispatchRecommendPage(payload).then((res) => {
      this.setState({
        recommend: res.content,
        page: page,
        last:res.last,
        total:res.totalElements,
        totalPages:res.totalPages,
        loaded: true,
      })
    })
  }

  loadLess = () => {
    let keyword = this.state.keyword
    if(this.state.first){
      return
    }
    let page =this.state.page-1
    let payload = {
      limit: 10,
      page: page,
      status:3,
      goodsName:(keyword)?keyword:''
    }
    this.props.dispatchRecommendPage(payload).then((res) => {
      this.setState({
        loaded: true,
        page: page,
        last:res.last,
        list: res.content,
        current: categoryId
      })
    })
  }

  onChange (value) {
    this.setState({
      keyword: value
    })
  }

  onActionClick () {
    this.loadRecommend(this.state.keyword)
  }

  render () {
   if (!this.state.loaded) {
      return <Loading />
    }
    const homeIndex = this.state.homeIndex
    const recommend = this.state.recommend
    const height = getWindowHeight()
    return (
      <View className='home'>
        <View className='home__search'>
          <AtSearchBar
            actionName='搜一下'
            value={this.state.keyword}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />

        </View>
        <View>
          <Banner list={homeIndex.bannerList} />
        </View>
        <ScrollView
          scrollY
          onScrollToLower={this.loadMore}
          onScrollToUpper={this.loadLess}
          style={{ height }}
        >
        <View>
          <Recommend list={recommend} />
        </View>
      </ScrollView>
        {/*<View>*/}
          {/*<Popular />*/}
        {/*</View>*/}

      </View>
    )
  }
}

export default Home
