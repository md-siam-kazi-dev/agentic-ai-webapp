import { cn } from "@/lib/utils"
import * as React from "react"

export function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />
}

export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

export function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
}

export function FieldSeparator({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className="flex-1 h-px bg-border" />
      {children && (
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground data-[slot=field-separator-content]">
          {children}
        </span>
      )}
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
