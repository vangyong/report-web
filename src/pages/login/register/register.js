import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {ButtonItem, InputItem} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import {host} from '@constants/api'
import { TOKEN_KEY,USER_KEY } from '@constants/common'
import jwt_decode from "jwt-decode"
import './register.scss'
import logo from "../../../assets/logo-red.png";

@connect(state => state.user, actions)
class Register extends Component {
  config = {
    navigationBarTitleText: '注册账号'
  }

  state = {
    mobileNumber:'',
    userName: '',
    password: '',
    loading: false
  }



  handleInput = (key, value) => {
    this.setState({[key]: value})
  }


  handleRegister = () => {
    const registerInfo = {
      mobileNumber: this.state.mobileNumber,
      userName: this.state.userName,
      password: this.state.password
    }

    //用户注册
    this.props.dispatchRegister(registerInfo).then(() => {
      const payload = {
        username: this.state.userName,
        password: this.state.password
      }
      //用户登录
      this.props.dispatchLogin(payload).then((res) => {
        const token_value = res.token_type + ' ' + res.access_token
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
                }
              })
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
                  }
                })
              }
            })
          }
          this.setState({
            loading: false
          })
          Taro.reLaunch({
            url: '/pages/user/user'
          })
        }).catch(() => {
          Taro.showToast({
            title: '获取用户信息失败，请联系客服',
            icon: 'none'
          })
          this.setState({loading: false})
        })

      }).catch(() => {
        Taro.showToast({
          title: '登录失败，请确认用户名和密码是否正确',
          icon: 'none'
        })
        this.setState({loading: false})
      })

    }).catch((e) => {
      Taro.showToast({
        title: '注册失败,手机号已经存在或验证码错误',
        icon: 'none'
      })
      this.setState({loading: false})
    })

  }

  render() {
    const {mobileNumber,userName, password, loading} = this.state
    const isBtnDisabled = !mobileNumber ||!userName || !password

    return (
      <View className='login-register'>
        <View className='login-register__logo'>
          <Image src={logo} className='login-register__logo-img' />
        </View>
        <View className='login-register__wrap'>
          <InputItem
            value={mobileNumber}
            placeholder='手机号码'
            onInput={this.handleInput.bind(this, 'mobileNumber')}
          />
          <InputItem
            value={userName}
            placeholder='账号'
            onInput={this.handleInput.bind(this, 'userName')}
          />
          <InputItem
            password
            value={password}
            placeholder='密码'
            onInput={this.handleInput.bind(this, 'password')}
          />

        </View>
        <View className='login-register__btn'>
          <ButtonItem
            text='注册'
            disabled={isBtnDisabled}
            loading={loading}
            onClick={this.handleRegister}
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

export default Register
