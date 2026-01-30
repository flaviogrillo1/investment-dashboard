import { PortfolioMetrics } from '@/components/PortfolioMetrics';
import { PerformanceChart } from '@/components/PerformanceChart';
import { PositionsTable } from '@/components/PositionsTable';
import { mockPositions, mockPortfolioSummary, mockChartData } from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Welcome back! Here's your portfolio overview
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="mb-8">
          <PortfolioMetrics summary={mockPortfolioSummary} />
        </div>

        {/* Chart and Table */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart data={mockChartData} />
          </div>
          <div className="lg:col-span-1">
            <div className="h-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Portfolio Allocation
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                Coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="mt-8">
          <PositionsTable positions={mockPositions} />
        </div>
      </div>
    </div>
  );
}
