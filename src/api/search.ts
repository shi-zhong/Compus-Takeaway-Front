import { post } from '@/common/fetch';

export const search = (data) => {
  return post('/search', data);
};
