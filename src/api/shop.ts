import { get, post, put } from '@/common/fetch';

export const shopInfoGet = (id?: number) => {
  return get(`/shop/info/get${id != undefined ? `?id=${id}` : ''}`, {});
};

export const shopInfoUpdate = (data) => {
  return post('/shop/info/update', data);
};

export const getShopStatus = () => {
  return get('/shop/status', {});
};

export const postShopStatus = (data) => {
  return post('/shop/status', data);
};

// ------------ tag -----------------------------

export const tagAll = (id: number) => {
  return get(`/shop/tag/all/${id}`, {});
};

export const tagAdd = (data) => {
  return post('/shop/tag/add', data);
};

export const tagUpt = (data) => {
  return post('/shop/tag/upd', data);
};

export const tagDel = (data) => {
  return put('/shop/tag/del', data);
};
