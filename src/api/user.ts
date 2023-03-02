import { get } from '@/common/fetch'


export const getUserInfo = () => get('/user/info/customer/get', {})