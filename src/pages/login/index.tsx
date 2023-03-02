import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { Res, customerLogin } from '@/api';

import './index.less';

interface LoginProps {}

const Index = (_props: LoginProps) => {
  const handleLogin = () => {
    customerLogin().then((res) => {
      Res(res, {
        OK: () => {
          Taro.setStorage({
            key: 'token',
            data: res.data.token,
          });
          Taro.setStorage({
            key: 'id',
            data: res.data.id,
          });
          Taro.redirectTo({
            url: 'pages/customer/home/index',
          });
        },
      });
    });
  };

  return (
    <View>
      <Button className='login-button login-wx' onClick={handleLogin}>
        登录
      </Button>
    </View>
  );
};

export { Index as Login, LoginProps };
export default Index;
