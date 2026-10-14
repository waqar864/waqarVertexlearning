import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn('', className)} {...props}>
        <ol className="flex items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-sm text-neutral-500 hover:text-primary-500 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      'text-sm',
                      isLast ? 'text-neutral-500 font-medium' : 'text-neutral-500'
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <ChevronRight size={16} className="text-neutral-400" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };
