import { useEffect, useState } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import { Menubar } from '@/components/menubar';

import Home from '@/assets/icons/home-active.svg';
import { Header, Selector } from './components';

import './index.less';

const Index = () => {
  useEffect(() => {
    const menus = [
      {
        id: 10,
        avatar: Home,
        shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
        star: 4.5,
        start_delivery: 14.5,
        monthly: 218,
        intro: '好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的好吃的',
      },
      {
        id: 11,
        avatar: Home,
        shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
        star: 4.5,
        start_delivery: 14.5,
        monthly: 218,
        intro: '好吃的',
      },
      {
        id: 12,
        avatar: Home,
        shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
        star: 4.5,
        start_delivery: 14.5,
        monthly: 218,
        intro: '好吃的',
      },
      {
        id: 13,
        avatar: Home,
        shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
        star: 4.5,
        start_delivery: 14.5,
        monthly: 218,
        intro: '好吃的',
      },
      {
        id: 14,
        avatar: Home,
        shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
        star: 4.5,
        start_delivery: 14.5,
        monthly: 218,
        intro: '好吃的',
      },
      {
        id: 15,
        avatar: Home,
        shop_name: '超级大大褂超级大大褂超级大大褂超级大大褂',
        star: 4.5,
        start_delivery: 14.5,
        monthly: 218,
        intro: '好吃的',
      },
    ];
    setMenu(menus);
  }, []);

  const [menus, setMenu] = useState([] as any[]);

  const [options, setOptions] = useState(
    [] as { value: string | number; text: string | number }[],
  );

  const handleSearch = (searchInfo: string) => {
    console.log(options, searchInfo);
  };

  const syncSelector = (
    selected: { value: number | string; text: string }[],
  ) => {
    setOptions(selected);
  };

  return (
    <View>
      <Header handleSearch={handleSearch} />
      <Selector syncSelector={syncSelector} />
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
                    <Text style={{ color: 'orange' }}>{menu.star}分</Text>
                    &nbsp; &nbsp; &nbsp;
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
                node: <>{menu.intro}</>,
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
