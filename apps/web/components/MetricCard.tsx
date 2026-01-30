import { PortfolioSummary } from '@/lib/types';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeType?: 'gain' | 'loss' | 'neutral';
}

export function MetricCard({ title, value, change, changeType }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-50">{value}</p>
      {change !== undefined && (
        <p className={`mt-2 text-sm font-medium ${
          changeType === 'gain' ? 'text-green-600' : 
          changeType === 'loss' ? 'text-red-600' : 
          'text-gray-600'
        } dark:${
          changeType === 'gain' ? 'text-green-400' : 
          changeType === 'loss' ? 'text-red-400' : 
          'text-gray-400'
        }`}>
          {changeType === 'gain' ? '+' : ''}{change}%
        </p>
      )}
    </div>
  );
}

export function PortfolioMetrics({ summary }: { summary: PortfolioSummary }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Portfolio Value"
        value={`$${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      />
      <MetricCard
        title="Total Gain/Loss"
        value={`$${summary.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={summary.totalGainLossPercent}
        changeType={summary.totalGainLoss >= 0 ? 'gain' : 'loss'}
      />
      <MetricCard
        title="Day Change"
        value={`$${summary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={summary.dayChangePercent}
        changeType={summary.dayChange >= 0 ? 'gain' : 'loss'}
      />
      <MetricCard
        title="Total Positions"
        value="5"
      />
    </div>
  );
}
