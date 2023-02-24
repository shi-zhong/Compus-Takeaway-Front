import { useState } from 'react';

import Shop from './subpage/shop/index';
import Order from './subpage/order/index';

interface ShppStatePageProps {}

const Index = (props: ShppStatePageProps) => {
  const [page, setPage] = useState('shop');

  const [commodity, setCommodity] = useState([]);

  return (
    <>
      {page == 'shop' && (
        <Shop
          syncCommodity={(i: any) => {
            setCommodity(i);
            setPage('order');
          }}
        />
      )}
      {page == 'order' && <Order commodity={commodity} />}
      {/* {page == 'shop' && <Shop />} */}
    </>
  );
};

export { Index as ShppStatePage, ShppStatePageProps };
export default Index;
