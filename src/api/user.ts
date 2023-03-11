import { del, get, post, put } from '@/common/fetch';



export const getUserInfo = () => get('/user/info/customer/get', {})

export const getAddressList = () => get('/user/address/list', {});
export const postAddressAdd = (data) => post('/user/address/add', data);
export const putAddressUpdate = (data) => put('/user/address/update', data);
export const delAddress = (id: number) => del(`/user/address/delete/${id}`, {});
