import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/logo';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  activeItem?: string;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ activeItem, className, ...props }, ref) => {
    const navItems = [
      { label: 'Courses', href: '/courses' },
      { label: 'My Learning', href: '/my-learning' },
    ];

    return (
      <nav
        ref={ref}
        className={cn('flex items-center justify-between px-6 py-4 border-b border-neutral-200', className)}
        {...props}
      >
        <Logo size={32} showWordmark />

        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-primary-500' : 'text-neutral-900 hover:text-primary-500'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }
);
Navbar.displayName = 'Navbar';

export { Navbar };
