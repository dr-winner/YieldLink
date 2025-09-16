"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft } from "lucide-react"

export type StakeholderRole = "farmer" | "distributor" | "retailer"

interface RoleSelectionProps {
  onRoleSelect: (role: StakeholderRole) => void
  onBack: () => void
}

const roles: {
  id: StakeholderRole
  title: string
  description: string
}[] = [
  {
    id: "farmer",
    title: "Farmer",
    description: "Grow and harvest crops"
  },
  {
    id: "distributor", 
    title: "Distributor",
    description: "Transport and handle produce"
  },
  {
    id: "retailer",
    title: "Retailer", 
    description: "Sell fresh produce to consumers"
  }
]

export function RoleSelection({ onRoleSelect, onBack }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<StakeholderRole | null>(null)

  const handleContinue = () => {
    if (selectedRole) {
      console.log("Continue button clicked, selectedRole:", selectedRole)
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold mb-2">Choose Your Role</h2>
        <p className="text-muted-foreground">
          How do you participate in the food supply chain?
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role-select">Select your role</Label>
          <Select 
            value={selectedRole || ""} 
            onValueChange={(value) => {
              console.log("Role selected:", value)
              setSelectedRole(value as StakeholderRole)
            }}
          >
            <SelectTrigger id="role-select" className="w-full">
              <SelectValue placeholder="Choose your role..." />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{role.title}</span>
                    <span className="text-sm text-muted-foreground">{role.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={!selectedRole}
          className="flex-1"
        >
          Continue as {selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : ""}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
