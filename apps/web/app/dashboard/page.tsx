import { PortfolioMetrics } from '@/components/MetricCard';
import { PerformanceChart } from '@/components/PerformanceChart';
import { PositionsTable } from '@/components/PositionsTable';
import { mockPositions, mockPortfolioSummary, mockChartData } from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Investment Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track your portfolio performance and manage your investments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="mb-8">
          <PortfolioMetrics summary={mockPortfolioSummary} />
        </div>

        {/* Chart */}
        <div className="mb-8">
          <PerformanceChart data={mockChartData} />
        </div>

        {/* Positions Table */}
        <div>
          <PositionsTable positions={mockPositions} />
        </div>
      </div>
    </div>
  );
}
