import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {ButtonItem, InputItem} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import {dispatchBuyerAccountCreate,dispatchBuyerAccountByUser,dispatchSellerAccountCreate,dispatchSellerAccountByUser} from '@actions/account'
import {host} from '@constants/api'
import { TOKEN_KEY,USER_KEY } from '@constants/common'
import jwt_decode from "jwt-decode"
import './account.scss'
import logo from "../../../assets/logo-red.png";
import {BUYER_ACCOUNT_KEY} from "../../../constants/common";
import {SELLER_ACCOUNT_KEY} from "../../../constants/common";


@connect(state => state.user, { ...actions,dispatchBuyerAccountCreate,dispatchBuyerAccountByUser,dispatchSellerAccountCreate,dispatchSellerAccountByUser })
class Account extends Component {
  config = {
    navigationBarTitleText: '账号登录'
  }

  constructor () {
    super(...arguments)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  handleInput = (key, value) => {
    this.setState({[key]: value})
  }

  handleLogin = () => {
    let payload = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatchLogin(payload).then((res) => {
      let token_value = res.token_type + ' ' + res.access_token
      Taro.setStorage({key: TOKEN_KEY, data: token_value})

      //解析token
      const decoded_comlete = jwt_decode(res.access_token, {complete: true})
      const user_name = decoded_comlete.user_name

      //获取用户信息
      this.props.dispatchUser({userName: user_name}).then((user) => {
        Taro.setStorage({key: USER_KEY, data: user})
        //根据tenantId识别出是否为商户
         this.props.dispatchBuyerAccountByUser({userId: user.userId}).then((buyer) => {
           if(!buyer.buyerAccount){
             this.props.dispatchBuyerAccountCreate({userId: user.userId}).then((res) => {
               if(!res){
                 Taro.showToast({
                   title: '买家账户信息初始化失败，请联系客服',
                   icon: 'none'
                 })
               }else{
                 this.props.dispatchBuyerAccountByUser({userId: user.userId}).then((buyer) => {
                    Taro.setStorage({key: BUYER_ACCOUNT_KEY, data: buyer})
                 })
               }
             })
           }else{
             Taro.setStorage({key: BUYER_ACCOUNT_KEY, data: buyer.buyerAccount})
           }
         })
        if(user.tenantId){
          this.props.dispatchSellerAccountByUser({userId: user.userId}).then((seller) => {
            if(!seller.sellerAccount){
              this.props.dispatchSellerAccountCreate({userId: user.userId}).then((res) => {
                if(!res){
                  Taro.showToast({
                    title: '卖家账户信息初始化失败，请联系客服',
                    icon: 'none'
                  })
                }else{
                  this.props.dispatchSellerAccountByUser({userId: user.userId}).then((seller) => {
                    Taro.setStorage({key: SELLER_ACCOUNT_KEY, data: seller})
                  })
                }
              })
            }else{
              Taro.setStorage({key: SELLER_ACCOUNT_KEY, data: seller})
            }
          })
        }
        this.setState({
          loading: false
        })
        // TODO 暂时先跳转到首页
        //Taro.navigateTo({
        // url: '/pages/home/home'
        //})
        Taro.navigateBack({delta: 2})
      }).catch(() => {
        Taro.showToast({
          title: '获取用户信息失败，请联系客服',
          icon: 'none'
        })
        this.setState({loading: false})
      })

      // Taro.navigateBack({delta: 2})
      // // TODO RN 的 navigateBack 参数 delta 无效，暂时用如下方式解决
      // if (process.env.TARO_ENV === 'rn') {
      //   setTimeout(() => Taro.navigateBack(), 1000)
      // }
    }).catch(() => {
      Taro.showToast({
        title: '登录失败，请确认用户名和密码是否正确',
        icon: 'none'
      })
      this.setState({loading: false})
    })
  }

  render() {
    const {username, password, loading} = this.state
    const isBtnDisabled = !username || !password

    return (
      <View className='login-account'>
        <View className='login-account__logo'>
          <Image src={logo} className='login-account__logo-img'/>
        </View>
        <View className='login-account__wrap'>
          <InputItem
            value={username}
            placeholder='账号'
            onInput={this.handleInput.bind(this, 'username')}
          />
          <InputItem
            password
            value={password}
            placeholder='密码'
            onInput={this.handleInput.bind(this, 'password')}
          />

        </View>
        <View className='login-account__btn'>
          <ButtonItem
            text='登录'
            disabled={isBtnDisabled}
            loading={loading}
            onClick={this.handleLogin}
            compStyle={{
              background: '#b59f7b',
              borderRadius: Taro.pxTransform(4)
            }}
            textStyle={{
              color: isBtnDisabled ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'
            }}
          />
        </View>
      </View>
    )
  }
}

export default Account
