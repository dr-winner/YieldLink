"use client"

import { motion } from "framer-motion"
import { YieldLinkLogo } from "@/components/ui/yieldlink-logo"
import { AuthOptions } from "@/components/auth/auth-options"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <YieldLinkLogo size="lg" className="justify-center mb-4" />
          <h1 className="text-2xl font-heading font-bold mb-2">Welcome to YieldLink</h1>
          <p className="text-muted-foreground">Join a fair, transparent supply chain for all stakeholders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AuthOptions />
        </motion.div>
      </div>
    </div>
  )
}
