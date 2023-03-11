import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { Skeleton, Cell, Switch } from '@nutui/nutui-react-taro';
import {
  Res,
  getUserInfo,
  customerLogin,
  getShopStatus,
  postShopStatus,
} from '@/api';
import './index.less';

interface ShopKeeperSettingProps {
  active?: string;
  keypath?: string;
}

const shopISOpen = 2;
const ShopISClose = 3;

const Index = (_props: ShopKeeperSettingProps) => {
  useEffect(() => {
    if (_props.active === _props.keypath) {
      getUserInfo().then((res) => {
        Res(res, {
          OK: () => {
            setLoading(false);
            setUserInfo(res.data);
          },
        });
      });
      getShopStatus().then((res) => {
        Res(res, {
          OK: () => {
            setOpen(res.data.status);
          },
        });
      });
    }
  }, [_props.active, _props.keypath]);

  const [loading, setLoading] = useState(true);
  const [userinfo, setUserInfo] = useState({
    avatar: '',
    phone: '',
    nickname: '',
    user_id: 0,
  });

  const [shopOpen, setOpen] = useState(0);

  const handleCustomerLogin = () => {
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
          Taro.setStorage({
            key: 'shop_id',
            data: 0,
          });
          Taro.redirectTo({
            url: 'pages/customer/home/index',
          });
        },
      });
    });
  };

  const handleShopStatusChange = (status) => {
    postShopStatus({ status: status ? shopISOpen : ShopISClose }).then(
      (res) => {
        Taro.showToast({
          icon: 'success',
          title: '修改成功',
        });
      },
    );
  };

  return (
    <View>
      <View style={{ margin: '1rem' }}>
        {loading && (
          <Skeleton
            width='100px'
            height='15px'
            row={3}
            title
            animated
            avatar
            avatarSize='100px'
          />
        )}
        {!loading && (
          <View className='shopkeeper-info-'>
            <Image className='shopkeeper-info-avatar' src={userinfo.avatar} />
            <View className='shopkeeper-info-text'>
              <View className='shopkeeper-info-nickname'>
                {userinfo.nickname}
              </View>
              <View className='shopkeeper-info-phone'>{userinfo.phone}</View>
            </View>
          </View>
        )}
      </View>
      <View className='shopkeeper-setting-list'>
        <Cell title='用户入口' onClick={() => handleCustomerLogin()} />
        {/* <Cell title='成为骑手'  /> */}
        <Cell
          title={shopOpen == shopISOpen ? '关闭商店' : '开启商店'}
          linkSlot={
            <Switch
              onChange={(val) => handleShopStatusChange(val)}
              checked={shopOpen == shopISOpen}
            />
          }
        />
      </View>
    </View>
  );
};

export { Index as ShopKeeperSetting, ShopKeeperSettingProps };
export default Index;
