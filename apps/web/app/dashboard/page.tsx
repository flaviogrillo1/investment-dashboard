export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Investment dashboard is loading...
      </p>
      <div className="mt-8">
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold">Portfolio Value</h2>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </div>
      </div>
    </div>
  )
}
