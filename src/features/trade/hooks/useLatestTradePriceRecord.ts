import { useEffect, useRef, useState } from 'react';

import { SAME_PRICE_THRESHOLD, TRADE_HISTORY_TOPIC, TRADE_TOPIC } from '@/constant';
import { useWebSocketContext } from '@/hooks/WebSocketContext';
import { safeJsonParse } from '@/utils/safeParseJson';

import { TradeHistoryResponse } from '../type';

export const useLatestTradePriceRecord = () => {
  const { tradeWs } = useWebSocketContext();
  const countRef = useRef(0);

  const [currPrice, setCurrPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);

  const data = { current: currPrice, previous: prevPrice };

  useEffect(() => {
    if (!tradeWs.ready) return;

    tradeWs.subscribe(TRADE_HISTORY_TOPIC);

    return () => {
      tradeWs.unsubscribe(TRADE_HISTORY_TOPIC);
    };
  }, [tradeWs, tradeWs.ready]);

  useEffect(() => {
    if (!tradeWs.ready || !tradeWs.message) return;

    const response = safeJsonParse<TradeHistoryResponse>(tradeWs.message);

    if (!response) return;

    if (response.topic !== TRADE_TOPIC) return;

    const newPrice = response.data[0].price;

    setCurrPrice(newPrice);

    countRef.current += 1;

    if (
      currPrice !== newPrice ||
      (currPrice === newPrice && countRef.current > SAME_PRICE_THRESHOLD)
    ) {
      setPrevPrice(currPrice);

      countRef.current = 0;
    }
  }, [tradeWs.message, tradeWs.ready, currPrice, prevPrice]);

  return {
    loading: !tradeWs.ready,
    data,
  };
};
