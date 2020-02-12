import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/cate'
import { getWindowHeight } from '@utils/style'
import Menu from './menu'
import List from './list'
import './cate.scss'

@connect(state => state.cate, { ...actions })
class Cate extends Component {
  config = {
    navigationBarTitleText: '发现'
  }

  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      page: 0,
      first:true,
      last:false,
      current: -1,
      loaded: false,
      categoryId:'',
      categoryList: [],
      list: [],
      loading: false
    }
  }

  componentDidMount() {
    this.props.dispatchMenu({channelId:1}).then((res) => {
      if(res){
        let categoryId = res[0].categoryId
        this.handleMenu(categoryId)
        this.setState({
          current: categoryId
        })
      }
      this.setState({
        loaded: true,
        categoryList: res
      })
    })
  }

  handleMenu = (categoryId) => {
    if(!categoryId){
      categoryId = this.state.categoryId
    }
    let payload = {
      limit: 10,
      page: 1,
      categoryId:categoryId,
      status:3
    }
    this.props.dispatchGoods(payload).then((res) => {
      this.setState({
        loaded: true,
        loading: true,
        page: 1,
        first:res.first,
        last:res.last,
        list: res.content,
        categoryId: categoryId
      }, () => {
        this.setState({ current: categoryId, loading: false })
      })
    })
  }

  loadMore = (categoryId) => {
    if(this.state.last){
      return
    }
    let page =this.state.page+1
    if(!categoryId){
      categoryId = this.state.current
    }

    let payload = {
      limit: 10,
      page: page,
      categoryId:categoryId
    }
    this.props.dispatchGoods(payload).then((res) => {
      this.setState({
        loaded: true,
        page: page,
        last:res.last,
        list: res.content,
        current: categoryId
      })
    })
  }

  loadLess = (categoryId) => {
    if(this.state.first){
      return
    }
    let page =this.state.page-1
    if(!categoryId){
      categoryId = this.state.current
    }

    let payload = {
      limit: 10,
      page: page,
      categoryId:categoryId,
      status:3
    }
    this.props.dispatchGoods(payload).then((res) => {
      this.setState({
        loaded: true,
        page: page,
        last:res.last,
        list: res.content,
        current: categoryId
      })
    })
  }

  render () {
    const categoryList = this.state.categoryList
    const { current, loading } = this.state
    const height = getWindowHeight()

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View className='cate'>
        <ScrollView
          scrollY
          className='cate__menu'
          style={{ height }}
        >
          <Menu
            current={current}
            list={categoryList}
            onClick={this.handleMenu}
          />
        </ScrollView>
        {/* 通过切换元素实现重置 ScrollView 的 scrollTop */}
        {loading ?
          <View /> :
          <ScrollView
            scrollY
            onScrollToLower={this.loadMore}
            onScrollToUpper={this.loadLess}
            className='cate__list'
            style={{ height }}
          >
            <View className='cate__list-wrap'>
              <List list={this.state.list} />
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}

export default Cate
