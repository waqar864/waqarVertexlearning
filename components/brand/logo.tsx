import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  showWordmark?: boolean;
}

export function Logo({ size = 32, showWordmark = true, className, ...props }: LogoProps) {
  if (!showWordmark) {
    // Just the mark (downward triangle with notched V)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('', className)}
        {...props}
      >
        <path
          d="M16 2L30 28H2L16 2Z"
          fill="#F97316"
        />
        <path
          d="M16 8L10 20H22L16 8Z"
          fill="white"
        />
      </svg>
    );
  }

  // Mark + wordmark
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M16 2L30 28H2L16 2Z"
          fill="#F97316"
        />
        <path
          d="M16 8L10 20H22L16 8Z"
          fill="white"
        />
      </svg>
      <span className="font-sans text-xl font-semibold text-neutral-900">
        Vertex
      </span>
    </div>
  );
}
