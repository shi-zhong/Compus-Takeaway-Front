import Taro from '@tarojs/taro';

export const upload = (formdata: FormData) => {
  const header = {
    // 'Content-Type': 'multipart/form-data',
    Accept: '*/*',
    Connection: 'keep-alive',
    token: Taro.getStorageSync('token'),
  };

  return Taro.request({
    url: 'http://localhost:8000/api/v1/upload',
    data: formdata,
    method: 'POST',
    header,
  }).then((res) => {
    switch (res.statusCode) {
      case 200:
        if (res.data) {
          return res.data;
        } else {
          return res.data.code;
        }
    }
  });
};
