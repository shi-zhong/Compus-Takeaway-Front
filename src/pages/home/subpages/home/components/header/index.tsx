import { useState } from 'react';
import { View, Image } from '@tarojs/components';
import { Input, Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';

import './index.less';

interface HeaderProps {}

const prefix = 'customer-header-';
const CustomerHeader = ClassNameFactory(prefix);

const Index = (props: HeaderProps) => {
  const [inputvalue, setInputvalue] = useState('');

  const submitHandler = () => {
    // submit inputvalue
  };

  return (
    <View className={CustomerHeader([''])}>
      <View className={CustomerHeader(['search'])}>
        <Input
          className={CustomerHeader(['input'])}
          defaultValue={inputvalue}
          placeholder={prefix}
          onChange={(val) => {
            console.log(val);
            setInputvalue(val);
          }}
        />

        <Button
          className={CustomerHeader(['button'])}
          type='info'
          onClick={() => submitHandler()}
        >
          搜索
        </Button>
      </View>
    </View>
  );
};

export { Index as Header, HeaderProps };
export default Index;
