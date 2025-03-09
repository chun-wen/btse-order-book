'use client'

import OrderBookTable from '@/features/order-book/components/OrderBookTable';

export default function Home() {
  return (
    <OrderBookTable 
      asks={[]}
      bids={[]}
    />
  );
}
