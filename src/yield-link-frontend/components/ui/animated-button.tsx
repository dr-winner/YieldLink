"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { forwardRef } from "react"

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode
  className?: string
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            "hover:shadow-lg active:shadow-md",
            className,
          )}
          {...props}
        >
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {children}
          </motion.span>
        </Button>
      </motion.div>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"
