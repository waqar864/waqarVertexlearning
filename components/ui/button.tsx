import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
type ButtonSize = 'lg' | 'md';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100 disabled:text-primary-300',
  secondary: 'border border-primary-500 text-primary-500 bg-white hover:bg-primary-100 disabled:border-primary-200 disabled:text-primary-300',
  tertiary: 'bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50 disabled:border-neutral-100 disabled:text-neutral-400',
  text: 'text-primary-500 hover:underline disabled:text-primary-300 disabled:no-underline',
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'px-4',
  md: 'px-3',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 h-[44px] rounded-[12px] font-medium text-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          variant !== 'text' && sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
