import { ORDERBOOK_ENDPOINT, TRADE_ENDPOINT } from '@/constant';
import React, { createContext, ReactNode, useContext } from 'react';
import { useWebSocket } from './useWebSocket';

type WebSocketContextType = {
  orderbookWs: {
    ready: boolean;
    message: string | null;
    subscribe: (channel: string) => void;
    unsubscribe: (channel: string) => void;
  };
  tradeWs: {
    ready: boolean;
    message: string | null;
    subscribe: (channel: string) => void;
    unsubscribe: (channel: string) => void;
  };
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

type WebSocketProviderProps = {
  children: ReactNode;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const orderbookWs = useWebSocket(ORDERBOOK_ENDPOINT);
  const tradeWs = useWebSocket(TRADE_ENDPOINT);

  return (
    <WebSocketContext.Provider
      value={{
        orderbookWs,
        tradeWs,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  
  return context;
}; 