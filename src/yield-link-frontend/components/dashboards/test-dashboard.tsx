"use client"

export function TestDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Test Dashboard</h1>
        <p className="text-muted-foreground">This is a simple test dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Test Card 1</h3>
          <p className="text-sm text-muted-foreground">This is a test card</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Test Card 2</h3>
          <p className="text-sm text-muted-foreground">This is another test card</p>
        </div>
      </div>
    </div>
  )
}
