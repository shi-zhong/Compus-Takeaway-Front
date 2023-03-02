import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { Skeleton, Cell, Dialog } from '@nutui/nutui-react-taro';
import { Res, getUserInfo, shopKeeperLogin } from '@/api';
import './index.less';

interface ShopKeeperSettingProps {
  active?: string;
  key?: string;
}

const Index = (_props: ShopKeeperSettingProps) => {

  useEffect(() => {
    if (_props.active === _props.key) {
      getUserInfo().then((res) => {
        Res(res, {
          OK: () => {
            setLoading(false);
            setUserInfo(res.data);
          },
        });
      });
    }
  }, [_props.active, _props.key])

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [userinfo, setUserInfo] = useState({
    avatar: '',
    phone: '',
    nickname: '',
    user_id: 0,
  });

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

        <Cell title='用户入口' onClick={() => setVisible(true)} />
        {/* <Cell title='成为骑手' /> */}
      </View>
    </View>
  );
};

export { Index as ShopKeeperSetting, ShopKeeperSettingProps };
export default Index;
