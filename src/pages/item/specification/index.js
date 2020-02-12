import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components'
import {InputNumber} from '../../../components/index';
import { AtList, AtListItem } from 'taro-ui'
import './index.scss';

export default class Specification extends Component {
  static defaultProps = {
    list: []
  };

  state = {
    amount: 1
  }

  handleUpdate = (num) => {
    this.setState({
      amount:num
    })
    this.props.onCallback(num)
  }

  render() {
    const {list} = this.props
    return(
      <View className='item-specification'>
        { list &&
           <View>
             <View className='item-specification__title'>
               <Text className='item-specification__title-txt'>规格:</Text>
             </View>

             <AtList>
               {list.map((item) => (
                 <AtListItem key={item.goodsSpecificationId} className='item-specification__list-item' title={item.specificationName} extraText={item.specificationValue} />
               ))}
             </AtList>

           </View>
        }

        <View className='item-specification__number'>
          <View className='item-specification__number-txt'>
            <Text >数量: </Text>
          </View>
          <View className='item-specification__number-total' >
            <InputNumber num={this.state.amount} onChange={this.handleUpdate} />
          </View>
        </View>

      </View>

    )
  }
}
