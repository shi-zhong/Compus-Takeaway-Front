import { View, Image } from '@tarojs/components';
import { InputNumber } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import Box from '@/assets/icons/box.svg';

import './index.less';

interface ShopRightCommodityBarProps {
  commodity: { id: number; tag: string; price: number }[];
  select: { id: number; count: number; price: number }[];
  handleSelectChange: (id: number, count: number, all: any) => void;
}

interface CommodityBoxProps {
  id: number;
  tag: string;
  price: number;
  select: { id: number; count: number; price: number } | undefined;
  handleSelectChange: (id: number, count: number, all: any) => void;
}

const CommodityBox = (props: CommodityBoxProps) => {
  const { id, tag, select, price, handleSelectChange } = props;
  const Style = ClassNameFactory('shop-right-commodity-bar-');

  return (
    <View className={Style(['item'])}>
      <View>
        <Image className={Style(['avatar'])} src={Box} />
      </View>
      <View className={Style(['right-counter'])}>
        <View className={Style(['describe'])}>{tag}</View>
        <View className={Style(['counter'])}>
          <View>￥{price}</View>
        </View>
      </View>
    </View>
  );
};

const Index = (props: ShopRightCommodityBarProps) => {
  const Style = ClassNameFactory('shop-right-commodity-bar-');

  const getSelect = (id: number | string) => {
    for (let sele of props.select) {
      if (sele.id == id) return sele;
    }
    return undefined;
  };

  return (
    <View className={Style(['list'])}>
      <View className={Style(['operation-bar'])}>添加</View>
      {props.commodity.map((i) => (
        <CommodityBox
          key={i.id}
          {...i}
          handleSelectChange={props.handleSelectChange}
          select={getSelect(i.id)}
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
