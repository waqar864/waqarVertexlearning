import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, max = 100, showLabel = true, className, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn('w-full space-y-2', className)} {...props}>
        <div
          className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <p className="text-small text-neutral-500">
            {Math.round(percentage)}% complete
          </p>
        )}
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
