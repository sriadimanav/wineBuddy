'use client'

import * as React from 'react'
import { Accordion } from 'radix-ui'
import { ChevronDown } from 'lucide-react'

import { cn } from './utils'

function AccordionRoot({
  ...props
}: React.ComponentProps<typeof Accordion.Root>) {
  return <Accordion.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Item>) {
  return (
    <Accordion.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Accordion.Trigger>) {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </Accordion.Trigger>
    </Accordion.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Accordion.Content>) {
  return (
    <Accordion.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </Accordion.Content>
  )
}

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent }
