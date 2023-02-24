import { View, Image, Text } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';
import Box from '@/assets/icons/box.svg';
import './index.less';

interface CloseAccountBarProps {
  handleClick: () => void;
  starting: number;
  delivery: number;
  items: number;
  sum: number;
}

const Index = (props: CloseAccountBarProps) => {
  const { starting, delivery, items, sum } = props;
  const Style = ClassNameFactory('close-account-bar-');

  return (
    <View className={Style([''])}>
      <View className={Style(['left'])}>
        <View className={Style(['red-dot-container'])}>
          {items != 0 && <View className={Style(['red-dot'])}>{items}</View>}
          <Image className={Style(['box'])} src={Box} />
        </View>

        <View className={Style(['price'])}>
          <View className={Style(['line'])}>
            ￥<Text className='value'>{sum}</Text>
          </View>
          <View className={Style(['line'])}>
            预估送配送费￥{sum < starting ? delivery : 0}
          </View>
        </View>
      </View>

      <Button
        className={Style(['button'])}
        onClick={() => props.handleClick()}
        type='info'
        disabled={sum < starting}
      >
        {sum < starting ? <Text>￥{starting}起送</Text> : <Text>去结算</Text>}
      </Button>
    </View>
  );
};

export { Index as CloseAccountBar, CloseAccountBarProps };
export default Index;
