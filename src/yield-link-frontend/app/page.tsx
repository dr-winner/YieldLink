"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import { OrganicCard } from "@/components/ui/organic-card"
import { Badge } from "@/components/ui/badge"
import { YieldLinkLogo } from "@/components/ui/yieldlink-logo"
import { motion } from "framer-motion"
import { Leaf, Shield, TrendingUp, Eye, ArrowRight, CheckCircle, Sprout, DollarSign, Truck, QrCode } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <YieldLinkLogo />
            </motion.div>

            <motion.div
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Helps
              </Link>
              <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
                Success Stories
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatedButton asChild>
                <Link href="/auth">Join YieldLink</Link>
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sprout className="w-4 h-4 mr-2" />
              Fighting Unfair Food Prices
            </Badge>
          </motion.div>

          <motion.h1
            className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-balance mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Get <span className="text-primary">Fair Prices</span> for Your Crops
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            YieldLink helps farmers like you get paid fairly by tracking your crops from farm to store. No more
            middlemen taking unfair cuts - you get what your hard work deserves.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="/auth">
                Start Getting Fair Prices
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </AnimatedButton>
            <AnimatedButton variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="#demo">See How It Works</Link>
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">How YieldLink Helps You</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Simple tools that put more money in your pocket
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: DollarSign,
                title: "Get Paid Instantly",
                description:
                  "Money goes straight to your account when your crops are sold - no waiting weeks for payment.",
              },
              {
                icon: Eye,
                title: "Track Your Crops",
                description: "See exactly where your produce goes and who buys it, from your farm to the dinner table.",
              },
              {
                icon: Shield,
                title: "Secure & Safe",
                description: "Your information and payments are protected with the same technology banks use.",
              },
              {
                icon: QrCode,
                title: "Easy QR Codes",
                description: "Just scan a code to register your crops - as simple as taking a photo with your phone.",
              },
              {
                icon: Truck,
                title: "Fair Distribution",
                description:
                  "Everyone in the supply chain gets their fair share - no more middlemen taking extra cuts.",
              },
              {
                icon: TrendingUp,
                title: "Better Profits",
                description: "Farmers using YieldLink typically earn 40% more than traditional selling methods.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <OrganicCard
                  title={feature.title}
                  description={feature.description}
                  variant="elevated"
                  className="h-full hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </OrganicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Four simple steps to start getting fair prices for your crops
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your account with your email, phone, or secure login - takes just 2 minutes.",
              },
              {
                step: "02",
                title: "Register Your Crops",
                description: "Take photos and add details about what you're growing - we'll create QR codes for you.",
              },
              {
                step: "03",
                title: "Track the Journey",
                description: "Watch your crops move through the supply chain and see who's handling them.",
              },
              {
                step: "04",
                title: "Get Paid Fairly",
                description: "Money is automatically split fairly between everyone when your crops are sold.",
              },
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <OrganicCard className="text-center h-full">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading font-bold text-primary-foreground text-lg">{step.step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-pretty">{step.description}</p>
                </OrganicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Real Results from Real Farmers</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              See how YieldLink is helping farmers across the country
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="font-heading font-bold text-2xl mb-6">What Farmers Are Saying</h3>
              <div className="space-y-4">
                {[
                  '"I get paid the same day my tomatoes are sold"',
                  '"No more waiting weeks for my money"',
                  '"I can see exactly where my corn ends up"',
                  '"My profits increased by $15,000 last season"',
                  '"Finally, a fair deal for small farmers like me"',
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                    <Leaf className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">Success Stories Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Ready to Get Fair Prices?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-10">
              Join thousands of farmers who are already earning more with YieldLink. It's free to start.
            </p>
            <AnimatedButton size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="/auth">
                Start Earning More Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <YieldLinkLogo className="mb-4 md:mb-0" />
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 YieldLink. Helping farmers get fair prices for their hard work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
