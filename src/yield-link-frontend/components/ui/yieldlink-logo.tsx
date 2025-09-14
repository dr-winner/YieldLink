"use client"

import { motion } from "framer-motion"
import { Sprout, Link } from "lucide-react"

interface YieldLinkLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function YieldLinkLogo({ size = "md", showText = true, className = "" }: YieldLinkLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div
        className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center relative overflow-hidden`}
      >
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />

        {/* Main sprout icon */}
        <Sprout
          className={`${size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-7 h-7"} text-primary-foreground relative z-10`}
        />

        {/* Small link icon overlay */}
        <Link
          className={`${size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"} text-primary-foreground/80 absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5`}
        />
      </div>

      {showText && <span className={`font-heading font-bold ${textSizeClasses[size]} text-foreground`}>YieldLink</span>}
    </motion.div>
  )
}
