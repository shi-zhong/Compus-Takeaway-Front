export default defineAppConfig({
  pages: [
    'pages/login/index',

    'pages/shopkeeper/home/index',
    'pages/shopkeeper/order/index',
    'pages/shopkeeper/editshop/index',
    'pages/shopkeeper/commodity/index',

    'pages/shop/index',
    
    'pages/customer/home/index',
    'pages/customer/order/index',
    'pages/customer/address/index',
    'pages/customer/address/subpage/adder/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '外卖24',
    navigationBarTextStyle: 'black',
  },
});
