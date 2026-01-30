import { PortfolioMetrics } from '@/components/PortfolioMetrics';
import { PerformanceChart } from '@/components/PerformanceChart';
import { PositionsTable } from '@/components/PositionsTable';
import { mockPositions, mockPortfolioSummary, mockChartData } from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Animated background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-slate-200/[0.4] dark:bg-grid-slate-800/[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
      </div>

      {/* Header */}
      <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
            
            <div>
              <h1 className="relative text-5xl font-black tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Dashboard
              </h1>
              <p className="relative mt-3 text-lg font-semibold text-gray-600 dark:text-gray-400">
                Bienvenido de nuevo! Aquí tienes el resumen de tu portfolio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="mb-10">
          <PortfolioMetrics summary={mockPortfolioSummary} />
        </div>

        {/* Chart and Table */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart data={mockChartData} />
          </div>
          <div className="lg:col-span-1">
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border-4 border-dashed border-gray-300/80 bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center shadow-inner dark:border-gray-800/80 dark:from-gray-900 dark:to-gray-950">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-5xl shadow-2xl">
                📊
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                Portfolio Allocation
              </p>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                Visualización de distribución de activos
              </p>
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
                Próximamente
              </div>
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="mt-10">
          <PositionsTable positions={mockPositions} />
        </div>
      </div>
    </div>
  );
}
