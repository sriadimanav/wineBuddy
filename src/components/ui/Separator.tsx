'use client'

import { Separator } from 'radix-ui'
import * as React from 'react'

import { cn } from '../utils/utils'

function SeparatorComp({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof Separator.Root>) {
  return (
    <Separator.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}

export { SeparatorComp }
