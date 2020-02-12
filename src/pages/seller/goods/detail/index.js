import Taro, {Component} from '@tarojs/taro'
import {View,Picker} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/seller'
import { dispatchItemDetail } from '@actions/item'
import Snowflake from 'snowflake-id'
import {AtInput, AtButton, AtImagePicker, AtIcon} from 'taro-ui'
import {API_FILE_UPLOAD,API_FILE_UPLOAD_PARAM,API_FILE_DOWNLOAD} from '@constants/api'
import {USER_KEY} from '@constants/common'
import {SELLER_ACCOUNT_KEY} from '@constants/common'
import './index.scss'

@connect(state => state.seller, {...actions,dispatchItemDetail})
export default class Index extends Component {
  config = {
    navigationBarTitleText: '商品管理'
  }

  constructor(props) {
    super(props)
    this.state = {
      category: [{'categoryId':'1','name':'鲜果'},{'categoryId': '2','name': '礼品'}],
      categoryChecked: {'categoryId':'1','name':'鲜果'},
      goodsId:'',
      tenantId:'',
      goodsName:'',
      brief: '',
      unitPrice: '',
      unit: ['包','箱','盒','袋','件','克','千克','组'],
      unitChecked: '盒',
      regionCode: '',
      status:1,
      primaryPictures: [],
      primaryPictureUrl: '',
      listPictures: [],
      listPictureUrl: ''
    }
  }

  componentWillMount () {
    let goodsId = this.$router.params.goodsId
    if(goodsId){
      this.setState({
        goodsId: goodsId
      })
    }else{
      let user = Taro.getStorageSync(USER_KEY)
      if (user && user.tenantId) {
        let snowflake = new Snowflake({mid: 1, offset: 1})
        this.setState({
          goodsId: snowflake.generate(),
          tenantId: user.tenantId
        })
      }

      let sellerAccount = Taro.getStorageSync(SELLER_ACCOUNT_KEY)
      if(sellerAccount&&sellerAccount.tenantAddress){
        this.setState({
          regionCode: sellerAccount.tenantAddress.regionCode
        })
      }
    }
  }

  componentDidMount() {
    console.log(this.state.regionCode)
    let goodsId = this.$router.params.goodsId
    if(goodsId){
      this.props.dispatchItemDetail({goodsId:this.state.goodsId}).then((res) => {
        let goods = res.goods
        if(goods){
          this.setState({
            goodsId: goods.goodsId,
            tenantId: goods.tenantId,
            goodsName: goods.goodsName,
            //categoryChecked: goods.categoryId,
            brief: goods.brief,
            unitPrice: goods.unitPrice,
            unitChecked: goods.unit,
            regionCode:goods.regionCode,
            status:goods.status,
            primaryPictures: [{url: API_FILE_DOWNLOAD + goods.primaryPictureUrl}],
            primaryPictureUrl: goods.primaryPictureUrl,
            listPictures: [{url: API_FILE_DOWNLOAD + goods.listPictureUrl}],
            listPictureUrl: goods.listPictureUrl
          })
        }
      })
    }
  }

  //切换类别选择
  onCategoryChange =(e) => {
    this.setState({
      categoryChecked: this.state.category[e.detail.value]
    })
  }

  //切换单位选择
  onUnitChange = (e) => {
    this.setState({
      unitChecked: this.state.unit[e.detail.value]
    })
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  toSpecs () {
    Taro.navigateTo({
      url: `/pages/seller/goods/specs/index?goodsId=`+this.state.goodsId+`&status=`+this.state.status
    })
  }

  toContent () {
    Taro.navigateTo({
      url: `/pages/seller/goods/content/index?goodsId=`+this.state.goodsId+`&status=`+this.state.status
    })
  }

  handleSubmit = () => {
    let goods = {
      goodsId: this.state.goodsId,
      tenantId: this.state.tenantId,
      goodsName: this.state.goodsName,
      categoryId: this.state.categoryChecked.categoryId,
      brief: this.state.brief,
      unitPrice: this.state.unitPrice,
      unit: this.state.unitChecked,
      regionCode: this.state.regionCode,
      primaryPictureUrl: this.state.primaryPictureUrl,
      listPictureUrl: this.state.listPictureUrl
    };
    if(this.state.goodsName && this.state.brief && this.state.unitPrice){
      this.props.dispatchSellerGoodsCreate(goods).then((res) => {
        if(res && res.goodsId){
          this.setState({
            goodsId: res
          })
          Taro.redirectTo({url:'/pages/seller/goods/goods'})
        }else{
          Taro.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      })
    }else{
      Taro.showToast({
        title: '请填写基本信息',
        icon: 'none'
      })
    }
  }

  //上传小视频
  onChangePrimaryPicture(files) {
    if (files.length > 1) {
        Taro.showToast({
          title: '只能上传一张',
          icon: 'none'
        })
    } else if (files.length == 1) {
        const token = Taro.getStorageSync('token')
        let type = files[0].file.type
        let suffix = '.'+ type.substr(type.indexOf('/')+1,type.length)
        let param = {
          businessId: this.state.goodsId,
          businessCode: 'primary_picture',
          suffix:suffix
        }
        console.log(JSON.stringify(param))
        Taro.uploadFile({
            url: API_FILE_UPLOAD_PARAM,
            // header:{'content-type': 'multipart/form-data','Authentication': token},
            name: 'file',
            filename: 'primaryPicture'+suffix,
            filePath: files[0].file.path,
            formData: {
              param:JSON.stringify(param)
            }
        }).then((res) => {
          let res_obj = JSON.parse(res.data)
          this.setState({
            primaryPictures:[{url:API_FILE_DOWNLOAD+res_obj.fileId}],
            primaryPictureUrl:res_obj.fileId
          })

        })

    } else {
        this.setState({
          primaryPictures: [],
          primaryPictureUrl:''
        })
    }
  }

  onChangeListPicture(files) {
    if (files.length > 1) {
      Taro.showToast({
        title: '只能上传一张',
        icon: 'none'
      })
    } else if (files.length == 1) {
        const token = Taro.getStorageSync('token')
        Taro.uploadFile({
          url: API_FILE_UPLOAD,
          // header:{'content-type': 'multipart/form-data','Authentication': token},
          name: 'file',
          filename: 'listPicture.png',
          filePath: files[0].file.path,
          formData: {
            businessId: this.state.goodsId,
            businessCode: 'list_picture',
            suffix:'.png'
          }
      }).then((res) => {
        let res_obj = JSON.parse(res.data)
        this.setState({
          listPictures:[{url:API_FILE_DOWNLOAD+res_obj.fileId}],
          listPictureUrl:res_obj.fileId
        })
      })
    } else {
      this.setState({
        listPictures: [],
        listPictureUrl:''
      })
    }
  }

  onFail(mes) {
    console.log(mes)
  }

  onImageClick() {
    console.log('onImageClick')
  }

  render() {
    return (
      <View className='seller-goods-detail'>
        <View className='seller-goods-detail__wrap'>
            <AtInput
              name='goodsName'
              title='名称:'
              type='text'
              placeholder='商品名称'
              value={this.state.goodsName}
              onChange={this.handleChange.bind(this,'goodsName')}
            />

            <View className='at-input'>
              <Picker mode='selector' range={this.state.category} rangeKey='name' onChange={this.onCategoryChange}>
                <View className='seller-goods-detail__category'>
                  <View className='at-input__title'>
                    类别:
                  </View>
                  <View className='at-input__input'>
                    {this.state.categoryChecked.name}
                  </View>
                </View>

              </Picker>
            </View>

            <AtInput
              name='brief'
              title='摘要:'
              type='text'
              placeholder='简述摘要'
              value={this.state.brief}
              onChange={this.handleChange.bind(this,'brief')}
            />

            <AtInput
              name='unitPrice'
              title='单价:'
              type='text'
              placeholder='单价(元)'
              value={this.state.unitPrice}
              onChange={this.handleChange.bind(this,'unitPrice')}
            />

            <View className='at-input'>
              <Picker mode='selector' range={this.state.unit} onChange={this.onUnitChange}>
                <View className='seller-goods-detail__unit'>
                  <View className='at-input__title'>
                    单位:
                  </View>
                  <View className='at-input__input'>
                    {this.state.unitChecked}
                  </View>
                </View>

              </Picker>
            </View>

            <View>
              <text className='seller-goods-detail__picture-txt'>
                小视频:
              </text>
              <AtImagePicker multiple={false} className='seller-goods-detail__picture-img' files={this.state.primaryPictures} onImageClick={this.onImageClick.bind(this)} onChange={this.onChangePrimaryPicture.bind(this)} />
            </View>

            <View>
              <text className='seller-goods-detail__picture-txt'>
                列表图:
              </text>
              <AtImagePicker multiple={false} className='seller-goods-detail__picture-img' files={this.state.listPictures} onImageClick={this.onImageClick.bind(this)} onChange={this.onChangeListPicture.bind(this)} />
            </View>

            <View className='seller-goods-detail__button'>
              <AtButton className='seller-goods-detail__button-specs' size='small' onClick={this.toSpecs.bind(this)}>
                规格
              </AtButton>
              {/*<AtButton className='seller-goods-detail__button-content' size='small' onClick={this.toContent.bind(this)}>内容</AtButton>*/}
            </View>
            {(this.state.status==1 || this.state.status==2) &&
            <AtButton formType='submit' onClick={this.handleSubmit.bind(this)}>提交</AtButton>
            }
        </View>

      </View>
    )
  }
}
