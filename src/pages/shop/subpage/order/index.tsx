import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Address, Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import Home from '@/assets/icons/home.svg';
import './index.less';

interface OrderPageProps {
  commodity: any[];
}

const Index = (_props: OrderPageProps) => {
  const [visible, setVisible] = useState(false);
  const [existAddress, setVisibleAddress] = useState([] as any[]);
  const [current, setCurrent] = useState({} as any);

  const Style = ClassNameFactory('customer-order-todo-');

  useEffect(() => {
    const addresses = [
      {
        id: 1,
        address: '北京市',
        selectedAddress: true,
        name: '探探鱼',
        phone: '182****1718',
      },
      {
        id: 2,
        address: '北京市',
        selectedAddress: false,
        name: '探探鱼',
        phone: '182****1718',
      },
      {
        id: 3,
        address: '京东大厦',
        selectedAddress: false,
        name: '探探鱼',
        phone: '182****1718',
      },
    ];

    setVisibleAddress(addresses);
    setCurrent(addresses[0]);
  }, []);

  const selected = (_preAddress, nowAddress, _all) => {
    setCurrent(nowAddress);
  };

  console.log(_props);

  return (
    <View className={Style(['page'])}>
      <View className={Style([''])}>
        <View className={Style(['scroll-view'])}>
          <View className={Style(['address-card'])}>
            <View>{current?.address || '请选择收货地址'}</View>
            <View>
              {current?.name || ''}&nbsp;&nbsp;&nbsp;&nbsp;
              {current?.phone || ''}
            </View>
            <View>
              <Button
                className={Style(['change-address'])}
                type='info'
                plain
                onClick={() => setVisible(true)}
              >
                点击修改地址
              </Button>
            </View>
          </View>
          <View className={Style(['commodity-list'])}>
            {_props.commodity.map((i) => (
              <View key={i.id} className={Style(['commodity'])}>
                <View>
                  <Image className={Style(['commodity-avatar'])} src={Home} />
                </View>
                <View className={Style(['commodity-describe'])}>
                  <View className={Style(['commodity-line'])}>{i.tag}</View>
                  <View className={Style(['commodity-line'])}>
                    单价￥{i.price}&nbsp;&nbsp;&nbsp;
                    数量{i.count}
                  </View>
                  <View className={Style(['commodity-line'])}>
                    总价￥{i.count * i.price}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View className={Style(['confirm'])}>
          <View>
            合计￥
            <Text className={Style(['price'])}>
              {_props.commodity &&
                _props.commodity.reduce((i, j) => i + j.price * j.count, 0)}
            </Text>
          </View>
          <Button type='info'>去支付</Button>
        </View>

        {/* rewrite */}
        <Address
          modelValue={visible}
          type='exist'
          existAddress={existAddress}
          onChange={() => setVisible(false)}
          onClose={() => setVisible(false)}
          isShowCustomAddress={false}
          onSelected={selected}
          existAddressTitle='配送至'
        />
      </View>
    </View>
  );
};

export { Index as OrderPage, OrderPageProps };
export default Index;
