"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrganicCard } from "@/components/ui/organic-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Leaf, User, Building, Sprout, Shield, Zap, Eye, Users } from "lucide-react"
import Link from "next/link"

interface FormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  farmInfo: {
    farmName: string
    location: string
    farmSize: string
    cropTypes: string
    description: string
  }
  businessInfo: {
    businessType: string
    yearsExperience: string
    currentChallenges: string
  }
}

const steps = [
  {
    id: 1,
    title: "Welcome to YieldLink",
    subtitle: "Let's revolutionize your agricultural supply chain",
    icon: Leaf,
    benefit: "Join thousands of farmers already transforming their operations",
  },
  {
    id: 2,
    title: "Personal Information",
    subtitle: "Tell us about yourself",
    icon: User,
    benefit: "Your secure profile enables trusted transactions",
  },
  {
    id: 3,
    title: "Farm Details",
    subtitle: "Share your farm information",
    icon: Sprout,
    benefit: "Detailed farm data improves supply chain transparency",
  },
  {
    id: 4,
    title: "Business Profile",
    subtitle: "Complete your business setup",
    icon: Building,
    benefit: "Business insights help optimize your operations",
  },
  {
    id: 5,
    title: "Welcome Aboard!",
    subtitle: "Your YieldLink journey begins now",
    icon: CheckCircle,
    benefit: "Start creating transparent, profitable supply chains",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    farmInfo: {
      farmName: "",
      location: "",
      farmSize: "",
      cropTypes: "",
      description: "",
    },
    businessInfo: {
      businessType: "",
      yearsExperience: "",
      currentChallenges: "",
    },
  })

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (section: keyof FormData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
              <Leaf className="w-12 h-12 text-primary" />
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-3xl">Welcome to the Future of Agriculture</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                YieldLink connects your farm to a transparent, blockchain-powered supply chain that ensures fair
                compensation and builds consumer trust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Shield, title: "Secure", desc: "Blockchain protection" },
                { icon: Eye, title: "Transparent", desc: "Full visibility" },
                { icon: Zap, title: "Fast", desc: "Instant payments" },
                { icon: Users, title: "Connected", desc: "Global network" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <OrganicCard className="text-center p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </OrganicCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Your secure profile enables trusted transactions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => updateFormData("personalInfo", "firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => updateFormData("personalInfo", "lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData("personalInfo", "email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updateFormData("personalInfo", "phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-2">Farm Details</h2>
              <p className="text-muted-foreground">Detailed farm data improves supply chain transparency</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input
                    id="farmName"
                    value={formData.farmInfo.farmName}
                    onChange={(e) => updateFormData("farmInfo", "farmName", e.target.value)}
                    placeholder="Green Valley Farm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.farmInfo.location}
                    onChange={(e) => updateFormData("farmInfo", "location", e.target.value)}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size</Label>
                  <Select onValueChange={(value) => updateFormData("farmInfo", "farmSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-10 acres)</SelectItem>
                      <SelectItem value="medium">Medium (11-50 acres)</SelectItem>
                      <SelectItem value="large">Large (51-200 acres)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (200+ acres)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cropTypes">Primary Crops</Label>
                  <Input
                    id="cropTypes"
                    value={formData.farmInfo.cropTypes}
                    onChange={(e) => updateFormData("farmInfo", "cropTypes", e.target.value)}
                    placeholder="Tomatoes, Corn, Wheat..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Farm Description</Label>
                <Textarea
                  id="description"
                  value={formData.farmInfo.description}
                  onChange={(e) => updateFormData("farmInfo", "description", e.target.value)}
                  placeholder="Tell us about your farming practices, certifications, and what makes your farm unique..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-2">Business Profile</h2>
              <p className="text-muted-foreground">Business insights help optimize your operations</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select onValueChange={(value) => updateFormData("businessInfo", "businessType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Farmer</SelectItem>
                      <SelectItem value="family">Family Farm</SelectItem>
                      <SelectItem value="cooperative">Cooperative</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Select onValueChange={(value) => updateFormData("businessInfo", "yearsExperience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-20">11-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentChallenges">Current Challenges</Label>
                <Textarea
                  id="currentChallenges"
                  value={formData.businessInfo.currentChallenges}
                  onChange={(e) => updateFormData("businessInfo", "currentChallenges", e.target.value)}
                  placeholder="What are your biggest challenges in the supply chain? (e.g., payment delays, lack of transparency, market access...)"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-bold text-3xl">Welcome to YieldLink!</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Your farm profile has been created successfully. You're now ready to start creating transparent,
                profitable supply chains.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-heading font-semibold text-lg">What's Next?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    1
                  </Badge>
                  <span>Create your first produce token</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    2
                  </Badge>
                  <span>Set up smart contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                  <span>Start tracking your supply chain</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg" asChild>
                <Link href="/token-creation">Create First Token</Link>
              </AnimatedButton>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

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
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              <Progress value={progress} className="w-24 h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 transition-colors ${
                        currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <OrganicCard className="min-h-[500px] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </OrganicCard>

          {/* Navigation */}
          {currentStep !== 5 && (
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">{steps[currentStep - 1]?.benefit}</p>
              </div>

              <AnimatedButton
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className="flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </AnimatedButton>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
