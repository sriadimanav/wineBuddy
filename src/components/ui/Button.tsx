import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../utils/utils';
import { buttonVariants } from './variants';

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp: React.ElementType = asChild ? Slot : 'button'; // <--- Type here

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
