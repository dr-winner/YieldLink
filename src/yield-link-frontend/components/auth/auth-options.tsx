"use client"

import { useState } from "react"
import { loginWithInternetIdentity } from "@/lib/auth"
import { connectPlug } from "@/lib/wallet"
// @ts-ignore
import { canisterId as backendCanisterId } from "../../../declarations/yield-link-backend"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Shield, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AuthOptions() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"choose" | "verify">("choose")
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | "internet-identity">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const { toast } = useToast()

  const handleSendOTP = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Verification code sent!",
      description: authMethod === "email" ? `We sent a code to ${email}` : `We sent a code to ${phone}`,
    })

    setStep("verify")
    setIsLoading(false)
  }

  const handleVerifyOTP = async () => {
    setIsLoading(true)

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (otp === "123456") {
      toast({
        title: "Welcome to YieldLink!",
        description: "You're all set to start your farming journey.",
      })
      // Redirect to dashboard or onboarding
      window.location.href = "/dashboard"
    } else {
      toast({
        title: "Invalid code",
        description: "Please check your code and try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleInternetIdentity = async () => {
    try {
      setIsLoading(true)
      const session = await loginWithInternetIdentity()
      toast({ title: "Internet Identity Connected", description: session.principalText })
      window.location.href = "/dashboard"
    } catch (e: any) {
      toast({ title: "Internet Identity failed", description: String(e?.message ?? e), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlug = async () => {
    try {
      setIsLoading(true)
      const host = process.env.NEXT_PUBLIC_DFX_HOST ?? "http://127.0.0.1:4943"
      const wl = [String(backendCanisterId)]
      const session = await connectPlug(wl, host)
      toast({ title: "Plug Connected", description: session.principalText })
      window.location.href = "/dashboard"
    } catch (e: any) {
      toast({ title: "Plug connection failed", description: String(e?.message ?? e), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "verify") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Enter Verification Code
          </CardTitle>
          <CardDescription>We sent a 6-digit code to your {authMethod === "email" ? "email" : "phone"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>

          <Button onClick={handleVerifyOTP} disabled={isLoading || otp.length !== 6} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify & Continue
              </>
            )}
          </Button>

          <Button variant="ghost" onClick={() => setStep("choose")} className="w-full">
            Back to login options
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Join YieldLink</CardTitle>
        <CardDescription>Choose how you'd like to sign in. It's quick and secure!</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={authMethod} onValueChange={(value) => setAuthMethod(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="text-xs">
              Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="text-xs">
              Phone
            </TabsTrigger>
            <TabsTrigger value="internet-identity" className="text-xs">
              Secure ID
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSendOTP} disabled={isLoading || !email} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send verification code
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="phone" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button onClick={handleSendOTP} disabled={isLoading || !phone} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Send verification code
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="internet-identity" className="space-y-4 mt-6">
            <div className="text-center space-y-2">
              <Shield className="w-12 h-12 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">
                Use Internet Identity for the most secure login experience
              </p>
            </div>
            <Button onClick={handleInternetIdentity} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Connect with Internet Identity
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handlePlug} disabled={isLoading} className="w-full">
              Connect Plug Wallet
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
