import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './category.scss';

class Catetory extends Component {
  constructor() {
    super(...arguments);
  }
  handleClick(item) {
    let { selectedCategory, changeCategory } = this.props;
    if (selectedCategory.id !== item.id) {
      changeCategory(item);
    }
  }
  render() {
    const { categories, selectedCategory } = this.props;
    return (
      <View className='category'>
        {categories.map((item) => (
          <Text
            className={
              'category-title ' +
              (selectedCategory.id === item.id ? 'selected' : '')
            }
            key={item.id}
            onClick={this.handleClick.bind(this, item)}
          >
            {item.title}
          </Text>
        ))}
      </View>
    );
  }
}

export default Catetory;
