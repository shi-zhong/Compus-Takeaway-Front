import { ClassNameFactory } from '@/common/className';
import { Image, View, Text } from '@tarojs/components';

import './index.less';

interface ShopInfoCardProps {
  id: number;
  name: string;
  avatar: string;
  address_id: number;
  address: string;
  intro: string;
  statistic: {
    star: number;
    monthly: number;
  };
  onClick?:() => void;
}

/**
 *
 * @param props 店铺商品页的店铺信息卡片
 * @returns
 */
const Index = (props: ShopInfoCardProps) => {
  const { name, statistic, avatar, intro } = props;
  const Style = ClassNameFactory('shop-info-card-');

  return (
    <View className={Style([''])} onClick={props?.onClick || (()=>{})}>
      <View className={Style(['upper'])}>
        <View className={Style(['text'])}>
          <View className={Style(['title'])}>{name}</View>
          <View>
            <Text className={Style(['star'])}>{statistic.star}分</Text>{' '}
            月售{statistic.monthly}
          </View>
        </View>

        <Image className={Style(['avatar'])} src={avatar} />
      </View>
      <View className={Style(['introduce'])}>{intro}</View>
    </View>
  );
};

export { Index as ShopInfoCard, ShopInfoCardProps };
export default Index;
