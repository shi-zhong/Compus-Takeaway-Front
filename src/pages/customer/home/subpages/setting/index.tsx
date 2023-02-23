import { View } from '@tarojs/components';
import { Skeleton, Cell } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.less';

interface CustomerSettingProps {}

const Index = (props: CustomerSettingProps) => {
  return (
    <View>
      <View style={{ margin: '1rem' }}>
        <Skeleton
          width='100px'
          height='15px'
          row={3}
          title
          animated
          avatar
          avatarSize='100px'
        />
      </View>
      <View className='customer-setting-list'>
        <Cell
          title='地址管理'
          onClick={() => Taro.navigateTo({ url: 'pages/address/index' })}
        />
        <Cell title='管理入口' />
        <Cell title='成为商家' />
        <Cell title='成为骑手' />
      </View>
    </View>
  );
};

export { Index as CustomerSetting, CustomerSettingProps };
export default Index;
