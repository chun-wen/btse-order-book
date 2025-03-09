import ArrowIcon from '@/components/Arrow';
import { PriceRecord } from '@/features/trade/type';
import { cn } from '@/utils/cn';
import { priceFormatter } from '@/utils/priceFormatter';

const LatestPriceRow = ({ record }: { record: PriceRecord }) => {
  const getColorClass = () => {
    if (record.current === record.previous) {
      return {
        bg: 'bg-price-same',
        text: 'text-default',
      };
    }

    if (record.current > record.previous) {
      return {
        bg: 'bg-price-up',
        text: 'text-buy',
      };
    }

    return {
      bg: 'bg-price-down',
      text: 'text-sell',
    };
  };

  const { bg, text } = getColorClass();

  return (
    <div className={cn('w-full p-0.5', bg)}>
      <div className={cn('text-center', text)}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="text-2xl font-bold leading-normal">
            {priceFormatter(record.current)}
          </span>
          {record.current === record.previous ? null : (
            <div className="flex items-center justify-center">
              <ArrowIcon
                direction={record.current > record.previous ? 'up' : 'down'}
                size={16}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestPriceRow;
