'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            'flex h-[44px] w-full appearance-none rounded-[12px] border border-[#E2E8F0] bg-white px-4 pr-10 text-sm text-neutral-900',
            'focus-visible:outline-none focus-visible:border-[#FB923C] transition-colors',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        >
          {children || options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" size={20} />
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
