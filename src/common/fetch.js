import Taro from '@tarojs/taro';

// Fetch(url, data).then((res) => { console.log(res) })

const preHttp = 'http://localhost:8000/api/v1'

const Fetch = (url, data = {}, method = 'GET') => {
  const header = {
    'Content-Type': 'application/json',
    "Accept": "*/*",
    "Connection": "keep-alive",
    token: Taro.getStorageSync('token')
  };
  return Taro.request({
    url: preHttp + url,
    data,
    method,
    header,
  }).then(res => {
    switch (res.statusCode) {
      case 200:
        if (res.data) {
          return res.data;
        } else {
          return res.code;
        }
      case 400:
        throw new Error('没有权限访问');
      case 401:
      // const id = Taro.getStorageSync('sid')
      // const password = Taro.getStorageSync('pwd')

      // Taro.request({
      //   url: '/lonely_planet/v1/login/',
      //   data: {
      //     sid:id,
      //     pwd:password
      //   },
      //   method:'POST',
      //   header:{'content-type': 'application/json'}
      // }).then( back => {
      //   Taro.setStorage({
      //     key: 'token',
      //     data: back.data.token,
      //   })
      // })

      case 404:
        throw new Error('not found');
    }
  });
};

const ProxyMethod = (method) => {
  return (url, data = {}) => Fetch(url, data, method);
}

const get = ProxyMethod('GET')
const post = ProxyMethod('POST')
const put = ProxyMethod('PUT')
const del = ProxyMethod('DELETE')

export { get, post, put, del }

export default Fetch;