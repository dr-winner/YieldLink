"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type StakeholderRole = "farmer" | "distributor" | "retailer"

interface RoleContextType {
  role: StakeholderRole | null
  setRole: (role: StakeholderRole | null) => void
  isLoading: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<StakeholderRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load role from localStorage on mount
    const savedRole = localStorage.getItem("yieldlink-role") as StakeholderRole | null
    if (savedRole) {
      setRole(savedRole)
    }
    setIsLoading(false)
  }, [])

  const handleSetRole = (newRole: StakeholderRole | null) => {
    setRole(newRole)
    if (mounted) {
      if (newRole) {
        localStorage.setItem("yieldlink-role", newRole)
      } else {
        localStorage.removeItem("yieldlink-role")
      }
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <RoleContext.Provider value={{ role: null, setRole: handleSetRole, isLoading: true }}>
        {children}
      </RoleContext.Provider>
    )
  }

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole, isLoading }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
