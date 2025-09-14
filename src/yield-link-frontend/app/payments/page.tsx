"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { YieldLinkLogo } from "@/components/ui/yieldlink-logo"
import {
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowLeft,
  Zap,
  Eye,
  Download,
  Sparkles,
  Wallet,
  ArrowRight,
  Calendar,
} from "lucide-react"
import Link from "next/link"

interface PaymentEvent {
  id: string
  type: "sale" | "distribution" | "confirmation"
  amount: number
  recipient: string
  recipientRole: "farmer" | "distributor" | "retailer" | "platform"
  timestamp: string
  status: "pending" | "processing" | "completed"
  transactionHash?: string
}

interface PaymentSummary {
  totalSales: number
  totalDistributed: number
  pendingPayments: number
  completedTransactions: number
  averagePaymentTime: string
}

const mockPaymentEvents: PaymentEvent[] = [
  {
    id: "1",
    type: "sale",
    amount: 1250,
    recipient: "Final Consumer",
    recipientRole: "farmer",
    timestamp: "2024-01-17T15:30:00Z",
    status: "completed",
    transactionHash: "0xabc123...def789",
  },
  {
    id: "2",
    type: "distribution",
    amount: 750,
    recipient: "Green Valley Farm",
    recipientRole: "farmer",
    timestamp: "2024-01-17T15:31:00Z",
    status: "completed",
    transactionHash: "0xbcd234...efa890",
  },
  {
    id: "3",
    type: "distribution",
    amount: 312.5,
    recipient: "Fresh Logistics Co.",
    recipientRole: "distributor",
    timestamp: "2024-01-17T15:31:15Z",
    status: "completed",
    transactionHash: "0xcde345...fab901",
  },
  {
    id: "4",
    type: "distribution",
    amount: 150,
    recipient: "Organic Market Plus",
    recipientRole: "retailer",
    timestamp: "2024-01-17T15:31:30Z",
    status: "completed",
    transactionHash: "0xdef456...gbc012",
  },
  {
    id: "5",
    type: "distribution",
    amount: 37.5,
    recipient: "YieldLink Platform",
    recipientRole: "platform",
    timestamp: "2024-01-17T15:31:45Z",
    status: "completed",
    transactionHash: "0xefg567...hcd123",
  },
]

const mockSummary: PaymentSummary = {
  totalSales: 15750,
  totalDistributed: 15750,
  pendingPayments: 0,
  completedTransactions: 23,
  averagePaymentTime: "< 2 minutes",
}

const getRoleColor = (role: PaymentEvent["recipientRole"]) => {
  switch (role) {
    case "farmer":
      return "text-green-600 bg-green-100"
    case "distributor":
      return "text-blue-600 bg-blue-100"
    case "retailer":
      return "text-purple-600 bg-purple-100"
    case "platform":
      return "text-orange-600 bg-orange-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

const getStatusColor = (status: PaymentEvent["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-100"
    case "processing":
      return "text-yellow-600 bg-yellow-100"
    case "pending":
      return "text-gray-600 bg-gray-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

export default function PaymentsPage() {
  const [paymentEvents] = useState<PaymentEvent[]>(mockPaymentEvents)
  const [summary] = useState<PaymentSummary>(mockSummary)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    // Simulate payment flow animation
    const timer = setInterval(() => {
      setAnimationProgress((prev) => {
        if (prev >= 100) {
          setShowCelebration(true)
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <YieldLinkLogo />
            </Link>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <DollarSign className="w-4 h-4 mr-2" />
                Money Split
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <DollarSign className="w-10 h-10 text-primary" />
              {showCelebration && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-12 h-12 text-primary" />
                </motion.div>
              )}
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Money Split</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              See how your crop sales are automatically split fairly between everyone who helped get them to market
            </p>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OrganicCard variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  +12.5%
                </Badge>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">Total Earned</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalSales)}</p>
            </OrganicCard>

            <OrganicCard variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  100%
                </Badge>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">Money Sent</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary.totalDistributed)}</p>
            </OrganicCard>

            <OrganicCard variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">Payments Made</h3>
              <p className="text-2xl font-bold text-purple-600">{summary.completedTransactions}</p>
            </OrganicCard>

            <OrganicCard variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  Instant
                </Badge>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">Payment Speed</h3>
              <p className="text-2xl font-bold text-orange-600">{summary.averagePaymentTime}</p>
            </OrganicCard>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Flow Visualization */}
            <div className="lg:col-span-2">
              <OrganicCard title="Latest Sale & Payments" variant="elevated" className="p-8">
                <div className="space-y-6">
                  {/* Flow Animation */}
                  <div className="relative">
                    <div className="text-center mb-8">
                      <motion.div
                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ scale: showCelebration ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: showCelebration ? 3 : 0 }}
                      >
                        <DollarSign className="w-8 h-8 text-primary" />
                      </motion.div>
                      <h3 className="font-heading font-semibold text-lg mb-2">Crops Sold!</h3>
                      <p className="text-muted-foreground">
                        {formatCurrency(1250)} automatically split between everyone
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Payment Progress</span>
                        <span className="text-sm text-muted-foreground">{Math.round(animationProgress)}%</span>
                      </div>
                      <Progress value={animationProgress} className="h-3" />
                    </div>

                    {/* Payment Events */}
                    <div className="space-y-4">
                      {paymentEvents.map((event, index) => (
                        <motion.div
                          key={event.id}
                          className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                          initial={{ opacity: 0, x: -40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.3 }}
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            {event.type === "sale" ? (
                              <TrendingUp className="w-5 h-5 text-primary" />
                            ) : (
                              <ArrowRight className="w-5 h-5 text-primary" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium truncate">
                                {event.type === "sale" ? "Crops Sold" : `Paid ${event.recipient}`}
                              </h4>
                              <Badge className={getStatusColor(event.status)} variant="secondary">
                                {event.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{formatDate(event.timestamp)}</span>
                              <span className="font-semibold text-foreground">{formatCurrency(event.amount)}</span>
                            </div>
                            {event.transactionHash && (
                              <div className="mt-2">
                                <code className="text-xs bg-muted px-2 py-1 rounded">{event.transactionHash}</code>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </OrganicCard>
            </div>

            {/* Stakeholder Breakdown */}
            <div className="space-y-6">
              <OrganicCard title="Who Got Paid" variant="elevated" className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "Green Valley Farm", role: "farmer", amount: 750, percentage: 60 },
                    { name: "Fresh Logistics Co.", role: "distributor", amount: 312.5, percentage: 25 },
                    { name: "Organic Market Plus", role: "retailer", amount: 150, percentage: 12 },
                    { name: "YieldLink Platform", role: "platform", amount: 37.5, percentage: 3 },
                  ].map((stakeholder, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRoleColor(
                            stakeholder.role as PaymentEvent["recipientRole"],
                          )}`}
                        >
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{stakeholder.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{stakeholder.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatCurrency(stakeholder.amount)}</p>
                        <p className="text-xs text-muted-foreground">{stakeholder.percentage}%</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </OrganicCard>

              <OrganicCard title="Quick Actions" variant="subtle" className="p-6">
                <div className="space-y-3">
                  <AnimatedButton size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </AnimatedButton>
                  <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    See All Payments
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Payment History
                  </Button>
                </div>
              </OrganicCard>

              <OrganicCard title="Your Results" variant="subtle" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payments Successful</span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Payment Time</span>
                    <span className="font-semibold">1.2 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Transaction Fees Saved</span>
                    <span className="font-semibold text-primary">$45.20</span>
                  </div>
                </div>
              </OrganicCard>
            </div>
          </div>

          {/* Celebration Animation */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                className="fixed inset-0 pointer-events-none z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    initial={{
                      x: "50vw",
                      y: "50vh",
                      scale: 0,
                    }}
                    animate={{
                      x: Math.random() * window.innerWidth,
                      y: Math.random() * window.innerHeight,
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
