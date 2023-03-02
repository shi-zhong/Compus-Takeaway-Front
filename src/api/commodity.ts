import { get, post, put } from '@/common/fetch';

export const commodityAll = (id: number) => {
  return get(`/commodity/all/${id}`, {});
};

export const commodityAdd = (data) => {
  return post('/commodity/create', data);
};

export const commodityUpt = (data) => {
  return post('/commodity/update', data);
};

export const commodityDel = (data) => {
  return put(`/commodity/del/${data}`, {});
};

export const commodityDetail = (data) => {
  return get(`/commodity/detail/${data}`, {});
};
