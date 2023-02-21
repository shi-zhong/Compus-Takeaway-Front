import { View, Image } from '@tarojs/components';
import { ReactNode, useState } from 'react';

import { ClassName } from '@/common/className';

import './index.less';

interface TabsProps {
  tabs: {
    key: string;
    title: string;
    icon: string;
    icon_active: string;
    tabitem: ReactNode;
  }[];
  defaultKey: string;
}

const Index = (props: TabsProps) => {
  const prefix = 'bottom-navbar-';
  const { tabs, defaultKey } = props;
  const [currentKey, setCurrentKey] = useState(defaultKey);
  return (
    <View>
      <View className={ClassName(['tabpage-container'], prefix)}>
        {tabs.map(
          (tab) =>
            currentKey === tab.key && (
              <View key={tab.key}>
                {tab.tabitem || <>{tab.key} is Empty</>}
              </View>
            ),
        )}
      </View>
      <View className={ClassName(['footer'], prefix)}>
        {tabs.map((tab) => {
          const { key, title, icon, icon_active } = tab;
          return (
            <View
              className={ClassName(['tab'], prefix)}
              key={key}
              onClick={() => {
                setCurrentKey(key);
              }}
            >
              <Image
                className={ClassName(['tab-icon'], prefix)}
                src={currentKey === key ? icon_active : icon}
              />
              <View
                className={ClassName(
                  { 'tab-title': true, 'tab-title-active': currentKey === key },
                  prefix,
                )}
              >
                {title}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Index;
