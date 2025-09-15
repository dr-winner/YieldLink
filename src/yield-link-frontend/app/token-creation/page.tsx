"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  QrCode,
  Upload,
  Package,
  Shield,
  Download,
  Copy,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Eye,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface ProduceData {
  name: string
  variety: string
  quantity: string
  unit: string
  harvestDate: string
  location: string
  certifications: string
  description: string
  images: File[]
}

interface TokenData {
  id: string
  qrCode: string
  blockchainHash: string
  createdAt: string
}

export default function TokenCreationPage() {
  const [step, setStep] = useState<"form" | "generating" | "complete">("form")
  const [produceData, setProduceData] = useState<ProduceData>({
    name: "",
    variety: "",
    quantity: "",
    unit: "kg",
    harvestDate: "",
    location: "",
    certifications: "",
    description: "",
    images: [],
  })
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateProduceData = (field: keyof ProduceData, value: string | File[]) => {
    setProduceData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    updateProduceData("images", files)
  }

  const generateToken = async () => {
    setIsGenerating(true)
    setStep("generating")

    // Simulate token generation process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockToken: TokenData = {
      id: `YL-${Date.now().toString(36).toUpperCase()}`,
      qrCode: `https://yieldlink.app/track/${Date.now().toString(36)}`,
      blockchainHash: `0x${Math.random().toString(16).substr(2, 40)}`,
      createdAt: new Date().toISOString(),
    }

    setTokenData(mockToken)
    setIsGenerating(false)
    setStep("complete")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadQR = () => {
    // In a real implementation, this would generate and download the QR code
    console.log("Downloading QR code...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">YieldLink</span>
            </Link>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Package className="w-4 h-4 mr-2" />
                Token Creation
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
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
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  >
                    <QrCode className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Create Produce Token</h1>
                  <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Transform your produce into a blockchain-verified token with complete traceability
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <OrganicCard title="Produce Information" className="p-8">
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Produce Name *</Label>
                            <Input
                              id="name"
                              value={produceData.name}
                              onChange={(e) => updateProduceData("name", e.target.value)}
                              placeholder="e.g., Organic Tomatoes"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="variety">Variety</Label>
                            <Input
                              id="variety"
                              value={produceData.variety}
                              onChange={(e) => updateProduceData("variety", e.target.value)}
                              placeholder="e.g., Cherry, Roma, Beefsteak"
                            />
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                              id="quantity"
                              type="number"
                              value={produceData.quantity}
                              onChange={(e) => updateProduceData("quantity", e.target.value)}
                              placeholder="Enter quantity"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Select onValueChange={(value) => updateProduceData("unit", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="kg" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kg">Kilograms</SelectItem>
                                <SelectItem value="lbs">Pounds</SelectItem>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="boxes">Boxes</SelectItem>
                                <SelectItem value="crates">Crates</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Date and Location */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="harvestDate">Harvest Date *</Label>
                            <Input
                              id="harvestDate"
                              type="date"
                              value={produceData.harvestDate}
                              onChange={(e) => updateProduceData("harvestDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Farm Location *</Label>
                            <Input
                              id="location"
                              value={produceData.location}
                              onChange={(e) => updateProduceData("location", e.target.value)}
                              placeholder="City, State, Country"
                            />
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-2">
                          <Label htmlFor="certifications">Certifications</Label>
                          <Input
                            id="certifications"
                            value={produceData.certifications}
                            onChange={(e) => updateProduceData("certifications", e.target.value)}
                            placeholder="e.g., USDA Organic, Fair Trade, Non-GMO"
                          />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={produceData.description}
                            onChange={(e) => updateProduceData("description", e.target.value)}
                            placeholder="Describe your produce, growing methods, and any special qualities..."
                            rows={4}
                          />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                          <Label>Product Images</Label>
                          <div
                            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground mb-2">Click to upload images or drag and drop</p>
                            <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>
                          {produceData.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {produceData.images.map((file, index) => (
                                <Badge key={index} variant="secondary">
                                  {file.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </OrganicCard>
                  </div>

                  {/* Preview & Benefits */}
                  <div className="space-y-6">
                    <OrganicCard title="Token Preview" variant="elevated">
                      <div className="space-y-4">
                        <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{produceData.name || "Your Produce"}</p>
                          <p className="text-sm text-muted-foreground">
                            {produceData.quantity} {produceData.unit}
                          </p>
                        </div>
                      </div>
                    </OrganicCard>

                    <OrganicCard title="Benefits" variant="subtle">
                      <div className="space-y-4">
                        {[
                          {
                            icon: Shield,
                            title: "Blockchain Security",
                            desc: "Immutable record of your produce",
                          },
                          {
                            icon: Eye,
                            title: "Full Traceability",
                            desc: "Track from farm to consumer",
                          },
                          {
                            icon: Zap,
                            title: "Instant Verification",
                            desc: "QR code for quick scanning",
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
                  </div>
                </div>

                <div className="flex justify-center mt-12">
                  <AnimatedButton
                    size="lg"
                    onClick={generateToken}
                    disabled={
                      !produceData.name || !produceData.quantity || !produceData.harvestDate || !produceData.location
                    }
                    className="px-8 py-6 text-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate Token & QR Code
                  </AnimatedButton>
                </div>
              </motion.div>
            )}

            {step === "generating" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <motion.div
                  className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="w-16 h-16 text-primary" />
                </motion.div>

                <h2 className="font-heading font-bold text-2xl mb-4">Creating Your Token</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We're generating your blockchain token and QR code. This process ensures maximum security and
                  traceability.
                </p>

                <div className="space-y-4 max-w-sm mx-auto">
                  {[
                    "Validating produce data...",
                    "Creating blockchain record...",
                    "Generating QR code...",
                    "Finalizing token...",
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.5 }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      />
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "complete" && tokenData && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.div
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Token Created Successfully!</h1>
                  <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Your produce has been tokenized and is now ready for transparent supply chain tracking
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Token Details */}
                  <OrganicCard title="Token Information" variant="elevated" className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-48 h-48 bg-muted/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <QrCode className="w-24 h-24 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-lg">{produceData.name}</p>
                        <p className="text-muted-foreground">
                          {produceData.quantity} {produceData.unit}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Token ID</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1">{tokenData.id}</code>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard(tokenData.id)}>
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">QR Code URL</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1 truncate">
                              {tokenData.qrCode}
                            </code>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard(tokenData.qrCode)}>
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Blockchain Hash</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1 truncate">
                              {tokenData.blockchainHash}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(tokenData.blockchainHash)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </OrganicCard>

                  {/* Actions & Next Steps */}
                  <div className="space-y-6">
                    <OrganicCard title="Download & Share" variant="elevated" className="p-6">
                      <div className="space-y-4">
                        <AnimatedButton className="w-full flex items-center gap-2" onClick={downloadQR}>
                          <Download className="w-4 h-4" />
                          Download QR Code
                        </AnimatedButton>
                        <Button variant="outline" className="w-full bg-transparent flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Preview Token Page
                        </Button>
                      </div>
                    </OrganicCard>

                    <OrganicCard title="Next Steps" variant="subtle" className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Badge
                            variant="secondary"
                            className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            1
                          </Badge>
                          <div>
                            <p className="font-medium text-sm">Print QR Code</p>
                            <p className="text-xs text-muted-foreground">Attach to your produce packaging</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge
                            variant="secondary"
                            className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            2
                          </Badge>
                          <div>
                            <p className="font-medium text-sm">Set Up Smart Contract</p>
                            <p className="text-xs text-muted-foreground">Define payment distribution</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge
                            variant="secondary"
                            className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                          >
                            3
                          </Badge>
                          <div>
                            <p className="font-medium text-sm">Track Supply Chain</p>
                            <p className="text-xs text-muted-foreground">Monitor handoffs and sales</p>
                          </div>
                        </div>
                      </div>
                    </OrganicCard>

                    <div className="flex flex-col gap-3">
                      <AnimatedButton asChild>
                        <Link href="/smart-contracts">Setup Smart Contract</Link>
                      </AnimatedButton>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard">Back to Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
