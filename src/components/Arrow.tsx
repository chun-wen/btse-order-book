import React from 'react';

import type { Direction } from '@/constant';
import { DIRECTIONS } from '@/constant';
import { cn } from '@/utils/cn';

type ArrowIconProps = {
  color?: string;
  size?: number;
  direction?: Direction;
};

const ArrowIcon: React.FC<ArrowIconProps> = ({
  color = 'currentColor',
  size = 24,
  direction = DIRECTIONS.DOWN,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="label"
      fill="none"
      fillRule="nonzero"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'transition-transform',
        direction === DIRECTIONS.UP ? 'rotate-180' : 'rotate-0',
      )}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
};

export default ArrowIcon;
