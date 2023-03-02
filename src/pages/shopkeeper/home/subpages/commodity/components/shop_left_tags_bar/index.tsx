import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { Dialog, Input } from '@nutui/nutui-react-taro';
import { View, Text } from '@tarojs/components';
import { ClassNameFactory } from '@/common/className';
import { Res, tagAdd, tagAll, tagDel, tagUpt } from '@/api';

import './index.less';

interface ShopLeftTagsBarProps {
  setActive: (i: any) => void;
  spread?: number;
  update?: () => void;
}

const Index = (props: ShopLeftTagsBarProps) => {
  const Style = ClassNameFactory('shop-left-tags-bar-');

  const [tags, setTags] = useState([] as any[]);

  const [index, setIndex] = useState(-1);
  const [deletemode, setdeletemode] = useState(false);
  const [updatemode, setupdatemode] = useState(false);

  const [tempTag, setTempTag] = useState({ id: 0, tag: '' });

  const [visible, setVisible] = useState(false);
  const [delVisible, setDelVisible] = useState(false);

  const [componentsUpdate, setComponentUpdate] = useState(0);

  useEffect(() => {
    const id = Taro.getStorageSync('shop_id');
    tagAll(id).then((res) => {
      Res(res, {
        OK: () => {
          setTags(res.data.tags);
        },
      });
    });
  }, [componentsUpdate]);

  const handleOK = () => {
    setVisible(false);

    if (!updatemode) {
      tagAdd({
        id: 0,
        tag: tempTag.tag,
      }).then((res) => {
        Res(res, {
          OK: () => {
            setComponentUpdate(componentsUpdate + 1);
          },
        });
      });
    } else {
      tagUpt({
        id: tempTag.id,
        tag: tempTag.tag,
      }).then((res) => {
        Res(res, {
          OK: () => {
            setComponentUpdate(componentsUpdate + 1);
          },
        });
      });
    }

    setTempTag({ id: 0, tag: '' });
  };

  const handleDel = () => {
    tagDel({
      id: tempTag.id,
      tag: '',
    }).then((res) => {
      Res(res, {
        OK: () => {
          setComponentUpdate(componentsUpdate + 1);
        },
      });
    });
  };

  return (
    <View className={Style(['list'])}>
      <Dialog
        title='确认'
        visible={delVisible}
        onOk={() => handleDel()}
        onCancel={() => setDelVisible(false)}
      >
        确认删除{tempTag.tag}?
      </Dialog>

      <Dialog
        title='标签'
        visible={visible}
        lockScroll
        onOk={handleOK}
        onCancel={() => {
          setVisible(false);
          setTempTag({ id: 0, tag: '' });
        }}
      >
        <Input
          border
          maxlength={10}
          defaultValue={tempTag.tag}
          onChange={(val: string) => setTempTag({ id: 0, tag: val })}
          placeholder='标签类别描述'
        />
      </Dialog>
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
            'active-aft': index !== tags.length - 1,
            'not-active-aft': index == tags.length - 1,
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

      {tags.map((i, activeIndex) => {
        return (
          <View
            key={i.id + i.tag + activeIndex}
            className={Style({
              tag: true,
              'tag-delete-icon': deletemode,
              'tag-update-icon': updatemode,
            })}
            onClick={() => {
              setTempTag(i);
              if (deletemode) {
                setDelVisible(true);
                if (activeIndex == index) {
                  setIndex(index - 1);
                  props.setActive(index - 1 > 0 ? tags[index - 1].id : -1);
                }
              } else if (updatemode) {
                setVisible(true);
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
        <Text
          className={Style(['tag-add'])}
          onClick={() => {
            if (!updatemode && !deletemode) {
              setTempTag({ id: 0, tag: '' });
              setVisible(true);
            }
          }}
        >
          添加
        </Text>
      </View>
      <View className={Style(['tag'])}>
        <Text
          className={Style(['tag-update'])}
          onClick={() => {
            if (!deletemode) setupdatemode(!updatemode);
          }}
        >
          {updatemode ? '取消' : '修改'}
        </Text>
      </View>
      <View className={Style(['tag'])}>
        <Text
          className={Style(['tag-delete'])}
          onClick={() => {
            if (!updatemode) setdeletemode(!deletemode);
          }}
        >
          {deletemode ? '取消' : '删除'}
        </Text>
      </View>
    </View>
  );
};

export { Index as ShopLeftTagsBar, ShopLeftTagsBarProps };
export default Index;
