import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { Dialog, Input } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';

import Home from '@/assets/icons/home.svg';

import ShopInfoCard from '@/components/shop_info_card';

import ShopLeftTagsBar from './components/shop_left_tags_bar';
import ShopRightCommodityBar from './components/shop_right_commodity_bar';

import './index.less';

interface ShopProps {}

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

  const [tagAddVisible, setTagAddVisible] = useState(false);
  const [tagAdd, setTagAdd] = useState('');

  const [activeTag, setActiveTag] = useState(-1);
  const [tags, setTags] = useState([] as any[]);
  const [selectCommodity, setSelectCommodity] = useState([] as any[]);

  // ------
  const [shop, setShop] = useState({
    shop_id: 0,
    shop_name: '',
    shop_avatar: '',
    shop_address_id: 0,
    shop_address: '',
    shop_introduce: '',
    shop_statistic: {
      star: 0,
      monthly: 0,
    },
  } as any);

  useEffect(() => {
    /** get shop info */
    setShop({
      shop_id: 1,
      shop_name: '北京烤鸭(华师南湖店)',
      shop_avatar: Home,
      shop_address_id: 1,
      shop_address: '华中师范大学南湖校区',
      shop_introduce: '北京烤鸭(华师南湖店) 可配送至宿舍楼下',
      shop_statistic: {
        star: 4.5,
        monthly: 150,
      },
    });

    /**get tags info */
    const tagss = simpleTags(3);
    setTags(tagss);
  }, []);

  const commodity = [
    {
      id: 1,
      tag: 'eat1',
      price: 2,
      tags: [1, 3],
    },
    {
      id: 2,
      tag: 'eat2',
      price: 4,
      tags: [1],
    },
    {
      id: 3,
      tag: 'eat3',
      price: 6,
      tags: [1, 3],
    },
    {
      id: 4,
      tag: 'eat4',
      price: 4,
      tags: [2],
    },
    {
      id: 5,
      tag: 'eat5',
      price: 6,
      tags: [2],
    },
  ];

  const getActiveTagCommodity = () => {
    if (activeTag == -1) return commodity;
    else return commodity.filter((i) => i.tags.indexOf(activeTag) != -1);
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

  const handleAdd = () => setTagAddVisible(true);
  const handleDelete = (id: number) => {
    setTags(tags.filter((i) => i.id != id));
  };

  return (
    <View className={ShopStyle([''])}>
      <Dialog
        title='添加'
        visible={tagAddVisible}
        lockScroll
        onOk={() => {
          setTagAddVisible(false);
          const copy = [...tags];
          copy.push({ id: tags[tags.length - 1].id + 1, tag: tagAdd });
          setTags(copy);
          setTagAdd('');
        }}
        onCancel={() => {
          setTagAddVisible(false);
          setTagAdd('');
        }}
      >
        <Input
          border
          maxlength={10}
          defaultValue={tagAdd}
          onChange={(val: string) => setTagAdd(val)}
          placeholder='添加标签类别'
        />
      </Dialog>
      <View className={ShopStyle(['scroll'])}>
        <ShopInfoCard {...shop} />
        <View className={ShopStyle(['commodity'])}>
          <ShopLeftTagsBar
            tags={tags}
            setActive={setActiveTag}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
          <ShopRightCommodityBar
            commodity={getActiveTagCommodity()}
            select={selectCommodity}
            handleSelectChange={handleEditCommodity}
          />
        </View>
      </View>
    </View>
  );
};

export { Index as Shop, ShopProps };
export default Index;
