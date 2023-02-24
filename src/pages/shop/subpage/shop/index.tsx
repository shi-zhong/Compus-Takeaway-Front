import { View } from '@tarojs/components';
import { useState } from 'react';
import { Popup } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import ShopLeftTagsBar from './components/shop_left_tags_bar';
import ShopRightCommodityBar from './components/shop_right_commodity_bar';
import CloseAccountBar from './components/close_account_bar';

import './index.less';

interface ShopProps {
  syncCommodity: (i: any) => void;
}

const simpleTags = (i) => {
  const ret: { id: number; tag: string }[] = [];
  for (let j = 1; j <= i; j++)
    ret.push({
      id: j,
      tag: 'tag' + j,
    });
  return ret;
};

const Index = (_props: ShopProps) => {
  const ShopStyle = ClassNameFactory('shop-');

  const tags = simpleTags(3);

  const commodity = [
    {
      tag_id: 1,
      commodities: [
        {
          id: 1,
          tag: 'eat1',
          price: 2,
        },
        {
          id: 2,
          tag: 'eat2',
          price: 4,
        },
        {
          id: 3,
          tag: 'eat3',
          price: 6,
        },
      ],
    },
    {
      tag_id: 2,
      commodities: [
        {
          id: 4,
          tag: 'eat4',
          price: 4,
        },
        {
          id: 5,
          tag: 'eat5',
          price: 6,
        },
      ],
    },
    {
      tag_id: 3,
      commodities: [
        {
          id: 1,
          tag: 'eat1',
          price: 2,
        },
        {
          id: 2,
          tag: 'eat2',
          price: 4,
        },
        {
          id: 3,
          tag: 'eat3',
          price: 6,
        },
      ],
    },
  ];

  const [activeTag, setActiveTag] = useState(tags[0].id || 0);

  const { visible, setVisible } = {
    visible: false,
    setVisible: (_i: boolean) => {},
  };

  const [selectCommodity, setSelectCommodity] = useState([] as any[]);

  const getActiveTagCommodity = () => {
    for (let i of commodity) {
      if (i.tag_id == activeTag) {
        return i.commodities;
      }
    }
    return [];
  };

  const handleEditCommodity = (id: number, count: number, all: any) => {
    let flag = false;
    const copy = selectCommodity.map((i) => {
      if (i.id == id) {
        flag = true;
        i.count = count;
      }
      return i;
    });

    if (!flag) {
      copy.push({
        id,
        count,
        price: all.price,
        tag: all.tag,
      });
    }

    setSelectCommodity(copy);
  };

  const handleSumPrice = () =>
    selectCommodity.reduce((i, j) => i + j.count * j.price, 0);

  const handleItemsCounts = () =>
    selectCommodity.reduce((i, j) => i + j.count * 1, 0);

  const handleClick = () => {
    _props.syncCommodity(selectCommodity);
  };

  return (
    <View className={ShopStyle([''])}>
      <View className={ShopStyle(['scroll'])}>
        <View className={ShopStyle(['shop-card'])}>
          <View>店铺信息</View>
          <View>商品信息</View>
          <View>店铺信息</View>
          <View>商品信息</View>
          <View>店铺信息</View>
          <View>商品信息</View>
        </View>
        <View className={ShopStyle(['commodity'])}>
          <ShopLeftTagsBar tags={tags} setActive={setActiveTag} />
          <ShopRightCommodityBar
            commodity={getActiveTagCommodity()}
            select={selectCommodity}
            handleSelectChange={handleEditCommodity}
          />
        </View>
        <CloseAccountBar
          handleClick={() => handleClick()}
          delivery={9}
          starting={10}
          sum={handleSumPrice()}
          items={handleItemsCounts()}
        />
        <Popup
          visible={visible}
          style={{ height: '20%' }}
          position='bottom'
          onClose={() => {
            setVisible(false);
          }}
        />
      </View>
    </View>
  );
};

export { Index as Shop, ShopProps };
export default Index;
