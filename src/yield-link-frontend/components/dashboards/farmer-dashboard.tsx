"use client"

import { motion } from "framer-motion"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Sprout, 
  DollarSign, 
  Eye, 
  FileText, 
  ArrowRight, 
  TrendingUp, 
  Truck, 
  QrCode,
  Users,
  Calendar,
  MapPin
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
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

export function FarmerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, Farmer!</h1>
            <p className="text-muted-foreground">Manage your crops and track your earnings</p>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            <Sprout className="w-4 h-4 mr-2" />
            Kumasi Organic Farms
          </Badge>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">₵12,450</div>
            <div className="text-sm text-muted-foreground">This Month's Earnings</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-muted-foreground">Active Crops</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-muted-foreground">Total Tokens</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">98%</div>
            <div className="text-sm text-muted-foreground">Quality Score</div>
          </OrganicCard>
        </motion.div>
      </motion.div>

      {/* Main Actions */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <OrganicCard title="Create Produce Token" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Register your crops and generate QR codes for tracking from farm to table.
                </p>
              </div>
              <AnimatedButton asChild className="w-full">
                <Link href="/token-creation/" className="flex items-center gap-2">
                  Create Token
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>
          </OrganicCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <OrganicCard title="Track Your Crops" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Monitor your produce journey through the supply chain in real-time.
                </p>
              </div>
              <AnimatedButton variant="secondary" asChild className="w-full">
                <Link href="/tracking/" className="flex items-center gap-2">
                  Track Produce
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>
          </OrganicCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <OrganicCard title="Payment Agreements" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Set up fair payment distribution for all stakeholders in your supply chain.
                </p>
              </div>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/smart-contracts/" className="flex items-center gap-2">
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
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <OrganicCard title="Recent Activity" variant="elevated" className="p-6">
          <div className="space-y-4">
            {[
              {
                icon: QrCode,
                title: "New Token Created",
                description: "Tomatoes - 50kg batch registered",
                time: "2 hours ago",
                status: "success",
              },
              {
                icon: Truck,
                title: "Handoff Verified",
                description: "Accra Fresh Logistics confirmed receipt of produce",
                time: "1 day ago",
                status: "success",
              },
              {
                icon: DollarSign,
                title: "Payment Received",
                description: "₵2,450 for corn harvest",
                time: "3 days ago",
                status: "success",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <AnimatedButton variant="outline" asChild>
              <Link href="/payments/" className="flex items-center gap-2">
                View All Payments
                <DollarSign className="w-4 h-4" />
              </Link>
            </AnimatedButton>
          </div>
        </OrganicCard>
      </motion.div>
    </div>
  )
}
