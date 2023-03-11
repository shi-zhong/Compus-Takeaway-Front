import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { Popup } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import ShopInfoCard from '@/components/shop_info_card';
import { commodityAll, Res, shopInfoGet, tagAll } from '@/api';
import ShopLeftTagsBar from './components/shop_left_tags_bar';
import ShopRightCommodityBar from './components/shop_right_commodity_bar';
import CloseAccountBar from './components/close_account_bar';

import './index.less';

interface ShopProps {
  commodity: any[];
  syncCommodity: (i: any) => void;
}

const Index = (props: ShopProps) => {
  const ShopStyle = ClassNameFactory('shop-');

  const [ID, setID] = useState(0);

  const [shop, setShop] = useState({
    id: 0,
    name: '',
    avatar: '',
    address_id: 0,
    address: '',
    intro: '',
    star: 0,
    monthly: 0,
  } as any);

  const [tags, setTags] = useState([] as any[]);
  const [commoditys, setCommoditys] = useState([] as any[]);

  useEffect(() => {
    setSelectCommodity(props.commodity)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    const params = Taro.getCurrentInstance().router?.params;
    const ids = parseInt(decodeURI(params?.id || '0'));
    setID(ids);

    shopInfoGet(ids).then((res) => {
      Res(res, {
        OK: () => {
          setShop(res.data);
        },
      });
    });

    tagAll(ids).then((res) => {
      Res(res, {
        OK: () => {
          setTags(res.data.tags);
        },
      });
    });

    commodityAll(ids).then((res) => {
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
  }, []);

  const getActiveTagCommodity = () => {
    if (active == 0) return commoditys;
    else return commoditys.filter((i) => i.tags.indexOf(active) != -1);
  };

  const [active, setActiveTag] = useState(0);

  const { visible, setVisible } = {
    visible: false,
    setVisible: (_i: boolean) => {},
  };

  const [selectCommodity, setSelectCommodity] = useState([] as any[]);

  const handleSelectChange = (id: number, count: number, all: any) => {
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
        all,
      });
    }

    setSelectCommodity(copy);
  };

  const handleSumPrice = () =>
    selectCommodity.reduce((i, j) => i + j.count * j.all.price, 0);

  const handleItemsCounts = () =>
    selectCommodity.reduce((i, j) => i + j.count * 1, 0);

  const handleClick = () => {
    props.syncCommodity(selectCommodity);
  };

  return (
    <View className={ShopStyle([''])}>
      <View className={ShopStyle(['scroll'])}>
        <ShopInfoCard {...shop} />
        <View className={ShopStyle(['commodity'])}>
          <ShopLeftTagsBar tags={tags} setActive={setActiveTag} />
          <ShopRightCommodityBar
            commodity={getActiveTagCommodity()}
            select={selectCommodity}
            handleSelectChange={handleSelectChange}
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
