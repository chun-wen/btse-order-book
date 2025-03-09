export type TradeHistoryResponse = {
  topic: string;
  data: [
    {
      symbol: string;
      side: 'SELL' | 'BUY';
      size: number;
      price: number;
      tradeId: number;
      timestamp: number;
    },
  ];
};
