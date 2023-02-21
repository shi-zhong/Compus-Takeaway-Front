import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './operation.scss';
import { Event } from '../../common/utils/utils.js';

class Operation extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      quantity: this.getBuffer()[this.props.id].quantity,
    };
    this.onSub = this.onSub.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }
  onSub() {
    this.setState(
      (state) => {
        if (state.quantity > 0) {
          return {
            quantity: state.quantity - 1,
          };
        }
      },
      () => {
        let buffer = this.getBuffer();
        buffer[this.props.id].quantity--;
        Taro.setStorageSync('buffer', buffer);
        Event.emit('change');
      },
    );
  }
  onAdd() {
    this.setState(
      (state) => ({
        quantity: state.quantity + 1,
      }),
      () => {
        let buffer = this.getBuffer();
        buffer[this.props.id].quantity++;
        Taro.setStorageSync('buffer', buffer);
        Event.emit('change');
      },
    );
  }
  getBuffer() {
    return Taro.getStorageSync('buffer');
  }
  render() {
    const { quantity } = this.state;
    return (
      <View className='operation'>
        {quantity > 0 && (
          <>
            <Text className='substract button' onClick={this.onSub}>
              -
            </Text>
            <Text className='quantity'>{quantity}</Text>
          </>
        )}
        <Text className='add button' onClick={this.onAdd}>
          +
        </Text>
      </View>
    );
  }
}

export default Operation;
