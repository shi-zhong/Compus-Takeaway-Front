import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Button } from '@tarojs/components';
import { Input, TextArea } from '@nutui/nutui-react-taro';
import { Res, shopInfoGet, shopInfoUpdate } from '@/api';

import './index.less';

interface CustomerAddressAdderProps {}

const Index = (_props: CustomerAddressAdderProps) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
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
      avatar:
        'https://st-gdx.dancf.com/gaodingx/0/uxms/design/20210812-184716-154c.png',
    }).then((res) => {
      Res(res, {
        OK: () => {
          Taro.navigateBack({
            delta: 1,
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

export { Index as CustomerAddressAdder, CustomerAddressAdderProps };
export default Index;
