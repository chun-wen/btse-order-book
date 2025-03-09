'use client   '

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { priceFormatter } from '@/utils/priceFormatter';
import { OrderPair } from '../type';

type Props = {
  asks: OrderPair[];
  bids: OrderPair[];
}


export default function OrderBookTable({
  asks,
  bids
}: Props) {
  return (
    <Table>
      <TableCaption>Order Book</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Price(USD)</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
        {asks.map((ask) => (
          <TableRow key={ask[0]}>
            <TableCell>{priceFormatter(ask[0])}</TableCell>
            <TableCell>{priceFormatter(ask[1])}</TableCell>
            <TableCell>{priceFormatter(ask[0])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
      <TableBody>
        {bids.map((bid) => (
          <TableRow key={bid[0]}>
            <TableCell>{priceFormatter(bid[0])}</TableCell>
            <TableCell>{priceFormatter(bid[1])}</TableCell>
            <TableCell>{priceFormatter(bid[0])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>  
  )
}
