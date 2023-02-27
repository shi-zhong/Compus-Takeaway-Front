import BottomNavbarWithTabPage from '@/components/bottom_navbar_with_tabpage';

import Home from '@/assets/icons/home.svg';
import HomeActive from '@/assets/icons/home-active.svg';
import Order from '@/assets/icons/order.svg';
import OrderActive from '@/assets/icons/order-active.svg';
import Setting from '@/assets/icons/setting.svg';
import SettingActive from '@/assets/icons/setting-active.svg';

import ShopKeeperCommodity from './subpages/commodity';
import ShopKeeperOrder from './subpages/orders';
import ShopKeeperSetting from './subpages/setting';

const Index = () => {
  const tabs = [
    {
      key: '/commodity',
      title: '商品',
      icon: Home,
      icon_active: HomeActive,
      tabitem: <ShopKeeperCommodity />,
    },
    {
      key: '/order',
      title: '订单',
      icon: Order,
      icon_active: OrderActive,
      tabitem: <ShopKeeperOrder />,
    },
    {
      key: '/setting',
      title: '设置',
      icon: Setting,
      icon_active: SettingActive,
      tabitem: <ShopKeeperSetting />,
    },
  ];
  return <BottomNavbarWithTabPage tabs={tabs} defaultKey='/commodity' />;
};

export default Index;
