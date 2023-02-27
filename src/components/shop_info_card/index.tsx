import { ClassNameFactory } from '@/common/className';
import { Image, View, Text } from '@tarojs/components';

import './index.less';

interface ShopInfoCardProps {
  shop_id: number;
  shop_name: string;
  shop_avatar: string;
  shop_address_id: number;
  shop_address: string;
  shop_introduce: string;
  shop_statistic: {
    star: number;
    monthly: number;
  };
}

/**
 *
 * @param props 店铺商品页的店铺信息卡片
 * @returns
 */
const Index = (props: ShopInfoCardProps) => {
  const { shop_name, shop_statistic, shop_avatar, shop_introduce } = props;
  const Style = ClassNameFactory('shop-info-card-');

  return (
    <View className={Style([''])}>
      <View className={Style(['upper'])}>
        <View className={Style(['text'])}>
          <View className={Style(['title'])}>{shop_name}</View>
          <View>
            <Text className={Style(['star'])}>{shop_statistic.star}分</Text>{' '}
            月售{shop_statistic.monthly}
          </View>
        </View>

        <Image className={Style(['avatar'])} src={shop_avatar} />
      </View>
      <View className={Style(['introduce'])}>{shop_introduce}</View>
    </View>
  );
};

export { Index as ShopInfoCard, ShopInfoCardProps };
export default Index;
