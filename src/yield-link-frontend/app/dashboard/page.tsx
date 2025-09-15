"use client"

import { motion } from "framer-motion"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Leaf,
  Plus,
  QrCode,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">YieldLink</span>
            </Link>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Users className="w-4 h-4 mr-2" />
                Green Valley Farm
              </Badge>
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Welcome to Your Dashboard</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Manage your agricultural supply chain with complete transparency and automated payments
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <OrganicCard variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">Active Tokens</h3>
                <p className="text-2xl font-bold text-green-600">12</p>
              </OrganicCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <OrganicCard variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    +15%
                  </Badge>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">Total Sales</h3>
                <p className="text-2xl font-bold text-blue-600">$15,750</p>
              </OrganicCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <OrganicCard variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Live
                  </Badge>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">Smart Contracts</h3>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </OrganicCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <OrganicCard variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Instant
                  </Badge>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">Avg. Payment</h3>
                <p className="text-2xl font-bold text-orange-600">&lt; 2 min</p>
              </OrganicCard>
            </motion.div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <OrganicCard title="Create New Token" variant="elevated" className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Digitize your produce and create blockchain tokens with QR codes for complete traceability.
                    </p>
                  </div>
                  <AnimatedButton asChild className="w-full">
                    <Link href="/token-creation" className="flex items-center gap-2">
                      Create Token
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </AnimatedButton>
                </div>
              </OrganicCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <OrganicCard title="Track Supply Chain" variant="elevated" className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Eye className="w-6 h-6 text-secondary" />
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Monitor your produce journey from farm to consumer with real-time tracking and verification.
                    </p>
                  </div>
                  <AnimatedButton variant="secondary" asChild className="w-full">
                    <Link href="/tracking" className="flex items-center gap-2">
                      Track Produce
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </AnimatedButton>
                </div>
              </OrganicCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <OrganicCard title="Smart Contracts" variant="elevated" className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Set up automated payment distribution and transparent contract terms for all stakeholders.
                    </p>
                  </div>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/smart-contracts" className="flex items-center gap-2">
                      Manage Contracts
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </OrganicCard>
            </motion.div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <OrganicCard title="Recent Activity" variant="elevated" className="p-8">
              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle,
                    title: "Payment Distributed",
                    description: "Cherry Tomatoes - $1,250 distributed to stakeholders",
                    time: "2 hours ago",
                    status: "success",
                  },
                  {
                    icon: QrCode,
                    title: "Token Created",
                    description: "Organic Lettuce - Token YL-LETTUCE-2024-002 generated",
                    time: "5 hours ago",
                    status: "info",
                  },
                  {
                    icon: Users,
                    title: "Handoff Verified",
                    description: "Fresh Logistics Co. confirmed receipt of produce",
                    time: "1 day ago",
                    status: "success",
                  },
                  {
                    icon: FileText,
                    title: "Smart Contract Deployed",
                    description: "New contract for Winter Harvest batch activated",
                    time: "2 days ago",
                    status: "info",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.status === "success" ? "bg-green-100" : "bg-blue-100"
                      }`}
                    >
                      {activity.icon && (
                        <activity.icon
                          className={`w-5 h-5 ${activity.status === "success" ? "text-green-600" : "text-blue-600"}`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <AnimatedButton variant="outline" asChild>
                  <Link href="/payments" className="flex items-center gap-2">
                    View Payment Dashboard
                    <DollarSign className="w-4 h-4" />
                  </Link>
                </AnimatedButton>
              </div>
            </OrganicCard>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
