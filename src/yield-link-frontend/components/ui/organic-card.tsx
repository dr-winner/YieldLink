import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OrganicCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "subtle"
}

export function OrganicCard({ title, description, children, className, variant = "default" }: OrganicCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg border-border/50",
        variant === "elevated" && "shadow-md hover:shadow-xl",
        variant === "subtle" && "bg-muted/30 border-muted",
        className,
      )}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="font-heading text-balance">{title}</CardTitle>}
          {description && <CardDescription className="text-pretty">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
