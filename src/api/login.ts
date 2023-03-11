import { post } from '@/common/fetch';
import { Identity } from '@/code/code';

export const login = () => {
  return post('/author/login', {
    open_id: '10086',
    Phone: '18396148343',
    Avatar:
      'https://pic3.zhimg.com/80/v2-1e8d062cccd193b461344ab5412277fa_720w.webp',
    NickName: '发呆长草',
    Identity: Identity.IdentityCustomer,
  });
};

export const shopKeeperLogin = () => {
  return post('/author/shopkeeper/login', {});
};

export const customerLogin = () => {
  return post('/author/customer/login', {});
};
