import { useState } from 'react';
import { View } from '@tarojs/components';
import { Input, Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';

import './index.less';

interface HeaderProps {
  syncSearchKey: (key: string) => void;
  handleSearch: (key: string) => void;
}

const prefix = 'customer-header-';
const CustomerHeader = ClassNameFactory(prefix);

const Index = (props: HeaderProps) => {
  const [inputvalue, setInputvalue] = useState('');

  return (
    <View className={CustomerHeader([''])}>
      <View className={CustomerHeader(['search'])}>
        <Input
          className={CustomerHeader(['input'])}
          defaultValue={inputvalue}
          placeholder='看看有啥美食？'
          onChange={(val) => {
            setInputvalue(val);
            props.syncSearchKey(val)
          }}
        />

        <Button
          className={CustomerHeader(['button'])}
          type='info'
          onClick={() => props.handleSearch(inputvalue)}
        >
          搜索
        </Button>
      </View>
    </View>
  );
};

export { Index as Header, HeaderProps };
export default Index;
