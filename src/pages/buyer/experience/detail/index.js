import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import {ButtonItem} from '@components'
import Snowflake from 'snowflake-id'
import {AtInput, AtButton} from 'taro-ui'
import { connect } from '@tarojs/redux'
import {USER_KEY} from '@constants/common'
import * as actions from '@actions/experience'
import './index.scss'


@connect(state => state.experience, {...actions})
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '地址详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      experienceId: '',
      goodsId: '',
      goodsName: '',
      brief: '',
      content: '',
      deleteStatus:'',
      status:'',
      userId: '',
      readAmount:'',
    }
  }

  componentDidShow() {
    let user = Taro.getStorageSync(USER_KEY)
    if (user&&user.userId) {
      this.setState({
        userId:user.userId
      })
    }else{
      Taro.navigateTo({
        url: `/pages/login/account/account`
      })
    }
    let experienceId = this.$router.params.experienceId
    if (experienceId!='undefined') {
      this.props.dispatchExperienceDetail({experienceId:experienceId}).then((res) => {
        this.setState({
          experienceId: res.experienceId,
          goodsId: res.goodsId,
          goodsName: res.goodsName,
          brief: res.brief,
          content: res.content,
          deleteStatus: res.deleteStatus,
          status: res.status,
          userId: res.userId,
          readAmount: res.readAmount
        })
      })
    }
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handleSubmit = () => {
    if(!this.state.brief || !this.state.content){
      Taro.navigateTo({
        url: `/pages/user/user`
      })
    }else{
      let payload = {
        experienceId: this.state.experienceId,
        goodsId: this.state.goodsId,
        goodsName: this.state.goodsName,
        brief: this.state.brief,
        content: this.state.content,
        deleteStatus: this.state.deleteStatus,
        status: this.state.status,
        userId: this.state.userId,
        readAmount: this.state.readAmount
      }
      if(!this.state.experienceId){
        this.props.dispatchExperienceCreate(payload).then((res) => {
          Taro.navigateTo({
            url: `/pages/buyer/experience/experience`
          })
        }).catch(()=>{
          Taro.showToast({
            title: '地址添加失败，请联系客服',
            icon: 'none'
          })
        })
      }else{
        this.props.dispatchExperienceUpdate(payload).then((res) => {
          Taro.navigateTo({
            url: `/pages/buyer/experience/experience`
          })
        }).catch(()=>{
          Taro.showToast({
            title: '地址修改失败，请联系客服',
            icon: 'none'
          })
        })
      }
    }
  }

  handleEditorChange () {
    console.log('changed')
  }

  render () {
    return (
      <View className='experience'>
        <View className='experience__wrap'>
          <AtInput
            name='regionCode'
            title='摘要：'
            type='text'
            placeholder='摘要/简述'
            value={this.state.brief}
            onChange={this.handleChange.bind(this,'brief')}
          />
          <AtInput
            name='content'
            title='内容：'
            type='text'
            placeholder='详细内容'
            value={this.state.content}
            onChange={this.handleChange.bind(this, 'content')}
          />

        </View>
        <View >
          <AtButton formType='submit' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
        </View>
      </View>
    )
  }
}
