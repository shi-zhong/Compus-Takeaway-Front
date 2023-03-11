import { View, Image, Text } from '@tarojs/components';
import { InputNumber } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import Box from '@/assets/icons/box.svg';

import './index.less';

interface ShopRightCommodityBarProps {
  commodity: {
    id: number;
    name: string;
    picture: string;
    intro: string;
    price: number;
  }[];
  select: { id: number; count: number; price: number }[];
  handleSelectChange: (id: number, count: number, all: any) => void;
}

interface CommodityBoxProps {
  id: number;
  name: string;
  picture: string;
  intro: string;
  price: number;
  select: { id: number; count: number; price: number } | undefined;
  handleSelectChange: (id: number, count: number, all: any) => void;
}

const CommodityBox = (props: CommodityBoxProps) => {
  const { id, name, intro, picture, select, price, handleSelectChange } = props;
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
          <InputNumber
            modelValue={select?.count || undefined}
            min={0}
            onChangeFuc={(param: number) => {
              handleSelectChange(id, param, { name, picture, intro, price });
            }}
          />
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
