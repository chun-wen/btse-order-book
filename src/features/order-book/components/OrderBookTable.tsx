'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { CELL_TYPE } from '@/constant';
import { PriceRecord } from '@/features/trade/type';
import { priceFormatter } from '@/utils/priceFormatter';

import { OrderBookTableData } from '../type';
import { SizeCell, TotalCell } from './Cell';
import LatestPriceRow from './LatestPriceRow';

type Props = {
  asks: OrderBookTableData;
  bids: OrderBookTableData;
  priceRecord: PriceRecord;
};

export default function OrderBookTable({ asks, bids, priceRecord }: Props) {
  return (
    <Table className='w-[300px]'>
      <TableCaption className='text-left'>Order Book</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[30%]'>Price(USD)</TableHead>
          <TableHead className='w-[30%]'>Size</TableHead>
          <TableHead className='w-[40%]'>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {asks.data.map((data, index) => (
          <TableRow key={`${data.price}-${index}`}>
            <TableCell className="text-sell w-[30%] text-right">
              {priceFormatter(data.price)}
            </TableCell>
            <TableCell className="w-[30%] text-right">
              <SizeCell order={data} />
            </TableCell>
            <TableCell className="w-[40%] text-right">
              <TotalCell order={data} totalSize={asks.totalSize} type={CELL_TYPE.ASK} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableBody>
        <LatestPriceRow record={priceRecord} />
      </TableBody>
      <TableBody>
        {bids.data.map((data, index) => (
          <TableRow key={`${data.price}-${index}`}>
            <TableCell className="text-buy w-[30%] text-right">
              {priceFormatter(data.price)}
            </TableCell>
            <TableCell className="w-[30%] text-right">
              <SizeCell order={data} />
            </TableCell>
            <TableCell className="w-[40%] text-right">
              <TotalCell order={data} totalSize={bids.totalSize} type={CELL_TYPE.BID} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
