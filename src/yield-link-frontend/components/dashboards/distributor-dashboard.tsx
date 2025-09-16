"use client"

import { motion } from "framer-motion"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Package, 
  Eye, 
  Thermometer, 
  ArrowRight, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Users
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

export function DistributorDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, Distributor!</h1>
            <p className="text-muted-foreground">Manage your logistics and ensure quality transport</p>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            <Truck className="w-4 h-4 mr-2" />
            Accra Fresh Logistics
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
            <div className="text-2xl font-bold text-blue-600">18</div>
            <div className="text-sm text-muted-foreground">Active Deliveries</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">₵8,750</div>
            <div className="text-sm text-muted-foreground">This Month's Earnings</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <div className="text-sm text-muted-foreground">Packages Handled</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">99.2%</div>
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
          <OrganicCard title="Verify Handoff" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Confirm receipt of produce from farmers and verify quality standards.
                </p>
              </div>
              <AnimatedButton asChild className="w-full">
                <Link href="/handoff-verification" className="flex items-center gap-2">
                  Verify Handoff
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>
          </OrganicCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <OrganicCard title="Track Deliveries" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Monitor your delivery routes and track package conditions in real-time.
                </p>
              </div>
              <AnimatedButton variant="secondary" asChild className="w-full">
                <Link href="/delivery-tracking" className="flex items-center gap-2">
                  Track Deliveries
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>
          </OrganicCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <OrganicCard title="Temperature Logs" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-accent" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Record and monitor temperature conditions during transport.
                </p>
              </div>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/temperature-logs" className="flex items-center gap-2">
                  View Logs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </OrganicCard>
        </motion.div>
      </motion.div>

      {/* Current Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <OrganicCard title="Current Deliveries" variant="elevated" className="p-6">
          <div className="space-y-4">
            {[
              {
                id: "DEL-001",
                from: "Kumasi Organic Farms",
                to: "Tamale Market Hub",
                status: "in-transit",
                temperature: "4°C",
                eta: "2 hours",
                icon: Truck,
                color: "text-blue-600"
              },
              {
                id: "DEL-002", 
                from: "Green Valley Farm",
                to: "Accra Central Market",
                status: "delivered",
                temperature: "6°C",
                eta: "Delivered",
                icon: CheckCircle,
                color: "text-green-600"
              },
              {
                id: "DEL-003",
                from: "Northern Farms Co.",
                to: "Kumasi Fresh Market",
                status: "pending",
                temperature: "2°C",
                eta: "4 hours",
                icon: Clock,
                color: "text-orange-600"
              },
            ].map((delivery, index) => (
              <motion.div
                key={delivery.id}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <delivery.icon className={`w-5 h-5 ${delivery.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Delivery {delivery.id}</h4>
                    <Badge variant={delivery.status === "delivered" ? "default" : "secondary"}>
                      {delivery.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {delivery.from} → {delivery.to}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer className="w-4 h-4" />
                    <span>{delivery.temperature}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{delivery.eta}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <AnimatedButton variant="outline" asChild>
              <Link href="/deliveries" className="flex items-center gap-2">
                View All Deliveries
                <Package className="w-4 h-4" />
              </Link>
            </AnimatedButton>
          </div>
        </OrganicCard>
      </motion.div>
    </div>
  )
}
