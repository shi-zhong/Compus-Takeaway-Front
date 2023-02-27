/**
 * 用户基本信息
 */
type basic_user_info = {
  uuid: number;
  nickname: string;
  avatar: string;
  phone: string;
};

/**
 * 用户
 */
type user = {
  basic: basic_user_info;
  identity: identity;
};

enum identity {
  customer = 1,
  shopkeeper,
  rider,
  manager,
}

/**
 * 顾客信息
 */
type customer = {
  user: user;
  address: address;
};

type address = {
  address_id: number;
  receiver_name: string;
  phone: string;
  address: string;
};

/**
 * 店家
 */

type shopkeeper = {
  user: user;
  shop: shop;
};

type shop = {
  shop_id: number;
  shop_name: string;
  shop_introduce: string;

  shop_avatar: string;
  shop_address: address;

  commodity: commodity[];
  tags: tag[];
};

type commodity = {
  commodity_id: number;
  commodity_name: string;
  commodity_avatar: string;
  commodity_price: number;
  commodity_tags: tag[];
};

type tag = {
  tag_id: number;
  tag: string;
};

export { basic_user_info, customer, shopkeeper };
