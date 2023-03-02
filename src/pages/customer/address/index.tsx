import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import {
  Collapse,
  CollapseItem,
  Button,
  Dialog,
} from '@nutui/nutui-react-taro';
import { Res, getAddressList, delAddress } from '@/api';
import './index.less';

interface CustomerAddressProps {}

interface AddressModel {
  id: number;
  address: string;
  phone: string;
  receiver: string;
}

const Index = (_props: CustomerAddressProps) => {
  useEffect(() => {
    getAddressList().then((res) => {
      Res(res, {
        OK: () => {
          setAddress(res.data.address);
        },
      });
    });
  }, []);

  const [address, setAddress] = useState([] as AddressModel[]);

  const [activeKey, setActiveKey] = useState('0');
  const [delKey, setDelKey] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleAddressDelete = (id: number) => {
    delAddress(id).then((res) => {
      Res(res, {
        OK:() => {
          setAddress(address.filter((i) => (i.id != id)))
          setActiveKey('0')
          setDelKey(0)
        }
      })
    });
  };

  return (
    <View className='customer-address-page'>
      <View
        className='customer-address-float-adder'
        onClick={() =>
          Taro.navigateTo({ url: 'pages/customer/address/subpage/adder/index' })
        }
      >
        +
      </View>
      <Dialog
        cancelText='取消'
        okText='确认'
        title='请确认操作'
        visible={visible}
        onOk={() => {
          setVisible(false);
          handleAddressDelete(delKey);
        }}
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
            <View className='customer-address-listitem-line'>{i.receiver}</View>
            <View className='customer-address-listitem-line'>{i.phone}</View>
            <View className='customer-address-listitem-line'>{i.address}</View>
            <View className='customer-address-listitem-button'>
              <Button
                className='customer-address-listitem-button-ref'
                onClick={() =>
                  Taro.navigateTo({
                    url: `pages/customer/address/subpage/adder/index?action=edit&id=${i.id}&receiver=${i.receiver}&phone=${i.phone}&address=${i.address}`,
                  })
                }
              >
                修改
              </Button>
              <Button
                className='customer-address-listitem-button-ref'
                onClick={() => {
                  setDelKey(i.id)
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
