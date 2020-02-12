import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/goods'
import {AtList, AtListItem,AtFloatLayout,AtButton,AtIcon,AtInput,AtImagePicker} from 'taro-ui'
import {API_FILE_UPLOAD,API_FILE_DOWNLOAD} from '@constants/api'
import {GOODS_GALLERY} from '@constants/common'
import './index.scss'

@connect(state => state.goods, {...actions})
export default class Index extends Component {
  config = {
    navigationBarTitleText: '规格属性'
  }

  constructor(props) {
    super(props)
    this.state = {
      status:1,
      galleryPictures: [],
      attributes:[],
      specifications:[],
      attributeIsOpened:false,
      specificationIsOpened:false
    }
  }

  componentWillMount () {
    let goodsId = this.$router.params.goodsId
    let status = this.$router.params.status
    if(goodsId){
      this.setState({
        goodsId: goodsId,
        status:status
      })
    }
  }

  componentDidMount() {
    this.loadGoodsGalleryList()
    this.loadGoodsAttributeList()
    this.loadGoodsSpecificationList()
  }

  // 获取商品画廊
  loadGoodsGalleryList = () => {
    this.props.dispatchGoodsGalleryList({goodsId:this.state.goodsId}).then((res) => {
      let pictures =[]
      if(res!= null){
        res.forEach(function(item){
          let picture = {url:API_FILE_DOWNLOAD+item.fileId, fileId:item.fileId}
          pictures.push(picture)
        })
      }
      this.setState({
        galleryPictures: pictures
      })
    }).catch(() => {
      Taro.showToast({
        title: '获取商品画廊失败',
        icon: 'none'
      })
    })
  }

  // 获取商品属性
  loadGoodsAttributeList = () => {
    this.props.dispatchGoodsAttributeList({goodsId:this.state.goodsId}).then((res) => {
      if(res!=null){
        this.setState({
          attributes: res
        })
      }
    }).catch(() => {
      Taro.showToast({
        title: '获取商品画廊失败',
        icon: 'none'
      })
    })
  }

  // 获取商品规格
  loadGoodsSpecificationList = () => {
    this.props.dispatchGoodsSpecificationList({goodsId:this.state.goodsId}).then((res) => {
      if(res!=null){
        this.setState({
          specifications: res
        })
      }
    }).catch(() => {
      Taro.showToast({
        title: '获取商品规格失败',
        icon: 'none'
      })
    })
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }

  handleClose = () => {
    Taro.navigateBack()
    Taro.showToast({
      title: '完成',
      icon: 'none'
    })
  }

  openAddAttribute = () => {
    this.setState({
      attributeIsOpened:true,
      specificationIsOpened:false
    })
  }

  addAttribute = () => {
    let payload ={
      goodsId: this.state.goodsId,
      attributeValue: this.state.attributeValue
    }
    this.props.dispatchGoodsAttributeCreate(payload).then(res => {
      this.setState({
        attributeValue:'',
        attributeIsOpened:false
      });
      this.loadGoodsAttributeList();
    }).catch(() => {
      Taro.showToast({
        title: '属性添加失败',
        icon: 'none'
      });
    });
  }

  closeAddAttribute=()=>{
    this.setState({
      attributeIsOpened:false,
      specificationIsOpened:false
    })
  }


  deleteAttribute = (attribute) => {
    if(this.state.status==1||this.state.status==2) {
      this.props.dispatchGoodsAttributeDelete({goodsAttributeId: attribute.goodsAttributeId}).then(res => {
        this.loadGoodsAttributeList();
      }).catch(() => {
        Taro.showToast({
          title: '属性删除失败',
          icon: 'none'
        })
      })
    }
  }

  openAddSpecification = () => {
    this.setState({
      specificationIsOpened:true,
      attributeIsOpened:false
    })
  }

  addSpecification = () => {
    let payload ={
      goodsId: this.state.goodsId,
      specificationName: this.state.specificationName,
      specificationValue: this.state.specificationValue
    }

    this.props.dispatchGoodsSpecificationCreate(payload).then(res => {
      this.setState({
        specificationName:'',
        specificationValue:'',
        specificationIsOpened:false
      });
      this.loadGoodsSpecificationList();
    }).catch(() => {
      Taro.showToast({
        title: '规格添加失败',
        icon: 'none'
      });
    })
  }

  closeAddSpecification=()=>{
    this.setState({
      specificationIsOpened:false
    })
  }

  deleteSpecification = (specification) => {
    if(this.state.status==1||this.state.status==2){
      this.props.dispatchGoodsSpecificationDelete({goodsSpecificationId:specification.goodsSpecificationId}).then(res => {
        this.loadGoodsSpecificationList();
      }).catch(() => {
        Taro.showToast({
          title: '规格删除失败',
          icon: 'none'
        })
      })
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  //商品画廊
  onChangeGalleryPicture(files,operationType,index) {
    if(this.state.status==1||this.state.status==2){
      if(operationType=='remove'){
        let galleryPicture = this.state.galleryPictures[index]
        this.props.dispatchGoodsGalleryDelete({fileId:galleryPicture.fileId}).then(res => {
          this.loadGoodsGalleryList();
        }).catch(() => {
          Taro.showToast({
            title: '图片删除失败',
            icon: 'none'
          })
        })
      }
      if(files!= null){
        for(let i = 0;i<files.length;i++){
          if(files[i].file){
            Taro.uploadFile({
              url: API_FILE_UPLOAD,
              name: 'file',
              filename: 'galleryPicture.jpeg',
              filePath: files[i].file.path,
              formData: {
                businessId: this.state.goodsId,
                businessCode: GOODS_GALLERY,
                suffix:'.jpeg'
              }
            }).then((res) => {
              console.log(JSON.parse(res.data))
              this.loadGoodsGalleryList()
            })
          }
        }
      }
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
      <View className='seller-goods-specs'>
        <View>
          <View className='seller-goods-specs__gallery'>
            <View className='seller-goods-specs__gallery-title'>
              画廊:
            </View>
            <AtImagePicker className='seller-goods-specs__picture-img' files={this.state.galleryPictures} onImageClick={this.onImageClick.bind(this)} onChange={this.onChangeGalleryPicture.bind(this)} />
          </View>

          <View className='seller-goods-specs__attribute'>
            <View className='seller-goods-specs__attribute-title'>
              {(this.state.status==1||this.state.status==2)&&
              <AtIcon value='add-circle' onClick={this.openAddAttribute.bind(this)}
                      onClose={this.closeAddAttribute.bind(this)}></AtIcon>
              }
              属性:
            </View>

            <AtList>
              {this.state.attributes.map((attribute) => {
                return (
                  <AtListItem
                    key={attribute.key}
                    title={attribute.attributeValue}
                    iconInfo={{color: 'red', value: 'subtract-circle'}}
                    onClick={this.deleteAttribute.bind(this, attribute)}
                  >
                  </AtListItem>
                )
              })}
            </AtList>
          </View>

          <View className='seller-goods-specs__specification'>
            <View className='seller-goods-specs__specification-title'>
              {(this.state.status == 1 || this.state.status == 2) &&
              <AtIcon value='add-circle' onClick={this.openAddSpecification.bind(this)}
                      onClose={this.closeAddSpecification.bind(this)}></AtIcon>
              }
              规格:
            </View>
            <AtList>
              {this.state.specifications.map((specification) => {
                return (
                  <AtListItem
                    key={specification.key}
                    title={specification.specificationName}
                    extraText={specification.specificationValue}
                    iconInfo={{color: 'red', value: 'subtract-circle'}}
                    onClick={this.deleteSpecification.bind(this, specification)}
                  >
                  </AtListItem>
                )
              })}
            </AtList>
          </View>

          <AtButton formType='submit' onClick={this.handleClose.bind(this)}>完成</AtButton>

        </View>

        <AtFloatLayout isOpened={this.state.attributeIsOpened} title='添加属性'>
          <AtInput name='attributeValue' title='属性值' type='text' placeholder='属性值' value={this.state.attributeValue} onChange={this.handleChange.bind(this, 'attributeValue')}/>
          <AtButton onClick={this.addAttribute.bind(this)}>添加</AtButton>
        </AtFloatLayout>

        <AtFloatLayout isOpened={this.state.specificationIsOpened} title='添加规格'>
          <AtInput name='specificationName' title='规格名' type='text' placeholder='规格名称' value={this.state.specificationName} onChange={this.handleChange.bind(this, 'specificationName')} />
          <AtInput name='specificationValue' title='规格值' type='text' placeholder='规格值' value={this.state.specificationValue} onChange={this.handleChange.bind(this, 'specificationValue')}/>
          <AtButton onClick={this.addSpecification.bind(this)}>添加</AtButton>
        </AtFloatLayout>
      </View>
    )
  }
}
