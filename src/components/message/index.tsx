import { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { ClassNameFactory } from '@/common/className';

import SuccessIcon from '@/assets/icons/success.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ErrorIcon from '@/assets/icons/error.svg';

import './index.less';

export interface MessageFuncProps {
  success: (i: string, callback?: () => void) => void;
  info: (i: string, callback?: () => void) => void;
  error: (i: string, callback?: () => void) => void;
}

interface MessageProps {
  ProxyMethods: (method: MessageFuncProps) => void;
}

const delay = 1000;

const Index = (props: MessageProps) => {
  const Style = ClassNameFactory('message-');

  const [msg, setMsgs] = useState([] as any[]);

  const updateMessage = () => {
    const now = Date.now();
    setMsgs(msg.filter((i) => i.start + delay < now));
  };

  const handleIcon = (i) => {
    switch (i) {
      case 'success':
        return SuccessIcon;
      case 'info':
        return InfoIcon;
      case 'error':
        return ErrorIcon;
    }
    return SuccessIcon;
  };

  useEffect(() => {
    const handleShowMessage = (nmsg) => {
      const now = Date.now();
      setMsgs([
        ...msg,
        {
          type: 'info',
          message: '',
          ...nmsg,
          start: now,
        },
      ]);

      setTimeout(() => {
        updateMessage();
        nmsg && nmsg?.callback && nmsg.callback();
      }, delay);
    };

    const success = (i: string, callback?: () => void) => {
      handleShowMessage({ type: 'success', message: i, callback });
    };

    const info = (i: string, callback?: () => void) => {
      handleShowMessage({ type: 'info', message: i, callback });
    };

    const error = (i: string, callback?: () => void) => {
      handleShowMessage({ type: 'error', message: i, callback });
    };
    props.ProxyMethods({
      success,
      info,
      error,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className={Style(['container'])}>
      {msg.map((i) => (
        <View key={i.start} className={Style(['box'])}>
          <Image className={Style(['icon'])} src={handleIcon(i.type)} />
          <Text className={Style(['txt'])}>{i.message}</Text>
        </View>
      ))}
    </View>
  );
};

export { Index as Message, MessageProps };
export default Index;
