enum Identity {
  IdentityCustomer = 1,
  IdentityShopKeeper = 2,
  IdentityRider = 3,
  IdentityManager = 4,
  IdentityAdmin = 5,
}

enum OrderStatus {
  OrderCreate = 1,
  OrderPay = 2,
  OrderAccept = 3,
  OrderRiderAcccept = 4,
  OrderCookFinish = 5,
  OrderDeliverBegin = 6,
  OrderDeliverFinish = 7,
  OrderFinish = 8,
  OrderCancel = 9,
}

enum Code {
  OK = 20000,

  BadRequest = 40000,

  InvalidPhone = 40002,

  UserExist = 40010,
  UserNotExist = 40011,
  ShopNameExist = 40012,
  PhoneExist = 40013,
  MissingItems = 40021,
  MissingOrder = 40024,

  UnAuthorized = 40300,
  TokenInvalid = 40301,
  TokenExpired = 40302,
  PhoneORPasswordError = 40310,
  UnMatchedID = 40320,

  ServerError = 50000,
  InsertError = 50001,
  DropError = 50002,
  CheckError = 50003,
  UpdateError = 50004,
  DBEmpty = 60001,
}

export { Identity, Code, OrderStatus };
