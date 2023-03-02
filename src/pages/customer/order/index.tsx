import { ClassNameFactory } from '@/common/className';
import { View, Image } from '@tarojs/components';
import ShopInfoCard from '@/components/shop_info_card';
import { useEffect, useState } from 'react';
import Home from '@/assets/icons/home.svg';

import './index.less';

interface OrderDetailProps {}

const Index = (props: OrderDetailProps) => {
  useEffect(() => {
    setOrder({
      id: 3,
      shop: {
        id: 1,
        avatar: Home,
        name: '大大挂大大挂大大挂大大挂大大挂大大挂',
        address_id: 0,
        address: '',
        introduce: '',
        statistic: {
          star: 4.5,
          monthly: 600,
        },
      },
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
    });
  }, []);
  const Style = ClassNameFactory('customer-order-detail-');
  const [order, setOrder] = useState({
    id: 0,
    shop: {
      id: 0,
      avatar: '',
      name: '',
      address_id: 0,
      address: '',
      introduce: '',
      statistic: {
        star: 0,
        monthly: 0,
      },
    },
    status: 0,
    commodity: [
      {
        id: 0,
        avatar: '',
        name: '',
        count: 0,
        price: 0,
      },
    ],
  });

  return (
    <View className={Style(['page'])}>
      <View className='card'>status</View>

      <ShopInfoCard {...order.shop} />

      <View className='card'>
        {order.commodity &&
          order.commodity.map((i) => {
            const { id, price, tag, avatar } = i;
            return (
              <View key={id} className={Style(['item'])}>
                <View>
                  <Image className={Style(['avatar'])} src={avatar} />
                </View>
                <View className={Style(['right-counter'])}>
                  <View className={Style(['describe'])}>{tag}</View>
                  <View className={Style(['counter'])}>
                    <View>￥{price}</View>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
      <View className='card'>order infos</View>
    </View>
  );
};

export { Index as OrderDetail, OrderDetailProps };
export default Index;
