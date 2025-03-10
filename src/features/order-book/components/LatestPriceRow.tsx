import ArrowIcon from '@/components/Arrow';
import { TableCell, TableRow } from '@/components/Table';
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
        text: 'text-bid',
      };
    }

    return {
      bg: 'bg-price-down',
      text: 'text-ask',
    };
  };

  const { bg, text } = getColorClass();

  return (
    <TableRow className={cn('w-full p-0.5', bg)}>
      <TableCell className={cn('gap-2 text-center', text)} colSpan={3}>
        <div className="flex w-full items-center justify-center gap-2">
          <span className="text-2xl font-bold leading-normal">
            {priceFormatter(record.current)}
          </span>
          {record.current !== record.previous && (
            <ArrowIcon
              direction={record.current > record.previous ? 'up' : 'down'}
              size={16}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LatestPriceRow;
