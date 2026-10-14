import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-neutral-200 rounded-[16px] shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card };
