import { PortfolioMetrics } from '@/components/PortfolioMetrics';
import { PositionsTable } from '@/components/PositionsTable';
import { mockPositions, mockPortfolioSummary } from '@/lib/mockData';
import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Portfolio
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your investment positions
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-xl">
                <Plus className="h-4 w-4" />
                Add Position
              </button>
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

        {/* Positions Table */}
        <div>
          <PositionsTable positions={mockPositions} />
        </div>

        {/* Allocation Section - Placeholder */}
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
            <svg className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            Portfolio Allocation
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Visual breakdown of your portfolio by asset class
          </p>
          <button className="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
