import { useCallback, useEffect, useRef, useState } from 'react';

import { ORDERBOOK_CHANNEL } from '@/constant';
import { useWebSocketContext } from '@/hooks/WebSocketContext';
import { safeJsonParse } from '@/utils/safeParseJson';

import { Order, OrderBookResponse, OrderPair } from '../type';
import { processOrderUpdates } from '../util';

const useOrdersData = () => {
  const ordersMapRef = useRef<Map<string, Order>>(new Map());
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalSize, setTotalSize] = useState(0);

  const updateOrders = useCallback((pairs: OrderPair[]) => {
    const { updatedMap, totalDiff } = processOrderUpdates(
      ordersMapRef.current,
      pairs,
    );

    ordersMapRef.current = updatedMap;
    setOrders(Array.from(updatedMap.values()));
    setTotalSize(prev => prev + totalDiff);
  }, []);

  return [{ orders, totalSize }, updateOrders] as const;
};

export const useOrderBook = () => {
  const [askOrdersData, updateAskOrdersData] = useOrdersData();
  const [bidOrdersData, updateBidOrdersData] = useOrdersData();

  const { orderbookWs } = useWebSocketContext();

  // handle subscribe orderbook channel
  useEffect(() => {
    if (!orderbookWs.ready) return;

    orderbookWs.subscribe(ORDERBOOK_CHANNEL);
  }, [orderbookWs, orderbookWs.ready]);

  // handle orderbook data
  useEffect(() => {
    if (!orderbookWs.ready || !orderbookWs.message) return;

    const response = safeJsonParse<OrderBookResponse>(orderbookWs.message);

    if (!response) return;

    if (response.topic !== ORDERBOOK_CHANNEL) return;

    // if `prevSeqNum` of new data doesn’t match last data’s `seqNum`
    if (response.prevSeqNum >= response.seqNum) {
      orderbookWs.unsubscribe(ORDERBOOK_CHANNEL);
      orderbookWs.subscribe(ORDERBOOK_CHANNEL);

      return;
    }

    updateAskOrdersData(response.data.asks);
    updateBidOrdersData(response.data.bids);
  }, [
    orderbookWs,
    orderbookWs.message,
    orderbookWs.ready,
    updateAskOrdersData,
    updateBidOrdersData,
  ]);

  return {
    loading: !orderbookWs.ready,
    data: {
      asks: askOrdersData,
      bids: bidOrdersData,
    },
  };
};
