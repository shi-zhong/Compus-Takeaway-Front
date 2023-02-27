import { useState } from 'react';
import { View } from '@tarojs/components';
import { Skeleton, Cell, Dialog } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.less';

interface CustomerSettingProps {}

const Index = (props: CustomerSettingProps) => {
  const [visible, setVisible] = useState(false);

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
        {/* <Cell
          title='地址管理'
          onClick={() => Taro.navigateTo({ url: 'pages/address/index' })}
        /> */}
        {/* <Cell title='管理入口' /> */}
        <Cell title='用户入口' onClick={() => setVisible(true)} />

        <Dialog
          className='setting-confirm-tobe-shopkeeper'
          title='确认'
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >          
          确认成为商家？
          (只有该区域实体店合同内的手机账户有资格成为商家)
        </Dialog>
        {/* <Cell title='成为骑手' /> */}
      </View>
    </View>
  );
};

export { Index as CustomerSetting, CustomerSettingProps };
export default Index;
