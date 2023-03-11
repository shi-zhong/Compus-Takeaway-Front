import { useState } from 'react';

import Shop from './subpage/shop/index';
import Order from './subpage/order/index';

interface ShopStatePageProps {}

const Index = (_props: ShopStatePageProps) => {
  const [page, setPage] = useState('shop');

  const [commodity, setCommodity] = useState([]);

  return (
    <>
      {page == 'shop' && (
        <Shop
          commodity={commodity}
          syncCommodity={(i: any) => {
            setCommodity(i);
            setPage('order');
          }}
        />
      )}
      {page == 'order' && <Order commodity={commodity} onBack={() => {setPage('shop')}} />}
    </>
  );
};

export { Index as ShppStatePage, ShopStatePageProps };
export default Index;
