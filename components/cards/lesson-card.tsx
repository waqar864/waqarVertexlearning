import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface LessonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  module: string;
  href?: string;
}

const LessonCard = React.forwardRef<HTMLDivElement, LessonCardProps>(
  ({ title, description, module, href, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('p-5 space-y-3', className)} {...props}>
        <Badge variant="lesson">LESSON</Badge>

        <div className="space-y-1">
          <h3 className="text-heading-3 text-neutral-900">{title}</h3>
          <p className="text-body text-neutral-500">{description}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-small text-neutral-500">{module}</span>
          <a
            href={href}
            className="inline-flex items-center gap-1 text-small text-primary-500 hover:underline"
          >
            View lesson
            <ExternalLink size={14} />
          </a>
        </div>
      </Card>
    );
  }
);
LessonCard.displayName = 'LessonCard';

export { LessonCard };
