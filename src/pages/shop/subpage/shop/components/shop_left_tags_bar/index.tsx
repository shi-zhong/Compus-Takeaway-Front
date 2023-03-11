import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { ClassNameFactory } from '@/common/className';

import './index.less';

interface ShopLeftTagsBarProps {
  tags: { id: number; tag: string }[];
  setActive: (i: any) => void;
}

const Index = (props: ShopLeftTagsBarProps) => {
  const Style = ClassNameFactory('shop-left-tags-bar-');

  const [index, setIndex] = useState(0);

  return (
    <View className={Style(['list'])}>
      <View
        className={Style(['active'])}
        style={{ top: `${index * 2.5 - 0.5}rem` }}
      >
        <View
          className={Style({
            'active-pre': index !== 0,
            'not-active-pre': index == 0,
          })}
        ></View>
        <View className={Style(['active-content'])}></View>
        <View
          className={Style({
            'active-aft': index !== props.tags.length - 1,
            'not-active-aft': index == props.tags.length - 1,
          })}
        ></View>
      </View>
      <View
        className={Style(['tag'])}
        onClick={() => {
          setIndex(0);
          props.setActive(0);
        }}
      >
        <Text className={Style(['tag-text'])}>全部</Text>
      </View>
      {props.tags.map((i, activeIndex) => {
        return (
          <View
            key={i.id + i.tag + activeIndex}
            className={Style(['tag'])}
            onClick={() => {
              setIndex(activeIndex+1);
              props.setActive(i.id);
            }}
          >
            <Text className={Style(['tag-text'])}>{i.tag}</Text>
          </View>
        );
      })}
    </View>
  );
};

export { Index as ShopLeftTagsBar, ShopLeftTagsBarProps };
export default Index;
