import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { Skeleton, Cell, Dialog } from '@nutui/nutui-react-taro';
import { Res, getUserInfo, shopKeeperLogin } from '@/api';
import './index.less';

interface CustomerSettingProps {}

const Index = (_props: CustomerSettingProps) => {
  useEffect(() => {
    getUserInfo().then((res) => {
      Res(res, {
        OK: () => {
          setLoading(false);
          setUserInfo(res.data);
          // console.log(res.data)
        },
      });
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [userinfo, setUserInfo] = useState({
    avatar: '',
    phone: '',
    nickname: '',
    user_id: 0,
  });

  const handleShopkeeperLogin = () => {
    shopKeeperLogin().then((res) => {
      Res(res, {
        OK: () => {
          Taro.setStorage({
            key: 'token',
            data: res.data.token,
          });
          Taro.setStorage({
            key: 'id',
            data: res.data.shopkeeper.id,
          });
          Taro.setStorage({
            key: 'shop_id',
            data: res.data.shop_id,
          });
          Taro.redirectTo({
            url: 'pages/shopkeeper/home/index',
          });
        },
        UnAuthorized: () => {
          alert("未查询到权限！")
        }
      });
    });
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
          <View className='customer-info-'>
            <Image className='customer-info-avatar' src={userinfo.avatar} />
            <View className='customer-info-text'>
              <View className='customer-info-nickname'>
                {userinfo.nickname}
              </View>
              <View className='customer-info-phone'>{userinfo.phone}</View>
            </View>
          </View>
        )}
      </View>
      <View className='customer-setting-list'>
        <Cell
          title='地址管理'
          onClick={() =>
            Taro.navigateTo({ url: 'pages/customer/address/index' })
          }
        />
        {/* <Cell title='管理入口' /> */}
        <Cell title='成为商家' onClick={() => setVisible(true)} />

        <Dialog
          className='setting-confirm-tobe-shopkeeper'
          title='确认'
          visible={visible}
          onOk={() => {
            handleShopkeeperLogin()
            setVisible(false)
          }}
          onCancel={() => setVisible(false)}
        >
          确认成为商家？ (只有该区域实体店合同内的手机账户有资格成为商家)
        </Dialog>
        {/* <Cell title='成为骑手' /> */}
      </View>
    </View>
  );
};

export { Index as CustomerSetting, CustomerSettingProps };
export default Index;
