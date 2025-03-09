import { useCallback, useEffect, useRef, useState } from 'react';

// 定義重連的最大嘗試次數和延遲時間上限
const MAX_RECONNECT_ATTEMPTS = 5;
const MAX_RECONNECT_DELAY = 10000; // 10 seconds

type WebSocketHookResult = {
  ready: boolean;
  message: string | null;
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
};

/**
 * 建立 WebSocket 連線並提供訂閱/解除訂閱功能的 hook
 * @param endpoint WebSocket 連線的端點
 */
export function useWebSocket(endpoint: string): WebSocketHookResult {
  const [ready, setReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const instanceRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 關閉 WebSocket 連線
  const closeConnection = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.close();
      instanceRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    setReady(false);
  }, []);

  // 建立 WebSocket 連線
  const connect = useCallback(() => {
    if (instanceRef.current) {
      closeConnection();
    }

    const ws = new WebSocket(endpoint);

    ws.onopen = () => {
      console.log(`WebSocket connected to ${endpoint}`);
      setReady(true);
      reconnectAttemptsRef.current = 0;
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error:`, error);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`);
      setReady(false);
      
      // 重連邏輯
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttemptsRef.current),
          MAX_RECONNECT_DELAY
        );

        console.log(`Attempting to reconnect in ${delay}ms...`);
        
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current += 1;
          connect();
        }, delay);
      } else {
        console.error(`Failed to reconnect after ${MAX_RECONNECT_ATTEMPTS} attempts.`);
      }
    };

    instanceRef.current = ws;
  }, [endpoint, closeConnection]);

  // 訂閱頻道
  const subscribe = useCallback((channel: string) => {
    if (!instanceRef.current || !ready) {
      console.warn('WebSocket is not ready. Cannot subscribe.');
      return;
    }

    const message = JSON.stringify({
      op: 'subscribe',
      args: [channel],
    });
    
    instanceRef.current.send(message);
    console.log(`Subscribed to channel: ${channel}`);
  }, [ready]);

  // 解除訂閱頻道
  const unsubscribe = useCallback((channel: string) => {
    if (!instanceRef.current || !ready) {
      console.warn('WebSocket is not ready. Cannot unsubscribe.');
      return;
    }

    const message = JSON.stringify({
      op: 'unsubscribe',
      args: [channel],
    });
    
    instanceRef.current.send(message);
    console.log(`Unsubscribed from channel: ${channel}`);
  }, [ready]);

  // 在 component mount 時建立 WebSocket 連線，在 unmount 時關閉連線
  useEffect(() => {
    connect();

    return () => {
      closeConnection();
    };
  }, [connect, closeConnection]);

  return {
    ready,
    message,
    subscribe,
    unsubscribe,
  };
} 