"use client"

import { YieldLinkLogo } from "@/components/ui/yieldlink-logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { FarmerDashboard } from "@/components/dashboards/farmer-dashboard"
import { DistributorDashboard } from "@/components/dashboards/distributor-dashboard"
import { RetailerDashboard } from "@/components/dashboards/retailer-dashboard"

export default function DashboardPage() {
  const { role, isLoading } = useRole()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <YieldLinkLogo />
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/auth/">{role ? "Switch Role / Sign In" : "Sign In"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
                  </div>
        ) : !role ? (
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold mb-2">Choose your role</h1>
            <p className="text-muted-foreground mb-6">Go to Sign In and select a role to continue</p>
            <Button asChild>
              <Link href="/auth">Go to Sign In</Link>
                  </Button>
                </div>
        ) : role === "farmer" ? (
          <FarmerDashboard />
        ) : role === "distributor" ? (
          <DistributorDashboard />
        ) : (
          <RetailerDashboard />
        )}
      </main>
    </div>
  )
}