import { useState } from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import { Tabs, TabPane } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';

import Home from '@/assets/icons/home-active.svg';

import './index.less';

interface CustomerOrderProps {}

const orders = [
  {
    id: 1,
    avatar: Home,
    shopname: '大大挂大大挂大大挂大大挂大大挂大大挂',
    status: 0,
    commodity: [
      {
        id: 1,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 2,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 3,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 4,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 5,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
    ],
  },
  {
    id: 2,
    avatar: Home,
    shopname: '大大挂大大挂大大挂大大挂大大挂大大挂',
    status: 0,
    commodity: [
      {
        id: 1,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 2,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 3,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 4,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 5,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
    ],
  },
  {
    id: 3,
    avatar: Home,
    shopname: '大大挂大大挂大大挂大大挂大大挂大大挂',
    status: 0,
    commodity: [
      {
        id: 1,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 2,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 3,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 4,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 5,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
    ],
  },
  {
    id: 4,
    avatar: Home,
    shopname: '大大挂大大挂大大挂大大挂大大挂大大挂',
    status: 0,
    commodity: [
      {
        id: 1,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 2,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 3,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 4,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
      {
        id: 5,
        avatar: Home,
        name: '美味炒鸡',
        count: 2,
        price: 14.5,
      },
    ],
  },
 
];

const Index = (_props: CustomerOrderProps) => {
  const OrderStyle = ClassNameFactory('orderbar-');

  const [tab1value, setTab1value] = useState('all');

  const List = () => {
    return (
      <ScrollView
        className='customer-orders-page-scroll'
        scrollY
        scrollWithAnimation
        scrollTop={20}
        refresherEnabled
      >
        {orders.map((order) => {
          const { id, shopname, avatar, commodity } = order;
          return (
            <View key={id} className={OrderStyle([''])}>
              <View className={OrderStyle(['shop-info'])}>
                <View className={OrderStyle(['shop-name'])}>{shopname}</View>
                <Image className={OrderStyle(['shop-avatar'])} src={avatar} />
              </View>
              <View className={OrderStyle(['commodity-info'])}>
                <View
                  className={OrderStyle({
                    commodity: {
                      '-avatar': true,
                      '-list': commodity.length != 1,
                    },
                  })}
                >
                  {commodity
                    .filter((_i, index) => index <= 2)
                    .map((i) => (
                      <Image
                        className={OrderStyle(['commodity-avatar'])}
                        key={i.avatar + i.id}
                        src={i.avatar}
                      />
                    ))}
                  {commodity[3] && (
                    <View className={OrderStyle(['commodity-mask-con'])}>
                      <Image
                        className={OrderStyle(['commodity-avatar'])}
                        src={commodity[3].avatar}
                      />
                      <View className={OrderStyle(['commodity-mask'])}>
                        +{commodity.length - 3}
                      </View>
                    </View>
                  )}
                </View>
                {commodity.length == 1 && (
                  <View className={OrderStyle(['commodity-name'])}>
                    {commodity[0].name}
                  </View>
                )}
                <View className={OrderStyle(['commodity-count'])}>
                  共计{commodity.length}件
                </View>
              </View>
              <View className={OrderStyle(['order-info'])}>
                <View className={OrderStyle(['order-status'])}>已送达</View>
                <View className={OrderStyle(['order-sum'])}>
                  ￥{commodity.reduce((i, j) => i + j.price * j.count, 0)}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <>
      <Tabs
        className='customer-order'
        value={tab1value}
        style={{ padding: 0 }}
        onChange={({ paneKey }) => {
          setTab1value(paneKey);
        }}
      >
        <TabPane paneKey='all' title='全部'>
          <List />
        </TabPane>
        <TabPane paneKey='doing' title='进行中'>
          <List />
        </TabPane>
        <TabPane paneKey='done' title='已完成'>
          <List />
        </TabPane>
      </Tabs>
    </>
  );
};

export { Index as CustomerOrder, CustomerOrderProps };
export default Index;
