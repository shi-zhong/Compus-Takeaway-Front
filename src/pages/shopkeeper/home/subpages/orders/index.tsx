import Taro, { useDidShow } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, ScrollView, Image } from '@tarojs/components';
import { Tabs, TabPane } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import { OrderStatus } from '@/code/code';

import { Res, orderShopList } from '@/api';

import './index.less';

interface CustomerOrderProps {
  active?: string;
  keypath?: string;
}

// const orders = [
//   {
//     id: 1,
//     picture: Home,
//     shopname: '大大挂大大挂大大挂大大挂大大挂大大挂',
//     status: 0,
//     commodity: [
//       {
//         id: 1,
//         picture: Home,
//         name: '美味炒鸡',
//         count: 2,
//         price: 14.5,
//       },

//     ],
//   },
// ];

const Index = (_props: CustomerOrderProps) => {
  const OrderStyle = ClassNameFactory('orderbar-');

  const [tab1value, setTab1value] = useState('all');

  const [orders, setOrders] = useState([] as any[]);

  useEffect(() => {
    orderShopList().then((res) => {
      Res(res, {
        OK: () => {
          setOrders(res.data.list);
        },
      });
    });
  }, []);

  useDidShow(() => {
    if (_props.active === _props.keypath) {
      orderShopList().then((res) => {
        Res(res, {
          OK: () => {
            setOrders(res.data.list);
          },
        });
      });
    }
  })

  const ordernotaccept = (i) => {
    return i.Order.status == OrderStatus.OrderCreate;
  };

  const ordernotcookfinish = (i) => {
    return i.Order.status == OrderStatus.OrderAccept;
  };

  const orderdone = (i) => {
    return (
      i.Order.status == OrderStatus.OrderFinish ||
      i.Order.status == OrderStatus.OrderCancel
    );
  };

  const orderStatusToString = (i) => {
    switch (i.Order.status) {
      case OrderStatus.OrderCreate:
        return '待接单';
      case OrderStatus.OrderPay:
        return '待支付';
      case OrderStatus.OrderAccept:
        return '商家已接单';
      case OrderStatus.OrderRiderAcccept:
        return '骑手已接单';
      case OrderStatus.OrderCookFinish:
        return '已出单';
      case OrderStatus.OrderDeliverBegin:
        return '配送中';
      case OrderStatus.OrderDeliverFinish:
        return '已到达';
      case OrderStatus.OrderFinish:
        return '已完成';
      case OrderStatus.OrderCancel:
        return '已取消';
    }
  };

  const List = (filterorder: any) => {
    if (filterorder.length == 0) {
      return <View className={OrderStyle(['blank'])}>无可用订单</View>;
    }

    return (
      <ScrollView
        className='customer-orders-page-scroll'
        scrollY
        scrollWithAnimation
        scrollTop={20}
        refresherEnabled
      >
        {filterorder.map((order) => {
          const { Commodity: commodity, Order: in_order, Shop: shop } = order;
          const { id, commodity_id } = in_order;
          const { name, avatar } = shop;

          const price = commodity_id
            .split(';')
            .map((i) => {
              const [ids, count] = i.split('/');
              for (let j of commodity) {
                if (j.id == parseInt(ids)) {
                  return parseInt(count) * j.price;
                }
              }
              return 0;
            })
            .reduce((i, j) => i + j, 0);

          return (
            <View
              key={id}
              className={OrderStyle([''])}
              onClick={() =>
                Taro.navigateTo({
                  url: `pages/shopkeeper/order/index?id=${id}`,
                })
              }
            >
              <View className={OrderStyle(['shop-info'])}>
                <View className={OrderStyle(['shop-name'])}>{name}</View>
                <Image className={OrderStyle(['shop-picture'])} src={avatar} />
              </View>
              <View className={OrderStyle(['commodity-info'])}>
                <View
                  className={OrderStyle({
                    commodity: {
                      '-picture': true,
                      '-list': commodity.length != 1,
                    },
                  })}
                >
                  {commodity
                    .filter((_i, index) => index <= 2)
                    .map((i) => (
                      <Image
                        className={OrderStyle(['commodity-picture'])}
                        key={i.picture + i.id}
                        src={i.picture}
                      />
                    ))}
                  {commodity[3] && (
                    <View className={OrderStyle(['commodity-mask-con'])}>
                      <Image
                        className={OrderStyle(['commodity-picture'])}
                        src={commodity[3].picture}
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
                <View className={OrderStyle(['order-status'])}>
                  {orderStatusToString(order)}
                </View>
                <View className={OrderStyle(['order-sum'])}>￥{price}</View>
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
          {List(orders)}
        </TabPane>
        <TabPane paneKey='doing' title='待接单'>
          {List(orders.filter((i) => ordernotaccept(i)))}
        </TabPane>
        <TabPane paneKey='done' title='待出单'>
          {List(orders.filter((i) => ordernotcookfinish(i)))}
        </TabPane>
        <TabPane paneKey='done2' title='已完成'>
          {List(orders.filter((i) => orderdone(i)))}
        </TabPane>
      </Tabs>
    </>
  );
};

export { Index as CustomerOrder, CustomerOrderProps };
export default Index;
