"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { YieldLinkLogo } from "@/components/ui/yieldlink-logo"
import {
  QrCode,
  Search,
  MapPin,
  Clock,
  Truck,
  Package,
  Store,
  User,
  CheckCircle,
  ArrowRight,
  Eye,
  Calendar,
  Thermometer,
  Shield,
} from "lucide-react"
import Link from "next/link"

interface HandoffEvent {
  id: string
  type: "farmer" | "distributor" | "retailer" | "consumer"
  name: string
  location: string
  timestamp: string
  temperature?: string
  notes?: string
  verified: boolean
}

interface ProduceInfo {
  id: string
  name: string
  variety: string
  quantity: string
  unit: string
  harvestDate: string
  farmer: string
  farmLocation: string
  certifications: string[]
  currentStatus: string
  handoffs: HandoffEvent[]
}

const mockProduceData: ProduceInfo = {
  id: "YL-TOMATO-2024-001",
  name: "Organic Cherry Tomatoes",
  variety: "Sweet 100",
  quantity: "25",
  unit: "kg",
  harvestDate: "2024-01-15",
  farmer: "Green Valley Farm",
  farmLocation: "Salinas, CA, USA",
  certifications: ["USDA Organic", "Non-GMO", "Fair Trade"],
  currentStatus: "In Transit to Retailer",
  handoffs: [
    {
      id: "1",
      type: "farmer",
      name: "Green Valley Farm",
      location: "Salinas, CA, USA",
      timestamp: "2024-01-15T08:00:00Z",
      temperature: "18°C",
      notes: "Freshly harvested at optimal ripeness",
      verified: true,
    },
    {
      id: "2",
      type: "distributor",
      name: "Fresh Logistics Co.",
      location: "San Francisco, CA, USA",
      timestamp: "2024-01-16T14:30:00Z",
      temperature: "4°C",
      notes: "Quality inspection passed. Refrigerated transport initiated.",
      verified: true,
    },
    {
      id: "3",
      type: "retailer",
      name: "Organic Market Plus",
      location: "Los Angeles, CA, USA",
      timestamp: "2024-01-17T09:15:00Z",
      temperature: "6°C",
      notes: "Received in excellent condition. Ready for display.",
      verified: true,
    },
  ],
}

const getStepIcon = (type: HandoffEvent["type"]) => {
  switch (type) {
    case "farmer":
      return Truck
    case "distributor":
      return Truck
    case "retailer":
      return Store
    case "consumer":
      return User
    default:
      return Package
  }
}

const getStepColor = (type: HandoffEvent["type"]) => {
  switch (type) {
    case "farmer":
      return "text-green-600"
    case "distributor":
      return "text-blue-600"
    case "retailer":
      return "text-purple-600"
    case "consumer":
      return "text-orange-600"
    default:
      return "text-gray-600"
  }
}

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [produceData, setProduceData] = useState<ProduceInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProduceData(mockProduceData)
    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
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
                <Eye className="w-4 h-4 mr-2" />
                Track Your Crops
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Search Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Track Your Crops</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Enter your crop ID or scan the QR code to see exactly where your produce went from your farm to the
              customer's table
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Crop ID (e.g., YL-TOMATO-2024-001)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <AnimatedButton onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Search className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </AnimatedButton>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {produceData && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Produce Information */}
                <OrganicCard title="Your Crop Details" variant="elevated" className="p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-2">{produceData.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        {produceData.quantity} {produceData.unit} • {produceData.variety}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {produceData.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Farmer</span>
                      </div>
                      <p className="text-muted-foreground">{produceData.farmer}</p>
                      <p className="text-sm text-muted-foreground">{produceData.farmLocation}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Harvest Date</span>
                      </div>
                      <p className="text-muted-foreground">{formatDate(produceData.harvestDate)}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Current Status</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {produceData.currentStatus}
                      </Badge>
                    </div>
                  </div>
                </OrganicCard>

                {/* Supply Chain Journey */}
                <OrganicCard title="Where Your Crops Went" variant="elevated" className="p-8">
                  <div className="relative">
                    {/* Journey Path */}
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

                    <div className="space-y-8">
                      {produceData.handoffs.map((handoff, index) => {
                        const StepIcon = getStepIcon(handoff.type)
                        const isActive = activeStep === index

                        return (
                          <motion.div
                            key={handoff.id}
                            className="relative"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                          >
                            <div
                              className={`flex items-start gap-6 cursor-pointer transition-all duration-300 ${
                                isActive ? "scale-105" : ""
                              }`}
                              onClick={() => setActiveStep(isActive ? null : index)}
                            >
                              {/* Step Icon */}
                              <motion.div
                                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-lg ${
                                  handoff.verified ? "bg-primary" : "bg-muted"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                              >
                                <StepIcon
                                  className={`w-6 h-6 ${
                                    handoff.verified ? "text-primary-foreground" : "text-muted-foreground"
                                  }`}
                                />
                                {handoff.verified && (
                                  <motion.div
                                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.2 }}
                                  >
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                              </motion.div>

                              {/* Step Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-heading font-semibold text-lg">{handoff.name}</h3>
                                  <Badge variant={handoff.verified ? "default" : "secondary"} className="capitalize">
                                    {handoff.type}
                                  </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{handoff.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatDate(handoff.timestamp)}</span>
                                  </div>
                                  {handoff.temperature && (
                                    <div className="flex items-center gap-1">
                                      <Thermometer className="w-4 h-4" />
                                      <span>{handoff.temperature}</span>
                                    </div>
                                  )}
                                </div>

                                <AnimatePresence>
                                  {isActive && handoff.notes && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="bg-muted/50 rounded-lg p-4 mt-4"
                                    >
                                      <div className="flex items-start gap-2">
                                        <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <p className="text-sm">{handoff.notes}</p>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Arrow */}
                              {index < produceData.handoffs.length - 1 && (
                                <motion.div
                                  className="absolute left-8 top-20 z-0"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.8 + index * 0.2 }}
                                >
                                  <ArrowRight className="w-5 h-5 text-primary/60" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </OrganicCard>

                {/* Verification Status */}
                <OrganicCard title="Security & Quality Checks" variant="subtle" className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-medium mb-1">Secure Records</h3>
                      <p className="text-sm text-muted-foreground">All steps recorded and can't be changed</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Thermometer className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium mb-1">Temperature Watched</h3>
                      <p className="text-sm text-muted-foreground">Kept at the right temperature the whole way</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-medium mb-1">Quality Guaranteed</h3>
                      <p className="text-sm text-muted-foreground">Certified organic and fairly traded</p>
                    </div>
                  </div>
                </OrganicCard>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton asChild>
                    <Link href="/smart-contracts">View Payment Agreement</Link>
                  </AnimatedButton>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo Section */}
          {!produceData && !isLoading && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-muted-foreground mb-6">Try our demo with sample data</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("YL-TOMATO-2024-001")
                  handleSearch()
                }}
              >
                Load Demo Data
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
