import { View } from '@tarojs/components';
import { Picker, Button } from '@nutui/nutui-react-taro';
import { ClassNameFactory } from '@/common/className';

import { useEffect, useState } from 'react';

import './index.less';

interface SelectorProps {
  syncSelector: (selected: { value: number | string; text: string }[]) => void;
}

interface PickerOption {
  text: string;
  value: string | number;
  disabled?: string;
  children?: PickerOption[];
  className?: string | number;
}

interface CustomPicker {
  value: number | string;
  text: string;
  children: {
    value: number | string;
    text: string;
  }[];
}

const prefix = 'customer-home-page-selector-';
const CustomerHomePageSelectorStyle = ClassNameFactory(prefix);

const Index = (props: SelectorProps) => {
  useEffect(() => {
    setCustmerData([
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
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [custmerData, setCustmerData] = useState([] as CustomPicker[]);

  const [options, setOptions] = useState(
    [] as { value: string | number; text: string | number }[],
  );

  const setChooseValueCustmer = (
    _values: (string | number)[],
    chooseData: PickerOption[],
  ) => {
    setOptions(chooseData.map((i) => ({ value: i.value, text: i.text })));
    props.syncSelector(
      chooseData.map((i) => ({ value: i.value, text: i.text })),
    );
  };

  const resetChosenValue = () => {
    setOptions([]);
    props.syncSelector([]);
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
        listData={custmerData}
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
