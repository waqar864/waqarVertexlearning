import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, className, ...props }, ref) => {
    const getPageNumbers = () => {
      const pages: (number | 'ellipsis')[] = [];

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        if (currentPage > 3) {
          pages.push('ellipsis');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (currentPage < totalPages - 2) {
          pages.push('ellipsis');
        }

        pages.push(totalPages);
      }

      return pages;
    };

    const pages = getPageNumbers();

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-neutral-500">
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={cn(
                  'w-10 h-10 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'border border-primary-500 text-primary-500'
                    : 'text-neutral-900 hover:bg-neutral-50'
                )}
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-neutral-500 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
