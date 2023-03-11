import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { Res, upload } from '@/api';

import './index.less';

interface UploadProps {
  className?: string;
  url: string;
  callback: (i: string) => void;
}

const Index = (props: UploadProps) => {
  return (
    <View
      className={props?.className || 'upload'}
      onClick={() => {
        Taro.chooseImage({
          success: (res) => {
            var formdata = new FormData();
            formdata.append(
              'imgfile',
              res.tempFiles[0].originalFileObj as File,
              '7034b4c420c2e0a0.png',
            );
            upload(formdata).then((response) => {
              Res(response, {
                OK: () => {
                  props.callback(response.data.url);
                },
              });
            });
          },
        });
      }}
    >
      {props.url.length ? <Image src={props.url} /> : '+'}
    </View>
  );
};

export { Index as Upload, UploadProps };
export default Index;
