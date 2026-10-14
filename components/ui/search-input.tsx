'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
        <input
          ref={ref}
          type="search"
          className={cn(
            'flex h-[44px] w-full rounded-[12px] border border-[#E2E8F0] bg-white pl-11 pr-16 text-sm text-neutral-900 placeholder:text-neutral-400',
            'focus-visible:outline-none focus-visible:border-[#FB923C] transition-colors',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 font-mono text-xs text-neutral-500">
          ⌘K
        </kbd>
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
