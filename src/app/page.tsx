'use client';

import Container from '@/components/Container';
import { MAX_DISPLAYED_ORDERS } from '@/constant';
import { WebSocketProvider } from '@/context/WebSocketContext';
import OrderBookTable from '@/features/order-book/components/OrderBookTable';
import { useOrderBook } from '@/features/order-book/hooks/useOrderBook';
import {
  getAsksOrderBookTableData,
  getBidsOrderBookTableData,
} from '@/features/order-book/util';
import { useLatestTradePriceRecord } from '@/features/trade/hooks/useLatestTradePriceRecord';

export default function Home() {
  return (
    <Container>
      <WebSocketProvider>
        <OrderBookContent />
      </WebSocketProvider>
    </Container>
  );
}

function OrderBookContent() {
  const { data, loading } = useOrderBook();
  const displayedAsksData = getAsksOrderBookTableData(
    data.asks.orders
      .sort((a, b) => b.price - a.price)
      .slice(0, MAX_DISPLAYED_ORDERS),
  );
  const displayedBidsData = getBidsOrderBookTableData(
    data.bids.orders
      .sort((a, b) => b.price - a.price)
      .slice(0, MAX_DISPLAYED_ORDERS),
  );

  const { data: latestPriceRecord, loading: latestPriceLoading } =
    useLatestTradePriceRecord();

  if (loading || latestPriceLoading) {
    return <>Loading...</>;
  }

  return (
    <OrderBookTable
      asks={displayedAsksData}
      bids={displayedBidsData}
      priceRecord={latestPriceRecord}
    />
  );
}
