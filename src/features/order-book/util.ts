import type { SortOrder } from '@/constant';
import { SORT_ORDER } from '@/constant';

import { Order, OrderBookTableDataItem, OrderPair } from './type';

export const getBidsOrderBookTableData = (orders: Order[]) => {
  return calculateOrderBookTableData(orders, SORT_ORDER.ASC);
};

export const getAsksOrderBookTableData = (orders: Order[]) => {
  return calculateOrderBookTableData(orders, SORT_ORDER.DESC);
};

const calculateOrderBookTableData = (
  orders: Order[],
  direction: SortOrder,
) => {
  const result: OrderBookTableDataItem[] = [];
  let accumulatedSize = 0;

  const ordersToProcess =
    direction === SORT_ORDER.DESC ? [...orders].reverse() : orders;

  for (const order of ordersToProcess) {
    const { size, ...rest } = order;
    accumulatedSize += size;

    const item = {
      ...rest,
      size,
      total: accumulatedSize,
    };

    if (direction === SORT_ORDER.DESC) {
      result.unshift(item);
    } else {
      result.push(item);
    }
  }

  return {
    data: result,
    totalSize: accumulatedSize,
  };
};

export const createOrder = ([price, size]: OrderPair): Order => {
  return {
    price: Number(price) || 0,
    size: Number(size) || 0,
    prevSize: 0,
  };
};

export const processOrderUpdates = (
  currentMap: Map<string, Order>,
  pairs: OrderPair[],
): { updatedMap: Map<string, Order>; totalDiff: number } => {
  const updatedMap = new Map(currentMap);
  let totalDiff = 0;

  for (const [price, size] of pairs) {
    const newOrder = createOrder([price, size]);

    if (!updatedMap.has(price)) {
      if (newOrder.size === 0) continue;

      totalDiff += newOrder.size;
      updatedMap.set(price, newOrder);
      continue;
    }

    const oldOrder = updatedMap.get(price)!;

    if (newOrder.size === 0) {
      totalDiff -= oldOrder.size;
      updatedMap.delete(price);
      continue;
    }

    // update current order
    totalDiff += newOrder.size - oldOrder.size;
    updatedMap.set(price, { ...newOrder, prevSize: oldOrder.size });
  }

  return { updatedMap, totalDiff };
};
