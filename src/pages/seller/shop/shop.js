import Taro, {Component} from '@tarojs/taro'
import {Image, ScrollView, View} from '@tarojs/components'
import {Loading} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/seller'
import {dispatchFileDelete} from '@actions/filecenter'
import {API_FILE_DOWNLOAD,API_FILE_UPLOAD,API_FILE_DELETE} from '@constants/api'
import {USER_KEY} from '@constants/common'
import {AtInput, AtButton, AtImagePicker, AtFloatLayout} from 'taro-ui'
import './shop.scss'

@connect(state => state.seller, {...actions,dispatchFileDelete})
export default class Shop extends Component {
  config = {
    navigationBarTitleText: '店铺管理'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      shopDtail: {},
      shopAddress: {},
      idCardFrontPictures: [],
      idCardBackendPictures: [],
      businessLicensePictures: [],
      foodLicensePictures: [],
      viewIsOpened:false,
      viewUrl:''
    }
  }

  componentDidMount() {
      this.loadCertificateList()
  }

  // 获取证件
  loadCertificateList = () => {
    let user = Taro.getStorageSync(USER_KEY)
    let userId = user.userId
    this.props.dispatchSellerShop({userId: userId}).then((res) => {
      let tenant = res.tenant
      let tenantId = tenant.tenantId
      //获取证件信息
      this.props.dispatchSellerCertificate({tenantId: tenantId}).then((ret) => {
        for (let index in ret) {
          let c = ret[index]
          if (c.certificateType == 'tenant_id_card_front') {
            let id_card_front_url = API_FILE_DOWNLOAD + c.certificateUrl
            this.setState({
              idCardFrontPictures: [{url: id_card_front_url,fileId:c.certificateUrl,certificateId:c.certificateId}]
            })
          } else if (c.certificateType == 'tenant_id_card_backend') {
            let id_card_backend_url = API_FILE_DOWNLOAD + c.certificateUrl
            this.setState({
              idCardBackendPictures: [{url: id_card_backend_url,fileId:c.certificateUrl,certificateId:c.certificateId}]
            })
          } else if (c.certificateType == 'tenant_business_license') {
            let business_license_url = API_FILE_DOWNLOAD + c.certificateUrl
            this.setState({
              businessLicensePictures: [{url: business_license_url,fileId:c.certificateUrl,certificateId:c.certificateId}]
            })
          } else if (c.certificateType == 'tenant_food_license') {
            let food_license_url = API_FILE_DOWNLOAD + c.certificateUrl
            this.setState({
              foodLicensePictures: [{url: food_license_url,fileId:c.certificateUrl,certificateId:c.certificateId}]
            })
          }
        }

        this.setState({
          loaded: true,
          shopDtail: tenant,
          shopAddress: tenant.tenantAddress
        })
      })
    })
  }

  onChangeIdCardFront(files,operationType,index) {
    if(operationType=='remove'){
      let idCardFrontPicture = this.state.idCardFrontPictures[index]
      this.props.dispatchSellerCertificateDelete({certificateId:idCardFrontPicture.certificateId}).then(res => {
        this.props.dispatchFileDelete({fileId:idCardFrontPicture.fileId}).then(res => {
          this.loadCertificateList()
        }).catch(() => {
          Taro.showToast({
            title: '图片删除失败',
            icon: 'none'
          })
        })
      }).catch(() => {
        Taro.showToast({
          title: '图片删除失败',
          icon: 'none'
        })
      })

    }

    if (files.length > 1) {
      Taro.showToast({
        title: '只能上传一张',
        icon: 'none'
      })
    } else if (files.length == 1) {
      let type = files[0].file.type
      let suffix = '.'+ type.substr(type.indexOf('/')+1,type.length)
      Taro.uploadFile({
        url: API_FILE_UPLOAD,
        name: 'file',
        filename: 'idCardFront.jpeg',
        filePath: files[0].file.path,
        formData: {
          businessId: this.state.shopDtail.tenantId,
          businessCode: 'tenant_id_card_front',
          suffix:suffix
        }
      }).then((res) => {
        let res_obj = JSON.parse(res.data)
        let certificate = {
          certificateType: 'tenant_id_card_front',
          certificateName: '身份证正面',
          certificateUrl: res_obj.fileId,
          businessId: this.state.shopDtail.tenantId
        }
        this.props.dispatchSellerCertificateCreate(certificate).then((ret) => {
          this.setState({
            idCardFrontPictures:[{url:API_FILE_DOWNLOAD+res_obj.fileId,fileId:res_obj.fileId,certificateId:ret.certificateId}]
          })
        })

      })
    } else {
      this.setState({
        idCardFrontPictures: files
      })
    }

  }

  onChangeIdCardBackend(files,operationType,index) {
    if(operationType=='remove'){
      let idCardBackendPicture = this.state.idCardBackendPictures[index]
      this.props.dispatchSellerCertificateDelete({certificateId:idCardBackendPicture.certificateId}).then(res => {
        this.props.dispatchFileDelete({fileId:idCardBackendPicture.fileId}).then(res => {
          this.loadCertificateList()
        }).catch(() => {
          Taro.showToast({
            title: '图片删除失败',
            icon: 'none'
          })
        })
      }).catch(() => {
        Taro.showToast({
          title: '图片删除失败',
          icon: 'none'
        })
      })

    }

    if (files.length > 1) {
      Taro.showToast({
        title: '只能上传一张',
        icon: 'none'
      })
    } else if (files.length == 1) {
      let type = files[0].file.type
      let suffix = '.'+ type.substr(type.indexOf('/')+1,type.length)
      Taro.uploadFile({
        url: API_FILE_UPLOAD,
        name: 'file',
        filename: 'idCardBackend.jpeg',
        filePath: files[0].file.path,
        formData: {
          businessId: this.state.shopDtail.tenantId,
          businessCode: 'tenant_id_card_backend',
          suffix:suffix
        }
      }).then((res) => {
        let res_obj = JSON.parse(res.data)
        let certificate = {
          certificateType: 'tenant_id_card_backend',
          certificateName: '身份证背面',
          certificateUrl: res_obj.fileId,
          businessId: this.state.shopDtail.tenantId
        }
        this.props.dispatchSellerCertificateCreate(certificate).then((ret) => {
          this.setState({
            idCardBackendPictures:[{url:API_FILE_DOWNLOAD+res_obj.fileId,fileId:res_obj.fileId,certificateId:ret.certificateId}]
          })
        })

      })
    } else {
      this.setState({
        idCardBackendPictures: files
      })
    }
  }

  onChangeBusinessLicense(files,operationType,index) {
    if(operationType=='remove'){
      let businessLicensePicture = this.state.businessLicensePictures[index]
      this.props.dispatchSellerCertificateDelete({certificateId:businessLicensePicture.certificateId}).then(res => {
        this.props.dispatchFileDelete({fileId:businessLicensePicture.fileId}).then(res => {
          this.loadCertificateList()
        }).catch(() => {
          Taro.showToast({
            title: '图片删除失败',
            icon: 'none'
          })
        })
      }).catch(() => {
        Taro.showToast({
          title: '图片删除失败',
          icon: 'none'
        })
      })

    }

    if (files.length > 1) {
      Taro.showToast({
        title: '只能上传一张',
        icon: 'none'
      })
    } else if (files.length == 1) {
      let type = files[0].file.type
      let suffix = '.'+ type.substr(type.indexOf('/')+1,type.length)
      Taro.uploadFile({
        url: API_FILE_UPLOAD,
        name: 'file',
        filename: 'businessLicense.jpeg',
        filePath: files[0].file.path,
        formData: {
          businessId: this.state.shopDtail.tenantId,
          businessCode: 'tenant_business_license',
          suffix:suffix
        }
      }).then((res) => {
        let res_obj = JSON.parse(res.data)
        let certificate = {
          certificateType: 'tenant_business_license',
          certificateName: '营业执照',
          certificateUrl: res_obj.fileId,
          businessId: this.state.shopDtail.tenantId
        }
        this.props.dispatchSellerCertificateCreate(certificate).then((ret) => {
          this.setState({
            businessLicensePictures:[{url:API_FILE_DOWNLOAD+res_obj.fileId,fileId:res_obj.fileId,certificateId:ret.certificateId}]
          })
        })

      })
    } else {
      this.setState({
        businessLicensePictures: files
      })
    }
  }

  onChangeFoodLicense(files,operationType,index) {
    if(operationType=='remove'){
      let foodLicensePicture = this.state.foodLicensePictures[index]
      this.props.dispatchSellerCertificateDelete({certificateId:foodLicensePicture.certificateId}).then(res => {
        this.props.dispatchFileDelete({fileId:foodLicensePicture.fileId}).then(res => {
          this.loadCertificateList()
        }).catch(() => {
          Taro.showToast({
            title: '图片删除失败',
            icon: 'none'
          })
        })
      }).catch(() => {
        Taro.showToast({
          title: '图片删除失败',
          icon: 'none'
        })
      })
    }

    if (files.length > 1) {
      Taro.showToast({
        title: '只能上传一张',
        icon: 'none'
      })
    } else if (files.length == 1) {
      let type = files[0].file.type
      let suffix = '.'+ type.substr(type.indexOf('/')+1,type.length)
      Taro.uploadFile({
        url: API_FILE_UPLOAD,
        name: 'file',
        filename: 'foodLicense.jpeg',
        filePath: files[0].file.path,
        formData: {
          businessId: this.state.shopDtail.tenantId,
          businessCode: 'tenant_food_license',
          suffix:suffix
        }
      }).then((res) => {
        let res_obj = JSON.parse(res.data)
        let certificate = {
          certificateType: 'tenant_food_license',
          certificateName: '食品经营证',
          certificateUrl: res_obj.fileId,
          businessId: this.state.shopDtail.tenantId
        }
        this.props.dispatchSellerCertificateCreate(certificate).then((ret) => {
          this.setState({
            foodLicensePictures:[{url:API_FILE_DOWNLOAD+res_obj.fileId,fileId:res_obj.fileId,certificateId:ret.certificateId}]
          })
        })
      })
    } else {
      this.setState({
        foodLicensePictures: files
      })
    }
  }

  onFail(mes) {
    console.log(mes)
  }

  onImageView= (type) => {
    let url = ''
    if(type=='tenant_id_card_front'){
      url = this.state.idCardFrontPictures[0].url
    }else if(type=='tenant_id_card_backend'){
      url = this.state.idCardBackendPictures[0].url
    }else if(type=='tenant_business_license'){
      url = this.state.businessLicensePictures[0].url
    }else if(type=='tenant_food_license'){
      url = this.state.foodLicensePictures[0].url
    }
    this.setState({
      viewIsOpened:true,
      viewUrl:url
    })
  }

  render() {
    const shopDetail = this.state.shopDtail

    if (!this.state.loaded) {
      return <Loading />
    }

    return (
      <View className='seller-shop'>

            <View className='seller-shop__title'>
                {shopDetail.tenantName}
            </View>

            <View>
              <text className='seller-shop__certificate-txt'>
                身份证正面:
              </text>

              <AtImagePicker className='seller-shop__certificate-img'
                             files={this.state.idCardFrontPictures}
                             onImageClick={this.onImageView.bind(this,'tenant_id_card_front')}
                             onChange={this.onChangeIdCardFront.bind(this)}
              />
            </View>

            <View>
              <text className='seller-shop__certificate-txt'>
                身份证背面:
              </text>

              <AtImagePicker className='seller-shop__certificate-img'
                             files={this.state.idCardBackendPictures}
                             onImageClick={this.onImageView.bind(this,'tenant_id_card_backend')}
                             onChange={this.onChangeIdCardBackend.bind(this)}
              />
            </View>

            <View>
              <text className='seller-shop__certificate-txt'>
                营业执照:
              </text>

              <AtImagePicker className='seller-shop__certificate-img'
                             files={this.state.businessLicensePictures}
                             onImageClick={this.onImageView.bind(this,'tenant_business_license')}
                             onChange={this.onChangeBusinessLicense.bind(this)}
              />
            </View>

            <View>
              <text className='seller-shop__certificate-txt'>
                食品许可证:
              </text>

              <AtImagePicker className='seller-shop__certificate-img'
                             files={this.state.foodLicensePictures}
                             onImageClick={this.onImageView.bind(this,'tenant_food_license')}
                             onChange={this.onChangeFoodLicense.bind(this)}
              />
            </View>

            <AtFloatLayout isOpened={this.state.viewIsOpened} title='预览'>
              <Image src={this.state.viewUrl} />
            </AtFloatLayout>

      </View>
    )
  }
}
