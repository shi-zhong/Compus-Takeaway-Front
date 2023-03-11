import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Button } from '@tarojs/components';
import { Input, TextArea } from '@nutui/nutui-react-taro';
import { TopBarPage, MessageFuncProps } from '@/components';
import { Res, postAddressAdd, putAddressUpdate } from '@/api';

import './index.less';

interface CustomerAddressAdderProps {
  message: MessageFuncProps;
}

const CustomerAddressAdder = (props: CustomerAddressAdderProps) => {
  const { message } = props;

  const [receiver, setReceiver] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [id, setId] = useState('0');
  const [params, setParam] = useState(null as any);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const param = Taro.getCurrentInstance().router?.params;
    setParam(param);
    if (params?.action == 'edit') {
      setReceiver(decodeURI(params?.receiver || ''));
      setPhone(decodeURI(params?.phone || ''));
      setAddress(decodeURI(params?.address || ''));
      setId(decodeURI(params?.id || '0'));
    }
  }, [
    params?.action,
    params?.address,
    params?.id,
    params?.phone,
    params?.receiver,
  ]);

  const handleSubmit = () => {
    setLock(true);
    setTimeout(() => {
      setLock(false);
    }, 1000);
    if (params?.action == 'edit') {
      putAddressUpdate({
        id: parseInt(id),
        receiver,
        phone,
        address,
      }).then((res) => {
        Res(res, {
          OK: () => {
            message.success('修改成功', () => {
              Taro.navigateBack({ delta: 1 });
            });
          },
        });
      });
    } else {
      postAddressAdd({
        receiver,
        phone,
        address,
      }).then((res) => {
        Res(res, {
          OK: () => {
            message.success('添加成功', () => {
              Taro.navigateBack({ delta: 1 });
            });
          },
        });
      });
    }
  };

  return (
    <View className='customer-address-adder-page'>
      <View className='customer-address-adder-wrapper'>
        <Input
          className='inputs'
          name='name'
          placeholder='请输入姓名'
          label='姓名'
          defaultValue={receiver}
          onChange={(v) => setReceiver(v)}
        />
        <Input
          className='inputs'
          name='phone'
          placeholder='请输入手机号'
          label='手机号'
          type='number'
          maxlength={11}
          defaultValue={phone}
          onChange={(v) => setPhone(v)}
        />
        <View>
          <View className='customer-address-adder-textarea-title'>
            详细住址
          </View>
          <TextArea
            className='inputs'
            placeholder='请输入详细住址'
            defaultValue={address}
            onChange={(v) => setAddress(v)}
            rows={5}
          />
        </View>
        <Button
          className='customer-address-adder-commit'
          onClick={() => !lock && handleSubmit()}
          disabled={lock}
        >
          提交
        </Button>
      </View>
    </View>
  );
};

const Index = () => {
  return (
    <TopBarPage title='编辑地址'>
      <CustomerAddressAdder message={{} as any} />
    </TopBarPage>
  );
};

export { Index as CustomerAddressAdder, CustomerAddressAdderProps };
export default Index;
