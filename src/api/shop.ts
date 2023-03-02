import { get, post } from '@/common/fetch';

export const shopInfoGet = (id?: number) => {
  return get(`/shop/info/get${id != undefined ? `?id=${id}` : ''}`, {});
};

export const shopInfoUpdate = (data) => {
  return post('/shop/info/update', data);
};
