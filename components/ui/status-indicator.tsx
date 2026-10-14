import * as React from 'react';
import { Loader2, CheckCircle2, Play, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusType = 'in-progress' | 'completed' | 'now-playing' | 'locked';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
  label?: string;
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ status, label, className, ...props }, ref) => {
    const renderIcon = () => {
      switch (status) {
        case 'in-progress':
          return <Loader2 size={20} className="text-primary-500 animate-spin" />;
        case 'completed':
          return <CheckCircle2 size={20} className="text-[#16A34A]" fill="currentColor" />;
        case 'now-playing':
          return <Play size={20} className="text-primary-500" fill="currentColor" />;
        case 'locked':
          return <Lock size={20} className="text-neutral-500" />;
      }
    };

    const getLabel = () => {
      if (label) return label;
      switch (status) {
        case 'in-progress':
          return 'In Progress';
        case 'completed':
          return 'Completed';
        case 'now-playing':
          return 'Now Playing';
        case 'locked':
          return 'Locked';
      }
    };

    return (
      <div ref={ref} className={cn('inline-flex items-center gap-2', className)} {...props}>
        {renderIcon()}
        {label !== undefined && <span className="text-sm font-medium">{getLabel()}</span>}
      </div>
    );
  }
);
StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator };
