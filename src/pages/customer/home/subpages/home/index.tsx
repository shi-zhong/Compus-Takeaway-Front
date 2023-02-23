import { View, ScrollView, Text } from '@tarojs/components';
import { Menubar } from '@/components/menubar';

import Home from '@/assets/icons/home-active.svg';
import { Header, Selector } from './components';

import './index.less';

const Index = () => {
  const menus = [
    {
      id: 10,
      avatar: Home,
      shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
      star: 4.5,
      start_delivery: 14.5,
      monthly: 218,
      tags: [{ name: '买过' }],
    },
    {
      id: 11,
      avatar: Home,
      shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
      star: 4.5,
      start_delivery: 14.5,
      monthly: 218,
      tags: [{ name: '买过' }],
    },
    {
      id: 12,
      avatar: Home,
      shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
      star: 4.5,
      start_delivery: 14.5,
      monthly: 218,
      tags: [{ name: '买过' }],
    },
    {
      id: 13,
      avatar: Home,
      shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
      star: 4.5,
      start_delivery: 14.5,
      monthly: 218,
      tags: [{ name: '买过' }],
    },
    {
      id: 14,
      avatar: Home,
      shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
      star: 4.5,
      start_delivery: 14.5,
      monthly: 218,
      tags: [{ name: '买过' }],
    },
    {
      id: 15,
      avatar: Home,
      shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
      star: 4.5,
      start_delivery: 14.5,
      monthly: 218,
      tags: [{ name: '买过' }],
    },
  ];

  return (
    <View>
      <Header />
      <Selector />
      <ScrollView
        className='customer-home-page-scroll'
        scrollY
        scrollWithAnimation
        scrollTop={20}
        refresherEnabled
        // lowerThreshold={Threshold}
        // upperThreshold={Threshold}
        // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        onScroll={() => {}}
      >
        {menus.map((menu) => (
          <Menubar
            key={menu.id + 'forbidden' + menu.shop_name}
            {...menu}
            lines={[
              {
                key: 'star and monthly',
                node: (
                  <>
                    <Text>{menu.star}分</Text>
                    {'  '}
                    <Text>月售{menu.monthly}</Text>
                  </>
                ),
              },
              {
                key: 'start_delivery',
                node: <>￥{menu.start_delivery}起送</>,
              },
              {
                key: 'tags',
                node: (
                  <>
                    {menu.tags.map((tag) => (
                      <View key={tag.name}>{tag.name}</View>
                    ))}
                  </>
                ),
              },
            ]}
          />
        ))}
        <View className='customer-home-page-scroll-blank'></View>
      </ScrollView>
    </View>
  );
};

export default Index;
