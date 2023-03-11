import { get } from '@/common/fetch';

export const buildingList = () => {
  return get(`/building/list`, {});
};