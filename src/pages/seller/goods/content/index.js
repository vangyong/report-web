import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {Loading} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/goods'
import './index.scss'
import {AtImagePicker,AtButton} from "taro-ui";

@connect(state => state.goods, {...actions})
export default class Index extends Component {
  config = {
    navigationBarTitleText: '内容详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      goods:{},
      idCardFrontPictures:[{url: 'http://127.0.0.1:8000/v1/filecenter/download/1156577401640194048'}]
    }
  }

  componentWillMount () {
    let goodsId = this.$router.params.goodsId
    if(goodsId){
      this.setState({
        goodsId: goodsId
      })
    }
  }

  componentDidMount() {
    this.loadGoods()
  }

  // 获取商品
  loadGoods = () => {
    this.props.dispatchGoods({goodsId:this.state.goodsId}).then((res) => {
      this.setState({
        goods: res
      })
    }).catch((e) => {
      console.log(e)
      Taro.showToast({
        title: 'ssss获取商品失败',
        icon: 'none'
      })
    })
  }

  onImageView=()=>{

  }

  onChangeIdCardFront=()=>{

  }

  takePhoto = () => {
    console.log('takePhoto')
    const ctx = Taro.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('success')
        console.log(res.tempImagePath)
        this.setState({
          src: res.tempImagePath
        })
      },
      fail:{

      },
      complete:{

      }
    })
  }

  handleScanCode= () => {
    Taro.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log(res)
        laert(res)
      }
    })
  }


  handleClick = () => {
    Taro.navigateBack()
    Taro.showToast({
      title: '完成',
      icon: 'none'
    })
  }

  render() {
    return (
      <View className='seller-goods-content'>
        <View> this.is content{this.state.goods.goodsName}</View>
        <View>
          <video src='http://127.0.0.1:8000/v1/filecenter/download/1184480802445070336' controls='controls'
                 autoPlay='autoplay'></video>
        </View>

        <View className='seller-goods-content__certificate'>
          <text className='seller-goods-content__certificate-txt'>
            身份证正面
          </text>

          <AtImagePicker className='seller-goods-content__certificate-img'
                         files={this.state.idCardFrontPictures}
                         onImageClick={this.onImageView.bind(this,'tenant_id_card_front')}
                         onChange={this.onChangeIdCardFront.bind(this)}
          />
        </View>

        <View>
          {/*仅小程序可以*/}
          {/*<camera devicePosition="back" style="width: 100%; height: 300px;"></camera>*/}
          {/*<AtButton onClick={this.takePhoto.bind(this)}>拍照</AtButton>*/}
          {/*<View>预览</View>*/}
          {/*<Image src={this.state.src}></Image>*/}
        </View>

        <View>
          <AtButton formType='submit' onClick={this.handleScanCode.bind(this)}>扫码</AtButton>

        </View>

      </View>
    )
  }
}
