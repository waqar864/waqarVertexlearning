import * as React from 'react';
import { Clock, FileText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  level?: string;
  duration?: string;
  modules?: number;
  imageUrl?: string;
  isPopular?: boolean;
  href?: string;
}

const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
  ({ title, description, level, duration, modules, imageUrl, isPopular, href, className, ...props }, ref) => {
    const Wrapper = href ? 'a' : 'div';

    return (
      <Card ref={ref} className={cn('overflow-hidden p-5', className)} {...props}>
        <Wrapper href={href} className={href ? 'block' : ''}>
          {/* Logo tile */}
          <div className="w-16 h-16 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-heading-3 text-neutral-900">{title}</h3>
              <p className="text-body text-neutral-500">{description}</p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-small text-neutral-500">
              {level && (
                <span className="flex items-center gap-1">
                  <FileText size={16} />
                  {level}
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {duration}
                </span>
              )}
              {modules !== undefined && (
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {modules} modules
                </span>
              )}
            </div>
          </div>
        </Wrapper>
      </Card>
    );
  }
);
CourseCard.displayName = 'CourseCard';

export { CourseCard };
