import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center focus:outline-none',
  {
    variants: {
      variant: {
        // 展示标签
        display: 'px-8 h-24 rounded-4 !text-12 text-fg-secondary bg-bg-secondary',
        // 操作标签 - 未选中状态
        'action-unselected': 'px-10 h-30 rounded-6 cursor-pointer !text-12 text-fg-secondary hover:bg-ghost-hover active:bg-ghost-active',
        // 操作标签 - 已选中状态
        'action-selected': 'px-10 h-30 rounded-6 cursor-pointer !text-12 text-fg-secondary bg-fill-default hover:bg-fill-hover active:bg-fill-active',
      },
    },
    defaultVariants: {
      variant: 'display',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
