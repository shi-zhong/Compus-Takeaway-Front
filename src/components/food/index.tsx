import React, { Component } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui';
import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import Category from '@@/food';
import FoodList from './foodlist.jsx';
import './food.less';

const categories = [
  { title: '推荐', id: 'recommend' },
  { title: '折扣', id: 'discount' },
  { title: '新品上市', id: 'new' },
  { title: '超值套餐', id: 'value' },
  { title: '爱吃饭', id: 'love' },
  { title: '一桶美味', id: 'delicious' },
  { title: '美味卷堡', id: 'roll' },
  { title: '休闲小食', id: 'snack' },
];

const foods = [
  {
    title: '小食盒套餐1份',
    sales: 10,
    price: 25,
    imgUrl: '1',
    pid: 'recommend',
    id: 'recomment#1',
  },
  {
    title: '全明星炸鸡桶',
    sales: 30,
    price: 49,
    imgUrl: '2',
    pid: 'recommend',
    id: 'recomment#2',
  },
  {
    title: '香辣鸡翅5对',
    sales: 45,
    price: 39,
    imgUrl: '3',
    pid: 'recommend',
    id: 'recomment#3',
  },
  {
    title: '圣诞四味拼盘',
    sales: 17,
    price: 39,
    imgUrl: '4',
    pid: 'recommend',
    id: 'recomment#4',
  },
  {
    title: '鸡腿汉堡双人餐1份',
    sales: 28,
    price: 49,
    imgUrl: '5',
    pid: 'discount',
    id: 'discount#1',
  },
  {
    title: '双层鸡排堡单人餐1份',
    sales: 14,
    price: 39,
    imgUrl: '6',
    pid: 'discount',
    id: 'discount#2',
  },
  {
    title: '德克士一桶都是小食B',
    sales: 28,
    price: 42,
    imgUrl: '7',
    pid: 'discount',
    id: 'discount#3',
  },
  {
    title: '香酥双鸡堡',
    sales: 30,
    price: 14,
    imgUrl: '8',
    pid: 'discount',
    id: 'discount#4',
  },
  {
    title: '南洋鸡肉卷单人餐',
    sales: 25,
    price: 25,
    imgUrl: '9',
    pid: 'new',
    id: 'new#1',
  },
  {
    title: '堡卷双人餐',
    sales: 12,
    price: 49,
    imgUrl: '10',
    pid: 'new',
    id: 'new#2',
  },
  {
    title: '脆皮鸡腿',
    sales: 23,
    price: 20.7,
    imgUrl: '11',
    pid: 'new',
    id: 'new#3',
  },
  {
    title: '多人餐',
    sales: 18,
    price: 89,
    imgUrl: '12',
    pid: 'new',
    id: 'new#4',
  },
];

class Food extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      tabList: [{ title: '点菜' }, { title: '评价' }, { title: '商家' }],
      categories: categories,
      selectedCategory: categories[0],
      list: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }
  componentDidMount() {
    let { selectedCategory } = this.state;
    this.setState({
      list: foods.filter((item) => item.pid === selectedCategory.id),
    });
    if (!Taro.getStorageSync('buffer')) {
      let buffer = {};
      for (let food of foods) {
        let obj = {};
        obj[food.id] = {
          quantity: 0,
          price: food.price,
        };
        Object.assign(buffer, obj);
      }
      Taro.setStorageSync('buffer', buffer);
    }
  }
  handleClick(value) {
    this.setState({
      current: value,
    });
  }
  changeCategory(selectedCategory) {
    this.setState({
      selectedCategory: selectedCategory,
      list: foods.filter((item) => selectedCategory.id === item.pid),
    });
  }
  render() {
    const { current, tabList, categories, selectedCategory, list } = this.state;
    return (
      <AtTabs current={current} tabList={tabList} onClick={this.handleClick}>
        <AtTabsPane>
          <View className='food-body'>
            <Category
              categories={categories}
              selectedCategory={selectedCategory}
              changeCategory={this.changeCategory}
            />
            <FoodList selectedCategory={selectedCategory} list={list} />
          </View>
        </AtTabsPane>
        <AtTabsPane>评价</AtTabsPane>
        <AtTabsPane>商家</AtTabsPane>
      </AtTabs>
    );
  }
}

export default Food;
