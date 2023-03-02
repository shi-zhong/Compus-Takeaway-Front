import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { Input, TextArea, Picker, Dialog } from '@nutui/nutui-react-taro';
import { Res, tagAll, commodityAdd, commodityDetail, commodityUpt } from '@/api';

import './index.less';

interface CustomerAddressAdderProps {}

const Tag = (props: { tag: string; onClick: () => void }) => {
  return (
    <View className='commodity-form-tag' onClick={props.onClick}>
      {props.tag}
    </View>
  );
};

const Index = (_props: CustomerAddressAdderProps) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [intro, setIntro] = useState('');
  const [avatar, setAvatar] = useState('');

  const [tags, setTags] = useState([] as { value: number; text: string }[]);
  const [select, setSelect] = useState([] as { value: number; text: string }[]);

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [temp, setTemp] = useState({ value: 0, text: '' });

  useEffect(() => {
    const param = Taro.getCurrentInstance().router?.params;

    const pid = parseInt(decodeURI(param?.id || '0'));

    let ttag: any[] = [];

    const shopid = Taro.getStorageSync('shop_id');
    tagAll(shopid).then((res) => {
      Res(res, {
        OK: () => {
          ttag = res.data.tags.map((i) => ({ value: i.id, text: i.tag }));
          setTags(ttag);
        },
      });
    });

    if (pid != 0) {
      setId(parseInt(decodeURI(param?.id || '0')));

      commodityDetail(pid).then((res) => {
        Res(res, {
          OK: () => {
            setName(res.data.name);
            setPrice(res.data.price);
            setIntro(res.data.intro);
            setAvatar(res.data.picture);

            const tagarr = JSON.parse(res.data.tags) as any[];

            setSelect(
              ttag.filter((i) => {
                if (tagarr.indexOf(i.value) != -1) {
                  return true;
                }
                return false;
              }),
            );
          },
        });
      });
    }
  }, []);

  const handleSubmit = () => {
    if (id != 0) {
      handleUpdate();
    } else {
      handleAdd()
    }
  };

  const handleUpdate = () => {
    commodityUpt({
      id,
      intro,
      name,
      picture: 'http://img.coozhi.com/upload/image/201905/10172856-57547.jpg',
      price: parseFloat(price),
      tags: JSON.stringify(select.map((i) => i.value)),
    }).then((res) => {
      Res(res, {
        OK: () => {
          alert('success');
          Taro.navigateBack({ delta: 1 });
        },
      });
    });
  }

  const handleAdd = () => {
    commodityAdd({
      intro,
      name,
      picture: 'http://img.coozhi.com/upload/image/201905/10172856-57547.jpg',
      price: parseFloat(price),
      tags: JSON.stringify(select.map((i) => i.value)),
    }).then((res) => {
      Res(res, {
        OK: () => {
          alert('success');
          Taro.navigateBack({ delta: 1 });
        },
      });
    });
  };

  return (
    <View className='commodity-form-page'>
      <Picker
        isVisible={visible}
        listData={tags.filter((i) => {
          for (let t of select) {
            if (t.value === i.value) {
              return false;
            }
          }
          return true;
        })}
        onClose={() => setVisible(false)}
        onConfirm={(values, list) => {
          const sele = [...select];
          const tag = list.filter((i) => i.value == values[0])[0];

          sele.push({
            value: values[0] as number,
            text: tag.text as string,
          });

          setTemp(tag as { value: number; text: string });
          setSelect(sele);
        }}
      />

      <Dialog
        title='确认'
        visible={visible2}
        onOk={() => {
          setSelect(select.filter((i) => i.value != temp.value));
          setVisible2(false);
        }}
        onCancel={() => setVisible2(false)}
      >
        确认移除{temp.text}?
      </Dialog>

      <View className='commodity-form-wrapper'>
        <Input
          className='inputs'
          name='name'
          placeholder='请输入商品名'
          label='商品名'
          defaultValue={name}
          onChange={(v) => setName(v)}
        />

        <Input
          className='inputs'
          type='number'
          name='price'
          placeholder='请输入商品价格'
          label='商品价格'
          defaultValue={price}
          onChange={(v) => setPrice(v)}
        />

        <View className='commodity-form-card'>
          <View className='commodity-form-card-title'>
            商品类别
            {select.length != tags.length && (
              <Text
                className='commodity-form-add'
                onClick={() => setVisible(true)}
              >
                添加
              </Text>
            )}
          </View>
          <View className='commodity-form-tag-list'>
            {select.map((i) => (
              <Tag
                key={i.value + i.text}
                onClick={() => {
                  setTemp(i);
                  setVisible2(true);
                }}
                tag={i.text}
              />
            ))}
          </View>
        </View>

        <View className='commodity-form-card'>
          <View className='commodity-form-card-title'>商品简介</View>
          <TextArea
            className='inputs'
            placeholder='请输入商品简介'
            defaultValue={intro}
            onChange={(v) => setIntro(v)}
            rows={5}
          />
        </View>

        <Button
          className='commodity-form-commit'
          onClick={() => handleSubmit()}
        >
          提交
        </Button>
      </View>
    </View>
  );
};

export { Index as CustomerAddressAdder, CustomerAddressAdderProps };
export default Index;
