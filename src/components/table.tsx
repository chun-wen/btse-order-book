import { cn } from '@/utils/cn'
import * as React from 'react'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn(
      'w-full max-w-full table-fixed caption-top border-separate border-spacing-0 bg-primary text-default',
      className,
    )}
    {...props}
  />
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('text-table-head', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('', className)} {...props} />
))
TableBody.displayName = 'TableBody'

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: 'buy' | 'sell' | 'default'
  highlight?: 'increase' | 'decrease' | 'new-buy' | 'new-sell' | null
}

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(({ className, variant = 'default', highlight = null, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-row-hover',
      // 新增買入/賣出報價時的整行高亮效果
      highlight === 'new-buy' && 'animate-flash-green',
      highlight === 'new-sell' && 'animate-flash-red',
      variant === 'buy' && 'hover:bg-opacity-90',
      variant === 'sell' && 'hover:bg-opacity-90',
      className,
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn('text-table-head h-10 px-4 text-left align-middle font-normal', className)}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  variant?: 'buy' | 'sell' | 'default'
  highlight?: 'increase' | 'decrease' | null
}

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(({ className, variant = 'default', highlight = null, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-4 py-2 align-middle',
      // 不同類型的單元格樣式
      variant === 'buy' && 'text-buy',
      variant === 'sell' && 'text-sell',
      // 數量變更的高亮動畫
      highlight === 'increase' && 'animate-flash-green',
      highlight === 'decrease' && 'animate-flash-red',
      className,
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 bg-primary px-4 text-default', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

// 價格單元格
interface TablePriceCellProps extends TableCellProps {
  currentPrice: number | string
  previousPrice?: number | string
}

const TablePriceCell = React.forwardRef<
  HTMLTableCellElement,
  TablePriceCellProps
>(({ className, currentPrice, previousPrice, variant = 'default', ...props }, ref) => {
  // 價格比較邏輯
  const priceComparison = React.useMemo(() => {
    if (previousPrice === undefined) return 'same'
    const current = typeof currentPrice === 'string' ? parseFloat(currentPrice) : currentPrice
    const previous = typeof previousPrice === 'string' ? parseFloat(previousPrice) : previousPrice
    
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'same'
  }, [currentPrice, previousPrice])

  return (
    <td
      ref={ref}
      className={cn(
        'px-4 py-2 align-middle',
        // 根據價格變化設置樣式
        priceComparison === 'up' && 'text-buy bg-price-up',
        priceComparison === 'down' && 'text-sell bg-price-down',
        priceComparison === 'same' && 'text-default bg-price-same',
        // 買入/賣出報價的基本樣式
        variant === 'buy' && 'text-buy',
        variant === 'sell' && 'text-sell',
        className,
      )}
      {...props}
    />
  )
})
TablePriceCell.displayName = 'TablePriceCell'

// 累計總量條單元格
interface TableTotalBarCellProps extends TableCellProps {
  percentage: number
  side: 'buy' | 'sell'
}

const TableTotalBarCell = React.forwardRef<
  HTMLTableCellElement,
  TableTotalBarCellProps
>(({ className, percentage, side, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-4 py-2 align-middle relative',
      className,
    )}
    {...props}
  >
    <div 
      className={cn(
        'absolute top-0 bottom-0 h-full z-0',
        side === 'buy' ? 'right-0 bg-bar-buy' : 'left-0 bg-bar-sell'
      )} 
      style={{ width: `${percentage * 100}%` }}
    />
    <span className="relative z-10">{props.children}</span>
  </td>
))
TableTotalBarCell.displayName = 'TableTotalBarCell'

export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TablePriceCell,
    TableRow,
    TableTotalBarCell
};

