import React, { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './store.scss';

class Store extends Component {
  render() {
    return (
      <View className='store-container'>
        <View className='store-content'>
          <View className='store-name'>德克士(王府井店)</View>
          <View className='store-desc'>
            <Text>
              月售<Text className='sales'>1362</Text>
            </Text>
            <Text>
              配送约<Text className='time'>20</Text>分钟
            </Text>
          </View>
          <View className='store-comment'>
            <Image
              className='star'
              src={require('../../assets/images/star.png')}
            />
            <Text className='score'>4.7</Text>
            <Text className='review'>棒</Text>
            <Text className='tag'>"皮子香脆 肉汁四溢 鸡肉很嫩"</Text>
          </View>
          <View className='store-rank'>
            <Text>王府井汉堡人气第2名</Text>
            <Text>点评高分店铺</Text>
          </View>
          <View className='store-ticket'>
            <View className='left'></View>
            <View className='middle'>
              <View className='wrapper'>
                <Text className='discount'>5.2</Text>
                <Text className='text'>折</Text>
              </View>
              <Text>商品券</Text>
            </View>
            <View className='right'>
              <Text>购</Text>
            </View>
          </View>
          <View className='coupon-list'>
            <View className='coupon-item'>新客爆品1元抢</View>
            <View className='coupon-item'>首单减12</View>
            <View className='coupon-item'>40减15 | 80减30</View>
            <View className='coupon-item'>天天神券</View>
          </View>
          <View className='store-notice'>公告：圣诞、下雪、炸鸡...</View>
          <Image
            className='store-logo'
            src={require('../../assets/images/dicos_logo.png')}
          />
        </View>
      </View>
    );
  }
}

export default Store;
