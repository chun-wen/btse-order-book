import { useEffect, useState } from 'react';

import { TRADE_HISTORY_TOPIC, TRADE_TOPIC } from '@/constant';
import { useWebSocketContext } from '@/context/WebSocketContext';
import { safeJsonParse } from '@/utils/safeParseJson';

import { TradeHistoryResponse } from '../type';

export const useLatestTradePriceRecord = () => {
  const { tradeWs } = useWebSocketContext();

  const [currPrice, setCurrPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);

  const data = { current: currPrice, previous: prevPrice };

  useEffect(() => {
    if (!tradeWs.ready) return;

    tradeWs.subscribe(TRADE_HISTORY_TOPIC);
  }, [tradeWs, tradeWs.ready]);

  useEffect(() => {
    if (!tradeWs.ready || !tradeWs.message) return;

    const response = safeJsonParse<TradeHistoryResponse>(tradeWs.message);

    if (!response) return;

    if (response.topic !== TRADE_TOPIC) return;

    const newPrice = response.data[0].price;

    setCurrPrice(newPrice);

    if (currPrice !== newPrice) {
      setPrevPrice(currPrice);
    }
  }, [tradeWs.message, tradeWs.ready, currPrice, prevPrice]);

  return {
    loading: !tradeWs.ready,
    data,
  };
};
