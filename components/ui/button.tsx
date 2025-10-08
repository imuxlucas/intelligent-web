import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap h-9 rounded-8',
  {
    variants: {
      variant: {
        fill: 'px-12 py-7 gap-4 bg-fill-default hover:bg-fill-hover active:bg-fill-active disabled:bg-fill-disabled',
        line: 'px-12 py-7 gap-4 hover:bg-ghost-hover active:bg-ghost-active shadow-default',
        ghost: 'px-12 py-7 gap-4 hover:bg-ghost-hover active:bg-ghost-active',
        icon: 'size-9 px-10 py-10 hover:bg-ghost-hover active:bg-ghost-active',
        text: 'hover:text-fg-secondary active:text-fg-tertiary',
      },
    },
    defaultVariants: {
      variant: 'fill',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
