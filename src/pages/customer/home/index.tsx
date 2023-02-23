import BottomNavbarWithTabPage from '@/components/bottom_navbar_with_tabpage';

import Home from '@/assets/icons/home.svg';
import HomeActive from '@/assets/icons/home-active.svg';
import Order from '@/assets/icons/order.svg';
import OrderActive from '@/assets/icons/order-active.svg';
import Setting from '@/assets/icons/setting.svg';
import SettingActive from '@/assets/icons/setting-active.svg';

import CustomerHome from './subpages/home';
import CustomerOrder from './subpages/orders';
import CustomerSetting from './subpages/setting';

const Index = () => {
  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: Home,
      icon_active: HomeActive,
      tabitem: <CustomerHome />,
    },
    {
      key: '/order',
      title: '订单',
      icon: Order,
      icon_active: OrderActive,
      tabitem: <CustomerOrder />,
    },
    {
      key: '/setting',
      title: '设置',
      icon: Setting,
      icon_active: SettingActive,
      tabitem: <CustomerSetting />,
    },
  ];
  return <BottomNavbarWithTabPage tabs={tabs} defaultKey='/setting' />;
};

export default Index;
