import { useEffect, useRef, useState } from 'react';

import { OrderBookTableDataItem } from '../type';

export const useNewOrderSet = (data: OrderBookTableDataItem[]) => {
  const [recentlyAddedPrices, setRecentlyAddedPrices] = useState(
    new Set<number>(),
  );
  const historicalPrices = useRef(new Set<number>());

  useEffect(() => {
    const currentPrices = data.map(entry => entry.price);

    if (historicalPrices.current.size === 0) {
      historicalPrices.current = new Set(currentPrices);
      return;
    }

    const newlyAddedPrices = currentPrices.filter(
      price => !historicalPrices.current.has(price),
    );

    setRecentlyAddedPrices(new Set(newlyAddedPrices));
    historicalPrices.current = new Set([
      ...historicalPrices.current,
      ...newlyAddedPrices,
    ]);
  }, [data]);

  return recentlyAddedPrices;
};
