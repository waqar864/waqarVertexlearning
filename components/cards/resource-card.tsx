import * as React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface ResourceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  type: string;
  size?: string;
  href?: string;
}

const ResourceCard = React.forwardRef<HTMLDivElement, ResourceCardProps>(
  ({ title, description, type, size, href, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('p-5', className)} {...props}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={20} className="text-neutral-500" />
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="text-heading-3 text-neutral-900">{title}</h3>
            <p className="text-body text-neutral-500">{description}</p>
            <div className="flex items-center gap-2 text-small text-neutral-400 pt-1">
              <span className="uppercase">{type}</span>
              {size && (
                <>
                  <span>·</span>
                  <span>{size}</span>
                </>
              )}
            </div>
          </div>

          <a
            href={href}
            className="flex-shrink-0 text-primary-500 hover:text-primary-600"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </Card>
    );
  }
);
ResourceCard.displayName = 'ResourceCard';

export { ResourceCard };
