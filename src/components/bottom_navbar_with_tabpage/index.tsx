import React, { ReactNode, useState } from 'react';
import { View, Image } from '@tarojs/components';

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
                {
                  // children 不是数组我们需要用 React.Children.map 来遍历
                  // 或者把它转成数组
                  React.Children.map(tab.tabitem, (child) => {
                    if (!React.isValidElement(child)) {
                      return null;
                    }
                    // 这里我们通常还会判断 child 的类型来确定是不是要传递相应的数据，这里我就不做了
                    const childProps = {
                      ...child.props,
                      active: currentKey,
                      keypath: tab.key,
                    };
                    return React.cloneElement(child, childProps);
                  }) || <>{tab.key} is Empty</>
                }
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
