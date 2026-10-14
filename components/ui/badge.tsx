import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'video' | 'lesson' | 'popular';

const variantStyles: Record<BadgeVariant, string> = {
  video: 'bg-primary-100 text-primary-500',
  lesson: 'bg-[#EEF0FE] text-[#4F46E5]',
  popular: 'bg-primary-100 text-primary-500 font-semibold',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: BadgeVariant;
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-2 h-6 rounded-[6px] text-xs uppercase tracking-wide',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
