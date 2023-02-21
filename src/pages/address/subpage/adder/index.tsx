import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { Input, TextArea } from '@nutui/nutui-react-taro';
import { useEffect, useState } from 'react';

import './index.less';

interface CustomerAddressAdderProps {}

const Index = (_props: CustomerAddressAdderProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const params = Taro.getCurrentInstance().router?.params;
    console.log(this);
    if (params?.action == 'edit') {
      setName(decodeURI(params?.name || ''));
      setPhone(decodeURI(params?.phone || ''));
      setAddress(decodeURI(params?.address || ''));
    }
  }, []);

  return (
    <View className='customer-address-adder-page'>
      <View className='customer-address-adder-wrapper'>
        <Input
          className='inputs'
          name='name'
          placeholder='请输入姓名'
          label='姓名'
          defaultValue={name}
        />
        <Input
          className='inputs'
          name='phone'
          placeholder='请输入手机号'
          label='手机号'
          type='number'
          maxlength={11}
          defaultValue={phone}
        />
        <View>
          <View className='customer-address-adder-textarea-title'>
            详细住址
          </View>
          <TextArea
            className='inputs'
            placeholder='请输入详细住址'
            defaultValue={address}
            rows={5}
          />
        </View>
        <Button className='customer-address-adder-commit'>提交</Button>
      </View>
    </View>
  );
};

export { Index as CustomerAddressAdder, CustomerAddressAdderProps };
export default Index;
