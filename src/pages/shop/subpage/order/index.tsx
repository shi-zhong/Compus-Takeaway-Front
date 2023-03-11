import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Address, Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import { Res, getAddressList, getUserInfo, orderCreate } from '@/api';
import { MessageFuncProps, TopBarPage } from '@/components';
import './index.less';

interface OrderPageProps {
  commodity: any[];
  message: MessageFuncProps;
}

const OrderPage = (_props: OrderPageProps) => {
  const { message } = _props;

  const [visible, setVisible] = useState(false);
  const [existAddress, setVisibleAddress] = useState([] as any[]);
  const [current, setCurrent] = useState({ id: 0 } as any);
  const [ID, setID] = useState(0);

  const [disable, setDisable] = useState(false);

  const Style = ClassNameFactory('customer-order-todo-');

  useEffect(() => {
    let active = 0;

    const params = Taro.getCurrentInstance().router?.params;
    const ids = parseInt(decodeURI(params?.id || '0'));
    setID(ids);

    getUserInfo().then((res) => {
      Res(res, {
        OK: () => {
          active = res.data.last_used_address;
        },
      });
    });

    getAddressList().then((res) => {
      Res(res, {
        OK: () => {
          setVisibleAddress(
            res.data.address.map((i) => ({
              id: i.id,
              name: i.receiver,
              addressDetail: i.address,
              selectedAddress: i.id == active,
              phone: i.phone,
              cityName: '',
              countyName: '',
              provinceName: '',
              townName: '',
            })),
          );
          // {id: 1, receiver: "余某人", phone: "18369854783", address: "某楼栋某单元某某某2"}
          console.log(
            active,
            res.data.address.filter((i) => i.id == active)?.[0],
          );
          setCurrent(
            res.data.address
              .filter((i) => i.id == active)
              .map((i) => ({
                id: i.id,
                name: i.receiver,
                addressDetail: i.address,
                phone: i.phone,
              }))?.[0] || { id: 0 },
          );
        },
      });
    });
  }, []);

  const selected = (_preAddress, nowAddress, _all) => {
    setCurrent(nowAddress);
  };

  const handlePay = () => {
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 3000);

    orderCreate({
      shop: ID,
      commodity: _props.commodity.map((i) => ({
        id: i.id,
        count: parseInt(i.count),
      })),
      address: current.id || 0,
    }).then((res) => {
      Res(res, {
        OK: () => {
          if (res.data.status == 0) {
            message.success('店铺已关门', () => {
              Taro.navigateBack();
            });
          } else {
            message.success('支付成功', () => {
              Taro.navigateBack();
            });
          }
        },
      });
    });
  };

  return (
    <View className={Style(['page'])}>
      <View className={Style([''])}>
        <View className={Style(['scroll-view'])}>
          <View className={Style(['address-card'])}>
            <View>{current?.addressDetail || '请选择收货地址'}</View>
            <View>
              {current?.name || '收件人'}&nbsp;&nbsp;&nbsp;&nbsp;
              {current?.phone || '手机号'}
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
                  <Image
                    className={Style(['commodity-avatar'])}
                    src={i.all.picture}
                  />
                </View>
                <View className={Style(['commodity-describe'])}>
                  <View className={Style(['commodity-line', 'name'])}>
                    {i.all.name}
                  </View>
                  <View className={Style(['commodity-line', 'intro'])}>
                    {i.all.intro}
                  </View>
                  <View className={Style(['commodity-line'])}>
                    单价￥{i.all.price}&nbsp;&nbsp;&nbsp; 数量{i.count}
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
                _props.commodity.reduce((i, j) => i + j.all.price * j.count, 0)}
            </Text>
          </View>
          <Button
            type='info'
            onClick={() => handlePay()}
            disabled={current?.id == 0 || disable}
          >
            {current?.id == 0 ? '地址未填写' : '去支付'}
          </Button>
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

const Index = (props: { commodity: any[]; onBack: () => void }) => {
  return (
    <TopBarPage title='完成订单' onBack={props.onBack}>
      <OrderPage {...props} message={{} as any} />
    </TopBarPage>
  );
};

export { Index as OrderPage, OrderPageProps };
export default Index;
