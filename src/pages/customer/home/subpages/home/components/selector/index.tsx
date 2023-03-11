import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { ClassNameFactory } from '@/common/className';
import { Picker, Button } from '@nutui/nutui-react-taro';

import { Res, buildingList } from '@/api';
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
    buildingList().then((res) => {
      Res(res, {
        OK: () => {
          setBuilding(
            res.data.buildings.map((i) => {
              const children = JSON.parse(i.accept_floor).map((j) => ({
                value: j,
                text: `${j}F`,
              }));
              return {
                value: i.id,
                text: i.name,
                children: [{ value: 999, text: '全部' }, ...children],
              };
            }),
          );
        },
      });
    });
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [building, setBuilding] = useState([] as CustomPicker[]);

  const [options, setOptions] = useState([
    { value: 999, text: '点击选择' },
    { value: 999, text: '店铺位置' },
  ] as { value: string | number; text: string | number }[]);

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
    setOptions([
      { value: 999, text: '点击选择' },
      { value: 999, text: '店铺位置' },
    ]);
    props.syncSelector([
      { value: 999, text: '点击选择' },
      { value: 999, text: '店铺位置' },
    ]);
  };

  return (
    <View className={CustomerHomePageSelectorStyle(['root'])}>
      <View className={CustomerHomePageSelectorStyle(['container'])}>
        <View
          style={{ width: '100%' }}
          onClick={() => setIsVisible(!isVisible)}
        >
          {options.map((i) => i.text).join('-')}
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
        listData={building}
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
