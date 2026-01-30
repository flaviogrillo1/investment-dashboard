import { PortfolioMetrics } from '@/components/MetricCard';
import { PositionsTable } from '@/components/PositionsTable';
import { mockPositions, mockPortfolioSummary } from '@/lib/mockData';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Portfolio
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your investment positions
              </p>
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Add Position
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="mb-8">
          <PortfolioMetrics summary={mockPortfolioSummary} />
        </div>

        {/* Positions Table */}
        <div>
          <PositionsTable positions={mockPositions} />
        </div>

        {/* Allocation Chart Placeholder */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Portfolio Allocation
          </h2>
          <div className="mt-6 flex h-64 items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Allocation chart coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
