import Taro from '@tarojs/taro';
import { useState } from 'react';
import { View } from '@tarojs/components';
import {
  Collapse,
  CollapseItem,
  Button,
  Dialog,
} from '@nutui/nutui-react-taro';
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
  const [visible, setVisible] = useState(false);

  const handleAddressDelete = (id: string | number) => {
    console.log(id);
  };

  console.log(Dialog);

  return (
    <View className='customer-address-page'>
      <View
        className='customer-address-float-adder'
        onClick={() =>
          Taro.navigateTo({ url: 'pages/address/subpage/adder/index' })
        }
      >
        +
      </View>
      <Dialog
        cancelText='取消'
        okText='确认'
        title='请确认操作'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        确认删除该地址么？
      </Dialog>
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
            style={{ margin: '.5rem 0' }}
          >
            <View className='customer-address-listitem-line'>{i.name}</View>
            <View className='customer-address-listitem-line'>{i.phone}</View>
            <View className='customer-address-listitem-line'>{i.address}</View>
            <View className='customer-address-listitem-button'>
              <Button
                className='customer-address-listitem-button-ref'
                onClick={() =>
                  Taro.navigateTo({
                    url: `pages/address/subpage/adder/index?action=edit&name=${i.name}&phone=${i.phone}&address=${i.address}`,
                  })
                }
              >
                修改
              </Button>
              <Button
                className='customer-address-listitem-button-ref'
                onClick={() => {
                  setVisible(true);
                }}
              >
                删除
              </Button>
            </View>
          </CollapseItem>
        ))}
      </Collapse>
    </View>
  );
};

export { Index as CustomerAddress, CustomerAddressProps };
export default Index;
