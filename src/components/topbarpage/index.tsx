import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import React, { PropsWithChildren, useState } from 'react';
import Back from '@/assets/icons/back.svg';
import Message from '@/components/message';

import './index.less';

interface TopBarPageProps extends PropsWithChildren {
  title: string;
  showback?: boolean;
  onBack?: () => void;
}

const Index = (props: TopBarPageProps) => {
  const [message, setMessage] = useState({
    success: (_i, _j?) => {},
    info: (_i, _j?) => {},
    error: (_i, _j?) => {},
  });

  return (
    <View>
      <Message ProxyMethods={(i) => setMessage(i)} />
      <View className='topbar'>
        {(props.showback == undefined || props.showback) && (
          <Image
            className='topbar-back'
            src={Back}
            onClick={() => {
              if (props.onBack === undefined) {
                Taro.navigateBack();
              } else {
                props.onBack();
              }
            }}
          />
        )}
        {props?.title || '标题'}
      </View>
      <View className='topbar-page'>
        {
          // children 不是数组我们需要用 React.Children.map 来遍历
          // 或者把它转成数组
          React.Children.map(props.children, (child) => {
            if (!React.isValidElement(child)) {
              return null;
            }
            // 这里我们通常还会判断 child 的类型来确定是不是要传递相应的数据，这里我就不做了
            const childProps = {
              ...child.props,
              message,
            };
            return React.cloneElement(child, childProps);
          })
        }
      </View>
    </View>
  );
};

export { Index as TopBarPage, TopBarPageProps };
export default Index;
