// WebSocket 端點
export const ORDERBOOK_ENDPOINT = 'wss://ws.btse.com/ws/oss/futures';
export const TRADE_ENDPOINT = 'wss://ws.btse.com/ws/futures';

// WebSocket 頻道訂閱主題
export const ORDERBOOK_TOPIC = 'update:BTCPFC';
export const TRADE_HISTORY_TOPIC = 'tradeHistoryApi:BTCPFC';

// 訂閱頻道
export const ORDERBOOK_CHANNEL = 'update:BTCPFC_0';
export const TRADE_HISTORY_CHANNEL = 'tradeHistoryApi:BTCPFC';
export const TRADE_TOPIC = 'tradeHistoryApi';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
} as const;

export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

export const TRADE_TYPE = {
  ASK: 'ask',
  BID: 'bid',
} as const;

export type TradeType = (typeof TRADE_TYPE)[keyof typeof TRADE_TYPE];

export const MAX_DISPLAYED_ORDERS = 8;
