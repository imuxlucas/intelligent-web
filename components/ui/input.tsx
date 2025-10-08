import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex h-36 w-full rounded-8 hover:bg-ghost-hover active:bg-ghost-active placeholder:text-fg-tertiary focus-visible:outline-none',
  {
    variants: {
      variant: {
        desktopSearch: 'pl-32 pr-12 focus:bg-ghost-hover',
        mobileSearch: 'pl-32 pr-12 shadow-default focus:shadow-focus',
        input: 'px-12 shadow-default focus:shadow-focus',
      },
    },
    defaultVariants: {
      variant: 'input',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
