import { View, Image, Text } from '@tarojs/components';
import './index.less';

/**
 * 
    this.state = {
      total: 0,
      sum: 0,
      delivery: 15,
      starting: 20,
    };
 */

const Index = () => {
  const sum = 2;
  const total = 123;
  const starting = 10;
  const delivery = 10;

  return (
    <View className='bottom'>
      <View className='bottom-content'>
        {sum > 0 ? (
          <>
            <Text className='sum'>{sum}</Text>
            {/* <Image
              className='expressman'
              src={require('../../assets/images/expressman_light.png')}
            ></Image> */}
          </>
        ) : (
          <></>
        )}
        <View className='cost'>
          <Text className='total'>
            ￥<Text className='value'>{total}</Text>
          </Text>
          <Text className='delivery'>
            预估送配送费￥{total < starting ? delivery : 0}
          </Text>
        </View>
        {total < starting ? (
          <View className='starting'>
            <Text>￥{starting}起送</Text>
          </View>
        ) : (
          <View className='gotoPay'>去结算</View>
        )}
      </View>
    </View>
  );
};

export default Index;
