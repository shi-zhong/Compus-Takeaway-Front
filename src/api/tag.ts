import { get, post, put } from '@/common/fetch';

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
