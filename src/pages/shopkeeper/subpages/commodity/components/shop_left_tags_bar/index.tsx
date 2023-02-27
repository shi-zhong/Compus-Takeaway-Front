import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { ClassNameFactory } from '@/common/className';

import './index.less';

interface ShopLeftTagsBarProps {
  tags: { id: number; tag: string }[];
  setActive: (i: any) => void;
  handleAdd: () => void;
  handleDelete: (id: number) => void;
}

const Index = (props: ShopLeftTagsBarProps) => {
  const Style = ClassNameFactory('shop-left-tags-bar-');

  const [index, setIndex] = useState(-1);
  const [deletemode, setdeletemode] = useState(false);

  return (
    <View className={Style(['list'])}>
      {/* 选中图标 */}
      <View
        className={Style(['active'])}
        style={{ top: `${index * 2.5 + 2}rem` }}
      >
        <View
          className={Style({
            'active-pre': index !== 0,
            'not-active-pre': index == 0,
          })}
        />
        <View className={Style(['active-content'])} />
        <View
          className={Style({
            'active-aft': index !== props.tags.length - 1,
            'not-active-aft': index == props.tags.length - 1,
          })}
        />
      </View>
      <View className={Style(['tag'])}>
        <Text
          className={Style(['tag-text'])}
          onClick={() => {
            setIndex(-1);
            props.setActive(-1);
          }}
        >
          全部
        </Text>
      </View>
      {props.tags.map((i, activeIndex) => {
        return (
          <View
            key={i.id + i.tag + activeIndex}
            className={Style({ tag: true, 'tag-delete-icon': deletemode })}
            onClick={() => {
              if (deletemode) {
                props.handleDelete(i.id);
                if (activeIndex == index) {
                  setIndex(index - 1);
                  props.setActive(
                    index - 1 > 0 ? props.tags[index - 1].id : -1,
                  );
                }
              } else {
                setIndex(activeIndex);
                props.setActive(i.id);
              }
            }}
          >
            <Text className={Style(['tag-text'])}>{i.tag}</Text>
          </View>
        );
      })}
      <View className={Style(['tag'])}>
        <Text className={Style(['tag-add'])} onClick={() => props.handleAdd()}>
          添加
        </Text>
      </View>
      <View className={Style(['tag'])}>
        <Text
          className={Style(['tag-delete'])}
          onClick={() => setdeletemode(!deletemode)}
        >
          {deletemode ? '取消' : '删除'}
        </Text>
      </View>
    </View>
  );
};

export { Index as ShopLeftTagsBar, ShopLeftTagsBarProps };
export default Index;
