import { View, Image } from '@tarojs/components';
import { ReactNode } from 'react';
import './index.less';

interface MenubarProps {
  id: number;
  avatar: string;
  name: string;
  lines: { key: string; node: ReactNode; align?: 'left' | 'center' | 'right' }[];
  onClick?: undefined | ((id: number) => void);
}

const Index = (props: MenubarProps) => {
  const prefix = 'menubar-';
  const { id, avatar, name, lines, onClick } = props;

  return (
    <View
      className={prefix}
      onClick={() => {
        onClick && onClick(id);
      }}
    >
      <Image className={prefix + 'left'} src={avatar} />

      <View className={prefix + 'right'}>
        <View className={prefix + 'line'}>{name}</View>
        {lines.map((line, index) => (
          <View
            key={line.key + 'theindex' + index}
            className={prefix + 'line'}
            style={{ textAlign: line.align || 'left' }}
          >
            {line.node}
          </View>
        ))}
      </View>
    </View>
  );
};

export { Index as Menubar, MenubarProps };

export default Index;
