import { View } from '@tarojs/components';
import { Picker, Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';

import { useState } from 'react';

import './index.less';

interface SelectorProps {}

interface PickerOption {
  text: string | number;
  value: string | number;
  disabled?: string;
  children?: PickerOption[];
  className?: string | number;
}

const prefix = 'customer-home-page-selector-';
const CustomerHomePageSelectorStyle = ClassNameFactory(prefix);

const Index = (props: SelectorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [custmerCityData, setCustmerCityData] = useState([
    {
      value: 1,
      text: '学子餐厅',
      children: [
        { value: 1, text: '1F' },
        { value: 2, text: '2F' },
      ],
    },
    {
      value: 2,
      text: '东区',
      children: [
        { value: 1, text: '1F' },
        { value: 2, text: '2F' },
      ],
    },
  ]);

  const [options, setOptions] = useState(
    [] as { value: string | number; text: string | number }[],
  );

  const setChooseValueCustmer = (
    values: (string | number)[],
    chooseData: PickerOption[],
  ) => {
    setOptions(chooseData.map((i) => ({ value: i.value, text: i.text })));
  };

  const resetChosenValue = () => {
    setOptions([]);
  };

  return (
    <View className={CustomerHomePageSelectorStyle(['root'])}>
      <View className={CustomerHomePageSelectorStyle(['container'])}>
        <View
          style={{ width: '100%' }}
          onClick={() => setIsVisible(!isVisible)}
        >
          {!options.length
            ? '点击选择店铺位置'
            : options.map((i) => i.text).join('-')}
        </View>

        <Button
          disabled={options.length === 0}
          onClick={() => resetChosenValue()}
        >
          重置
        </Button>
      </View>
      <Picker
        isVisible={isVisible}
        listData={custmerCityData}
        onClose={() => setIsVisible(false)}
        onConfirm={(values: (string | number)[], list: PickerOption[]) =>
          setChooseValueCustmer(values, list)
        }
      />
    </View>
  );
};

export { Index as Selector, SelectorProps };
export default Index;
