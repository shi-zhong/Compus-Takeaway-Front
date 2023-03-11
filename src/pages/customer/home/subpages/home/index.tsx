import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import { Menubar } from '@/components/menubar';
import { Res, search } from '@/api';

import { Header, Selector } from './components';

import './index.less';

const Index = () => {
  useEffect(() => {
    handleSearch('', [
      { value: 999, text: '点击选择' },
      { value: 999, text: '店铺位置' },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [menus, setMenu] = useState([] as any[]);

  const [options, setOptions] = useState([
    { value: 999, text: '点击选择' },
    { value: 999, text: '店铺位置' },
  ] as { value: string | number; text: string | number }[]);

  const [searchKey, setSearchKey] = useState('');

  const handleSearch = (
    searchInfo: string,
    opt?: { value: number; text: string }[],
  ) => {
    search({
      search_keys: searchInfo.split(' ').filter((i) => i.length),
      building: (opt && opt[0]?.value) || options[0]?.value || 999,
      buildng_floor: (opt && opt[1]?.value && options[1]?.value) || 999,
    }).then((res) => {
      Res(res, {
        OK: () => {
          setMenu(res.data.shops || []);
        },
      });
    });
  };

  const syncSelector = (
    selected: { value: number | string; text: string }[],
  ) => {
    console.log(selected)
    setOptions(selected);
    handleSearch(searchKey, selected as any);
  };

  const syncSearchKey = (key: string) => {
    setSearchKey(key);
  };

  const handleJumpToShop = (id: number) => {
    Taro.navigateTo({
      url: `pages/shop/index?id=${id}`,
    });
  };

  return (
    <View>
      <Header syncSearchKey={syncSearchKey} handleSearch={handleSearch} />
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
            onClick={handleJumpToShop}
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
                node: <>￥{menu.start_deliver}起送</>,
              },
              {
                key: 'tags',
                node: <>{menu.intro}</>,
              },
            ]}
          />
        ))}
        {menus.length == 0 && (
          <View className='customer-home-page-scroll-blank'>搜索不到想要的商品</View>
        )}
        <View className='customer-home-page-scroll-bottom-padding'></View>
      </ScrollView>
    </View>
  );
};

export default Index;
