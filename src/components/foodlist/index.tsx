import React, { Component } from 'react';
import { View, Image, Text } from '@tarojs/components';
import Operation from './operation.jsx';
import './foodlist.scss';

class FoodList extends Component {
  render() {
    const { selectedCategory, list } = this.props;
    return (
      <View className='list'>
        <View className='category-title'>{selectedCategory.title}</View>
        {list.map((item) => (
          <View key={item.id} className='item'>
            <Image
              className='item-image'
              src={require('../../assets/images/' + item.imgUrl + '.jpg')}
            ></Image>
            <View className='item-info'>
              <View>
                <View className='item-title'>{item.title}</View>
                <View className='item-sales'>月售{item.sales}</View>
              </View>
              <View className='item-price'>
                ￥<Text className='value'>{item.price}</Text>
              </View>
              <Operation item={item} id={item.id} />
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default FoodList;
