import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Dialog } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import { Res, commodityDel, commodityAll } from '@/api';

import './index.less';

interface ShopRightCommodityBarProps {
  active: number;
  spread: number;
}

interface CommodityBoxProps {
  id: number;
  name: string;
  picture: string;
  intro: string;
  price: number;
  onDel?: (box: any) => void;
}

const CommodityBox = (props: CommodityBoxProps) => {
  const { id, name, picture, intro, price } = props;
  const Style = ClassNameFactory('shop-right-commodity-bar-');

  return (
    <View className={Style(['item'])}>
      <View>
        <Image className={Style(['avatar'])} src={picture} />
      </View>
      <View className={Style(['right-counter'])}>
        <View className={Style(['name'])}>{name}</View>
        <View className={Style(['describe'])}>{intro}</View>
        <View className={Style(['counter'])}>
          <Text>￥{price}</Text>
          <Text
            className={Style(['button', 'del'])}
            onClick={() => props.onDel && props.onDel(props)}
          >
            删除
          </Text>
          <Text
            className={Style(['button', 'edit'])}
            onClick={() =>
              Taro.navigateTo({
                url: `pages/shopkeeper/commodity/index?id=${id}`,
              })
            }
          >
            修改
          </Text>
        </View>
      </View>
    </View>
  );
};

const Index = (props: ShopRightCommodityBarProps) => {
  const Style = ClassNameFactory('shop-right-commodity-bar-');

  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState({} as any);

  const [commoditys, setCommoditys] = useState([] as any[]);

  useEffect(() => {
    const id = Taro.getStorageSync('shop_id');
    commodityGetAll(id);
  }, [props.spread]);

  const commodityGetAll = (id: number) => {
    commodityAll(id).then((res) => {
      Res(res, {
        OK: () => {
          setCommoditys(
            res.data.list.map((i) => ({
              id: i.id,
              tags: JSON.parse(i.tags),
              intro: i.intro,
              name: i.name,
              picture: i.picture,
              price: i.price,
            })),
          );
        },
      });
    });
  };

  const getActiveTagCommodity = () => {
    if (props.active == -1) return commoditys;
    else return commoditys.filter((i) => i.tags.indexOf(props.active) != -1);
  };

  return (
    <View className={Style(['list'])}>
      <Dialog
        title='确认'
        visible={visible}
        onOk={() => {
          commodityDel(select.id).then((res) => {
            Res(res, {
              OK: () => {
                alert('success');
                setVisible(false);
              },
            });
          });
        }}
        onCancel={() => setVisible(false)}
      >
        确认删除{select.name}?
      </Dialog>
      <View className={Style(['operation-bar'])}>
        <Text
          className={Style(['add'])}
          onClick={() =>
            Taro.navigateTo({ url: 'pages/shopkeeper/commodity/index' })
          }
        >
          添加
        </Text>
      </View>
      {getActiveTagCommodity().map((i) => (
        <CommodityBox
          key={i.id}
          {...i}
          onDel={(t) => {
            setSelect(t);
            setVisible(true);
          }}
        />
      ))}
    </View>
  );
};

export {
  Index as ShopRightCommodityBar,
  CommodityBox,
  ShopRightCommodityBarProps,
};
export default Index;
