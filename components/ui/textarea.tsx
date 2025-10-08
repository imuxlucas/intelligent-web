import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex h-36 w-full rounded-8 px-12 py-7 placeholder:text-fg-tertiary hover:bg-ghost-hover active:bg-ghost-active focus-visible:outline-none',
        'shadow-default focus:shadow-focus',
        'resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea';

export { Textarea };
