import Taro, { useDidShow } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { ClassNameFactory } from '@/common/className';

import { Res, shopInfoGet } from '@/api';

import ShopInfoCard from '@/components/shop_info_card';

import ShopLeftTagsBar from './components/shop_left_tags_bar';
import ShopRightCommodityBar from './components/shop_right_commodity_bar';

import './index.less';

interface ShopProps {
  active?: string;
  keypath?: string;
}

const Index = (_props: ShopProps) => {
  const ShopStyle = ClassNameFactory('shop-');

  // 用于更新
  const [updateSpread, setUpdateSpread] = useState(1);

  const [shop, setShop] = useState({
    id: 0,
    name: '',
    avatar: '',
    address_id: 0,
    address: '',
    intro: '',
    statistic: {
      star: 0,
      monthly: 0,
    },
  } as any);

  const [activeTag, setActiveTag] = useState(-1);

  const spread = () => {
    setUpdateSpread(updateSpread + 1);
  };

  useEffect(() => {
    if (_props.active === _props.keypath) {
      shopInfoGet().then((res) => {
        Res(res, {
          OK: () => {
            setShop(res.data);
          },
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_props.active, _props.keypath]);

  useDidShow(() => {
    spread();
  });

  return (
    <View className={ShopStyle([''])}>
      <View className={ShopStyle(['scroll'])}>
        <ShopInfoCard
          onClick={() => {
            Taro.navigateTo({
              url: 'pages/shopkeeper/editshop/index',
            });
          }}
          {...shop}
        />
        <View className={ShopStyle(['commodity'])}>
          <ShopLeftTagsBar
            setActive={setActiveTag}
            spread={updateSpread}
            update={spread}
          />
          <ShopRightCommodityBar
            active={activeTag}
            spread={updateSpread}
          />
        </View>
      </View>
    </View>
  );
};

export { Index as Shop, ShopProps };
export default Index;
