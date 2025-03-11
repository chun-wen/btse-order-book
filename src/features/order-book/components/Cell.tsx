import { TRADE_TYPE, TradeType } from '@/constant';
import { cn } from '@/utils/cn';
import { priceFormatter } from '@/utils/priceFormatter';

import { OrderBookTableDataItem } from '../type';

type TotalCellProps = {
  order: OrderBookTableDataItem;
  totalSize: number;
  type: TradeType;
};

export const TotalCell = ({ order, totalSize, type }: TotalCellProps) => {
  const percentage = order.total / totalSize;

  return (
    <div className="relative z-0 w-full overflow-hidden">
      {priceFormatter(order.total)}
      <div
        className={cn(
          'absolute bottom-0 right-0 z-[-1] h-full w-full',
          type === TRADE_TYPE.ASK ? 'bg-bar-sell' : 'bg-bar-buy',
        )}
        style={{ transform: `translateX(${(1 - percentage) * 100}%)` }}
      />
    </div>
  );
};

type SizeCellProps = {
  order: OrderBookTableDataItem;
  type: TradeType;
};

export const SizeCell = ({ order, type }: SizeCellProps) => {
  const getBackgroundClass = (): string => {
    if (!order.prevSize || order.prevSize === order.size) return '';

    if (order.size > order.prevSize) {
      return type === TRADE_TYPE.ASK ? 'bg-flash-green' : 'bg-flash-red';
    }

    return type === TRADE_TYPE.ASK ? 'bg-flash-red' : 'bg-flash-green';
  };

  return (
    <div className={cn('w-full', getBackgroundClass())}>
      {priceFormatter(order.size)}
    </div>
  );
};
