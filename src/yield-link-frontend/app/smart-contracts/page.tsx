"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { YieldLinkLogo } from "@/components/ui/yieldlink-logo"
import {
  FileText,
  Users,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft,
  PieChart,
  Zap,
  Eye,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface Stakeholder {
  id: string
  name: string
  role: "farmer" | "distributor" | "retailer" | "platform"
  percentage: number
  address: string
}

interface ContractTerms {
  totalValue: number
  currency: string
  paymentTrigger: string
  stakeholders: Stakeholder[]
  conditions: string[]
  createdAt: string
  status: "draft" | "active" | "completed"
}

const defaultStakeholders: Stakeholder[] = [
  {
    id: "1",
    name: "Green Valley Farm",
    role: "farmer",
    percentage: 60,
    address: "0x1234...5678",
  },
  {
    id: "2",
    name: "Fresh Logistics Co.",
    role: "distributor",
    percentage: 25,
    address: "0x2345...6789",
  },
  {
    id: "3",
    name: "Organic Market Plus",
    role: "retailer",
    percentage: 12,
    address: "0x3456...7890",
  },
  {
    id: "4",
    name: "YieldLink Platform",
    role: "platform",
    percentage: 3,
    address: "0x4567...8901",
  },
]

const getRoleColor = (role: Stakeholder["role"]) => {
  switch (role) {
    case "farmer":
      return "bg-green-500"
    case "distributor":
      return "bg-blue-500"
    case "retailer":
      return "bg-purple-500"
    case "platform":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

const getRoleIcon = (role: Stakeholder["role"]) => {
  switch (role) {
    case "farmer":
      return FileText
    case "distributor":
      return Users
    case "retailer":
      return Shield
    case "platform":
      return Settings
    default:
      return Users
  }
}

export default function SmartContractsPage() {
  const [contractTerms, setContractTerms] = useState<ContractTerms>({
    totalValue: 1000,
    currency: "USD",
    paymentTrigger: "Final Sale Confirmation",
    stakeholders: defaultStakeholders,
    conditions: [
      "Payment triggered upon final sale confirmation",
      "All stakeholders must verify their handoff",
      "Temperature logs must be maintained",
      "Quality standards must be met",
    ],
    createdAt: new Date().toISOString(),
    status: "draft",
  })

  const [isDeploying, setIsDeploying] = useState(false)
  const [isDeployed, setIsDeployed] = useState(false)

  const updateStakeholderPercentage = (id: string, percentage: number) => {
    setContractTerms((prev) => ({
      ...prev,
      stakeholders: prev.stakeholders.map((stakeholder) =>
        stakeholder.id === id ? { ...stakeholder, percentage } : stakeholder,
      ),
    }))
  }

  const deployContract = async () => {
    setIsDeploying(true)
    // Simulate contract deployment
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsDeployed(true)
    setIsDeploying(false)
    setContractTerms((prev) => ({ ...prev, status: "active" }))
  }

  const totalPercentage = contractTerms.stakeholders.reduce((sum, stakeholder) => sum + stakeholder.percentage, 0)

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
                <FileText className="w-4 h-4 mr-2" />
                Payment Setup
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

          <AnimatePresence mode="wait">
            {!isDeployed ? (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <FileText className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Set Up Fair Payment</h1>
                  <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Decide how much everyone gets paid when your crops are sold. This creates an automatic agreement
                    that can't be changed.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Contract Configuration */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Basic Terms */}
                    <OrganicCard title="Payment Rules" variant="elevated" className="p-8">
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="totalValue">Expected Sale Price</Label>
                            <div className="flex gap-2">
                              <Input
                                id="totalValue"
                                type="number"
                                value={contractTerms.totalValue}
                                onChange={(e) =>
                                  setContractTerms((prev) => ({
                                    ...prev,
                                    totalValue: Number(e.target.value),
                                  }))
                                }
                                className="flex-1"
                              />
                              <Badge variant="outline" className="px-3 py-2">
                                {contractTerms.currency}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="paymentTrigger">When to Pay</Label>
                            <Input
                              id="paymentTrigger"
                              value={contractTerms.paymentTrigger}
                              onChange={(e) =>
                                setContractTerms((prev) => ({
                                  ...prev,
                                  paymentTrigger: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Stakeholder Distribution */}
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="font-heading font-semibold text-lg">Who Gets What</h3>
                            <Badge variant={totalPercentage === 100 ? "default" : "destructive"} className="text-sm">
                              {totalPercentage}% Total
                            </Badge>
                          </div>

                          <div className="space-y-4">
                            {contractTerms.stakeholders.map((stakeholder) => {
                              const RoleIcon = getRoleIcon(stakeholder.role)
                              return (
                                <motion.div
                                  key={stakeholder.id}
                                  className="border border-border rounded-lg p-4"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-10 h-10 ${getRoleColor(
                                          stakeholder.role,
                                        )} rounded-lg flex items-center justify-center`}
                                      >
                                        <RoleIcon className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{stakeholder.name}</h4>
                                        <p className="text-sm text-muted-foreground capitalize">{stakeholder.role}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold text-lg">{stakeholder.percentage}%</p>
                                      <p className="text-sm text-muted-foreground">
                                        ${((contractTerms.totalValue * stakeholder.percentage) / 100).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>Percentage</span>
                                      <span>{stakeholder.percentage}%</span>
                                    </div>
                                    <Slider
                                      value={[stakeholder.percentage]}
                                      onValueChange={([value]) => updateStakeholderPercentage(stakeholder.id, value)}
                                      max={100}
                                      step={1}
                                      className="w-full"
                                    />
                                  </div>

                                  <div className="mt-3 text-xs text-muted-foreground">
                                    Wallet: {stakeholder.address}
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </OrganicCard>

                    {/* Contract Conditions */}
                    <OrganicCard title="Payment Requirements" variant="elevated" className="p-8">
                      <div className="space-y-4">
                        {[
                          "Payment happens automatically when crops are sold",
                          "Everyone must confirm they received the crops",
                          "Temperature must be kept at safe levels",
                          "Quality standards must be met",
                        ].map((condition, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{condition}</p>
                          </motion.div>
                        ))}
                      </div>
                    </OrganicCard>
                  </div>

                  {/* Visualization & Actions */}
                  <div className="space-y-6">
                    {/* Payment Distribution Visualization */}
                    <OrganicCard title="Payment Split" variant="elevated" className="p-6">
                      <div className="space-y-4">
                        {/* Pie Chart Representation */}
                        <div className="relative w-48 h-48 mx-auto">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {contractTerms.stakeholders.map((stakeholder, index) => {
                              const startAngle = contractTerms.stakeholders
                                .slice(0, index)
                                .reduce((sum, s) => sum + (s.percentage / 100) * 360, 0)
                              const endAngle = startAngle + (stakeholder.percentage / 100) * 360
                              const largeArcFlag = stakeholder.percentage > 50 ? 1 : 0

                              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                              return (
                                <motion.path
                                  key={stakeholder.id}
                                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                  className={getRoleColor(stakeholder.role).replace("bg-", "fill-")}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.8 }}
                                  transition={{ delay: index * 0.2 }}
                                />
                              )
                            })}
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <PieChart className="w-8 h-8 text-primary mx-auto mb-1" />
                              <p className="text-xs text-muted-foreground">Distribution</p>
                            </div>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-2">
                          {contractTerms.stakeholders.map((stakeholder) => (
                            <div key={stakeholder.id} className="flex items-center gap-2 text-sm">
                              <div className={`w-3 h-3 ${getRoleColor(stakeholder.role)} rounded-full`} />
                              <span className="flex-1">{stakeholder.name}</span>
                              <span className="font-medium">{stakeholder.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </OrganicCard>

                    {/* Contract Benefits */}
                    <OrganicCard title="Why This Helps You" variant="subtle" className="p-6">
                      <div className="space-y-4">
                        {[
                          {
                            icon: Zap,
                            title: "Get Paid Instantly",
                            desc: "Money sent automatically when sold",
                          },
                          {
                            icon: Shield,
                            title: "Fair & Clear",
                            desc: "Everyone can see the payment rules",
                          },
                          {
                            icon: Eye,
                            title: "Can't Be Changed",
                            desc: "Rules are locked in once agreed",
                          },
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <benefit.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{benefit.title}</p>
                              <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </OrganicCard>

                    {/* Deploy Button */}
                    <AnimatedButton
                      size="lg"
                      onClick={deployContract}
                      disabled={isDeploying || totalPercentage !== 100}
                      className="w-full"
                    >
                      {isDeploying ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <Clock className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <Zap className="w-5 h-5 mr-2" />
                      )}
                      {isDeploying ? "Setting Up Payment..." : "Activate Payment Agreement"}
                    </AnimatedButton>

                    {totalPercentage !== 100 && (
                      <p className="text-sm text-destructive text-center">
                        Total percentage must equal 100% to activate
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="deployed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <motion.div
                  className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary" />
                </motion.div>

                <h2 className="font-heading font-bold text-3xl mb-4">Payment Agreement Active!</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Your payment agreement is now set up. When your crops are sold, everyone will automatically get paid
                  their fair share.
                </p>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  <OrganicCard className="text-center p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-2">Agreement ID</h3>
                    <code className="text-sm bg-muted px-2 py-1 rounded">0xABC123...DEF789</code>
                  </OrganicCard>

                  <OrganicCard className="text-center p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-2">Expected Sale</h3>
                    <p className="text-lg font-semibold">${contractTerms.totalValue}</p>
                  </OrganicCard>

                  <OrganicCard className="text-center p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium mb-2">People Getting Paid</h3>
                    <p className="text-lg font-semibold">{contractTerms.stakeholders.length}</p>
                  </OrganicCard>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton asChild>
                    <Link href="/payments">See Payment Status</Link>
                  </AnimatedButton>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
