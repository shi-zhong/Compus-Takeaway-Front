import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { Button, Cell, CellGroup } from '@nutui/nutui-react-taro';
import { useEffect, useState } from 'react';
import { orderAccept, orderCookFinish, orderDetail, Res } from '@/api';
import { ClassNameFactory } from '@/common/className';
// import { ShopInfoCard } from '@/components/shop_info_card';
import { OrderStatus } from '@/code/code';
import { MessageFuncProps, TopBarPage } from '@/components';

import './index.less';

interface OrderShopKeeperProps {
  message: MessageFuncProps;
}

const OrderShopKeeper = (_props: OrderShopKeeperProps) => {
  const Style = ClassNameFactory('shopkeeper-order-todo-');
  const [ID, setID] = useState('0');
  const [commodity, setCommodity] = useState([] as any[]);
  const [shop, setShop] = useState({
    address: '',
    address_id: 0,
    avatar: '',
    can_be_searched: 0,
    id: 1,
    intro: '欢迎来吃美味蟹煲',
    monthly: 0,
    name: '美味蟹堡王',
    star: 0,
  });

  const [order, setOrder] = useState({
    id: '',
    accept_at: '0001-01-01T00:00:00Z',
    cook_finish_at: '0001-01-01T00:00:00Z',
    create_at: '2023-03-03T05:11:21.426+08:00',
    deliver_begin_at: '0001-01-01T00:00:00Z',
    deliver_finish_at: '0001-01-01T00:00:00Z',
    finish_at: '0001-01-01T00:00:00Z',
    rider_acccept_at: '0001-01-01T00:00:00Z',
    status: 1,
    Address: '',
    Phone: '',
    Receiver: '',
  });

  useEffect(() => {
    const param = Taro.getCurrentInstance().router?.params;

    const IDS = decodeURI(param?.id || '0');

    setID(IDS);

    orderDetail(IDS).then((res) => {
      Res(res, {
        OK: () => {
          console.log(res);
          const ids = res.data.order.Order.commodity_id
            .split(';')
            .map((i) => i.split('/'));

          setShop(res.data.order.Shop);

          setOrder(res.data.order.Order);
          setCommodity(
            res.data.order.Commodity.map((i) => {
              for (let [id, count] of ids) {
                if (parseInt(id) == i.id) return { ...i, count };
              }
              return i;
            }),
          );
        },
      });
    });
  }, []);

  const handleTime = (time) => {
    if (time == '0001-01-01T00:00:00Z') {
      return '未完成';
    }
    return time;
  };

  const handleClick = () => {
    if (order.status === OrderStatus.OrderCreate) {
      orderAccept(order.id).then((res) => {
        Res(res, {
          OK: () => {
            _props.message.success('处理成功', () => {
              Taro.navigateBack();
            });
          },
        });
      });
    }
    if (order.status === OrderStatus.OrderAccept) {
      orderCookFinish(order.id).then((res) => {
        Res(res, {
          OK: () => {
            _props.message.success('处理成功', () => {
              Taro.navigateBack();
            });
          },
        });
      });
    }
  };

  return (
    <View className={Style(['page'])}>
      <View className={Style([''])}>
        <View className={Style(['scroll-view'])}>
          {/* <ShopInfoCard {...shop} /> */}
          <View className={Style(['commodity-list'])}>
            {commodity.length &&
              commodity.map((i) => (
                <View key={i.id} className={Style(['commodity'])}>
                  <View>
                    <Image
                      className={Style(['commodity-avatar'])}
                      src={i.picture}
                    />
                  </View>
                  <View className={Style(['commodity-describe'])}>
                    <View className={Style(['commodity-line', 'name'])}>
                      {i.name}
                    </View>
                    <View className={Style(['commodity-line', 'intro'])}>
                      {i.intro}
                    </View>
                    <View className={Style(['commodity-line'])}>
                      单价￥{i.price}&nbsp;&nbsp;&nbsp; 数量{i.count}
                    </View>
                  </View>
                </View>
              ))}
          </View>
          <View className={Style(['order-info'])}>
            <CellGroup>
              <Cell title='地址' desc={order.Address} />
              <Cell title='收件人' desc={order.Receiver + order.Phone} />
              <Cell title='订单号' desc={order.id} />
              <Cell title='用户下单' desc={handleTime(order.create_at)} />
              <Cell title='商家接单' desc={handleTime(order.accept_at)} />
              <Cell title='商家出单' desc={handleTime(order.cook_finish_at)} />
              <Cell
                title='开始配送'
                desc={handleTime(order.deliver_begin_at)}
              />
              <Cell
                title='配送结束'
                desc={handleTime(order.deliver_finish_at)}
              />
              <Cell title='订单结束' desc={handleTime(order.finish_at)} />
            </CellGroup>
          </View>
        </View>

        <View className={Style(['confirm'])}>
          <View>
            <Button
              type='info'
              onClick={handleClick}
              disabled={
                order.status !== OrderStatus.OrderAccept &&
                order.status !== OrderStatus.OrderCreate
              }
            >
              {order.status === OrderStatus.OrderCreate && '接受订单'}
              {order.status === OrderStatus.OrderAccept && '商品出单'}
              {order.status !== OrderStatus.OrderAccept &&
                order.status !== OrderStatus.OrderCreate &&
                '无操作'}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const Index = () => {
  return (
    <TopBarPage title='订单详情'>
      <OrderShopKeeper message={{} as any} />
    </TopBarPage>
  );
};

export { Index as OrderShopKeeper, OrderShopKeeperProps };
export default Index;
