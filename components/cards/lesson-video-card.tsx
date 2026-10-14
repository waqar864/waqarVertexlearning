import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface LessonVideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  lesson: string;
  timestamp: string;
  href?: string;
}

const LessonVideoCard = React.forwardRef<HTMLDivElement, LessonVideoCardProps>(
  ({ title, description, lesson, timestamp, href, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('p-5 space-y-3', className)} {...props}>
        <Badge variant="video">VIDEO</Badge>

        <div className="space-y-1">
          <h3 className="text-heading-3 text-neutral-900">{title}</h3>
          <p className="text-body text-neutral-500">{description}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-small text-neutral-500">{lesson}</span>
          <a
            href={href}
            className="inline-flex items-center gap-1 text-small text-primary-500 hover:underline"
          >
            Watch from {timestamp}
            <ExternalLink size={14} />
          </a>
        </div>
      </Card>
    );
  }
);
LessonVideoCard.displayName = 'LessonVideoCard';

export { LessonVideoCard };
