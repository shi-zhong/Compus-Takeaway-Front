import { useState } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { Tabs, TabPane } from '@nutui/nutui-react-taro';
import MenuBar from '@/components/menubar';

import Home from '@/assets/icons/home-active.svg';

import './index.less';

interface CustomerOrderProps {}

const orders = [
  {
    id: 1,
    avatar: Home,
    shop_name: '大大挂',
    commodity_name: 'chaojixioxiao',
  },
];

const Index = (_props: CustomerOrderProps) => {
  const [tab1value, setTab1value] = useState('all');

  const List = () => {
    return (
      <ScrollView
        className='customer-home-page-scroll'
        scrollY
        scrollWithAnimation
        scrollTop={20}
        refresherEnabled
      >
        <MenuBar
          {...orders[0]}
          lines={[{ key: 'commodity_name', node: orders[0].commodity_name }]}
        />
      </ScrollView>
    );
  };

  return (
    <>
      <Tabs
        value={tab1value}
        style={{padding: 0}}
        onChange={({ paneKey }) => {
          setTab1value(paneKey);
        }}
      >
        <TabPane paneKey='all' title='全部'>
          <List />
        </TabPane>
        <TabPane paneKey='doing' title='进行中'>
          <List />
        </TabPane>
        <TabPane paneKey='done' title='已完成'>
          <List />
        </TabPane>
      </Tabs>
    </>
  );
};

export { Index as CustomerOrder, CustomerOrderProps };
export default Index;
