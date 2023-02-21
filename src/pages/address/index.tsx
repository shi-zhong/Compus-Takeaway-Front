import { useState } from 'react';
import { View } from '@tarojs/components';
import { Cell, Collapse, CollapseItem } from '@nutui/nutui-react-taro';
import './index.less';

interface CustomerAddressProps {}

interface AddressModel {
  id: number;
  address: string;
  phone: string;
  name: string;
}

const Index = (_props: CustomerAddressProps) => {
  const [address, setAddress] = useState([
    {
      id: 1,
      address: '华中师范大学华中师范大学华中师范大学华中师范大学华中师范大学',
      phone: '13879645384',
      name: '高启强',
    },
    {
      id: 2,
      address: '华中师范大学',
      phone: '13879645384',
      name: '高启强',
    },
    {
      id: 3,
      address: '华中师范大学',
      phone: '13879645384',
      name: '高启强',
    },
    {
      id: 4,
      address: '华中师范大学',
      phone: '13879645384',
      name: '高启强',
    },
  ] as AddressModel[]);

  const [activeKey, setActiveKey] = useState('0');

  return (
    <View className='customer-address-page'>
      <View className='customer-address-float-adder'>+</View>
      <Collapse
        className='customer-address-list'
        activeName={activeKey}
        accordion
        onChange={(_isOpen, name) => {
          setActiveKey(name);
        }}
      >
        {address.map((i, index) => (
          <CollapseItem
            key={i.id + ' ' + index}
            title={i.address}
            name={i.id.toString()}
            style={{ margin: '0.5rem 0' }}
          >
            <View className='customer-address-listitem-line'>{i.name}</View>
            <View className='customer-address-listitem-line'>{i.phone}</View>
            <View className='customer-address-listitem-line'>{i.address}</View>
          </CollapseItem>
        ))}
      </Collapse>
    </View>
  );
};

export { Index as CustomerAddress, CustomerAddressProps };
export default Index;
