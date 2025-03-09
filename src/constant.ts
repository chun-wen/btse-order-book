// WebSocket 端點
export const ORDERBOOK_ENDPOINT = 'wss://ws.btse.com/ws/oss/futures';
export const TRADE_ENDPOINT = 'wss://ws.btse.com/ws/futures';

// WebSocket 頻道訂閱主題
export const ORDERBOOK_TOPIC = 'update:BTCPFC';
export const TRADE_HISTORY_TOPIC = 'tradeHistoryApi:BTCPFC';

// 訂閱頻道
export const ORDERBOOK_CHANNEL = 'update:BTCPFC_0';

export const DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export const CELL_TYPE = {
  ASK: 'ask',
  BID: 'bid',
} as const;

export type CellType = (typeof CELL_TYPE)[keyof typeof CELL_TYPE];

export const MAX_DISPLAYED_ORDERS = 8;
