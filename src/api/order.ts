import { post, get } from '@/common/fetch';

export const orderCreate = (data) => {
  return post('/order/create', data);
};

export const orderList = () => {
  return get('/order/list/customer');
};

export const orderShopList = () =>  {
  return get('/order/list/shop');
}

export const orderDetail = (id) => {
  return get(`/order/detail/${id}`)
}

export const orderCancel = (id) => {
  return post(`/order/cancel/${id}`)
}

export const orderFinish = (id) => {
  return post(`/order/finish/${id}`)
}

export const orderAccept = (id) => {
  return post(`/order/shop/accept/${id}`)
}

export const orderCookFinish = (id) => {
  return post(`/order/shop/cookfinish/${id}`)
}




// type orderCreateModel struct {
// 	Shop      uint                   `json:"shop"`
// 	Commodity []*basicCommodityModel `json:"commodity"`
// 	Address   uint                   `json:"address"`
// }
