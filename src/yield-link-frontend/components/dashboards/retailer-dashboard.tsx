"use client"

import { motion } from "framer-motion"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Store, 
  ShoppingCart, 
  Eye, 
  Users, 
  ArrowRight, 
  TrendingUp,
  Package,
  Star,
  DollarSign,
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

export function RetailerDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, Retailer!</h1>
            <p className="text-muted-foreground">Manage your store and track customer satisfaction</p>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            <Store className="w-4 h-4 mr-2" />
            Tamale Market Hub
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
            <div className="text-2xl font-bold text-purple-600">₵15,680</div>
            <div className="text-sm text-muted-foreground">Today's Sales</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">342</div>
            <div className="text-sm text-muted-foreground">Products Sold</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-sm text-muted-foreground">Customer Rating</div>
          </OrganicCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <OrganicCard className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">89</div>
            <div className="text-sm text-muted-foreground">Active Products</div>
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
          <OrganicCard title="Verify Receipt" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Confirm receipt of produce from distributors and verify quality.
                </p>
              </div>
              <AnimatedButton asChild className="w-full">
                <Link href="/receipt-verification" className="flex items-center gap-2">
                  Verify Receipt
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>
          </OrganicCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <OrganicCard title="Track Inventory" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-muted-foreground mb-6">
                  Monitor your inventory levels and track product freshness.
                </p>
              </div>
              <AnimatedButton variant="secondary" asChild className="w-full">
                <Link href="/inventory" className="flex items-center gap-2">
                  Track Inventory
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedButton>
            </div>
          </OrganicCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <OrganicCard title="Customer Reviews" variant="elevated" className="p-6 h-full">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <p className="text-muted-foreground mb-6">
                  View customer feedback and ratings for your products.
                </p>
              </div>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/reviews" className="flex items-center gap-2">
                  View Reviews
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </OrganicCard>
        </motion.div>
      </motion.div>

      {/* Recent Sales */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <OrganicCard title="Recent Sales" variant="elevated" className="p-6">
          <div className="space-y-4">
            {[
              {
                product: "Organic Tomatoes",
                quantity: "5kg",
                price: "₵45.00",
                customer: "Ama Osei",
                time: "2 hours ago",
                rating: 5,
                icon: ShoppingCart,
                color: "text-green-600"
              },
              {
                product: "Fresh Corn",
                quantity: "3kg", 
                price: "₵30.00",
                customer: "Kwame Asante",
                time: "4 hours ago",
                rating: 4,
                icon: ShoppingCart,
                color: "text-blue-600"
              },
              {
                product: "Plantain",
                quantity: "2kg",
                price: "₵25.00", 
                customer: "Akosua Mensah",
                time: "6 hours ago",
                rating: 5,
                icon: ShoppingCart,
                color: "text-purple-600"
              },
            ].map((sale, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <sale.icon className={`w-5 h-5 ${sale.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{sale.product}</h4>
                    <Badge variant="outline">{sale.quantity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sold to {sale.customer}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold">{sale.price}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < sale.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{sale.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <AnimatedButton variant="outline" asChild>
              <Link href="/sales" className="flex items-center gap-2">
                View All Sales
                <TrendingUp className="w-4 h-4" />
              </Link>
            </AnimatedButton>
          </div>
        </OrganicCard>
      </motion.div>
    </div>
  )
}
