import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Button } from '@tarojs/components';
import { Input, TextArea } from '@nutui/nutui-react-taro';
import { Res, shopInfoGet, shopInfoUpdate } from '@/api';
import { MessageFuncProps, TopBarPage, Upload } from '@/components';

import './index.less';

interface ShopKeeperEditShop {
  message: MessageFuncProps;
}

const ShopKeeperEditShopPage = (_props: ShopKeeperEditShop) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [startDelever, setStartDelevery] = useState('');
  const [intro, setIntro] = useState('');
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    shopInfoGet().then((res) => {
      Res(res, {
        OK: () => {
          setId(res.data.id);
          setName(res.data.name);
          setIntro(res.data.intro);
          setAvatar(res.data.avatar);
        },
      });
    });
  }, []);

  const handleSubmit = () => {
    shopInfoUpdate({
      name,
      intro,
      avatar,
      start_deliver: parseFloat(startDelever),
    }).then((res) => {
      Res(res, {
        OK: () => {
          _props.message.success('修改成功', () => {
            Taro.navigateBack({
              delta: 1,
            });
          });
        },
      });
    });
  };

  return (
    <View className='customer-address-adder-page'>
      <View className='customer-address-adder-wrapper'>
        <Input
          className='inputs'
          name='name'
          placeholder='请输入店铺名'
          label='店铺名'
          defaultValue={name}
          onChange={(v) => setName(v)}
        />

        <View>
          <View className='customer-address-adder-textarea-title'>
            店铺头像
            <Upload
              url={avatar}
              callback={(i) => {
                setAvatar(i);
              }}
            />
          </View>
        </View>

        <Input
          className='inputs'
          name='start_delever'
          placeholder='请输入起送价'
          label='起送价'
          type='number'
          defaultValue={startDelever}
          onChange={(v) => setStartDelevery(v)}
        />

        <View>
          <View className='customer-address-adder-textarea-title'>
            店铺简介
          </View>
          <TextArea
            className='inputs'
            placeholder='请输入店铺简介'
            defaultValue={intro}
            onChange={(v) => setIntro(v)}
            rows={5}
          />
        </View>
        <Button
          className='customer-address-adder-commit'
          onClick={() => handleSubmit()}
        >
          提交
        </Button>
      </View>
    </View>
  );
};

const Index = () => {
  return (
    <TopBarPage title='修改商店信息'>
      <ShopKeeperEditShopPage message={{} as any} />
    </TopBarPage>
  );
};

export { ShopKeeperEditShop };
export default Index;
