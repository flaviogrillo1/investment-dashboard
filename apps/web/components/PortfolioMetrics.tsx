'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';
import { PortfolioSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {change !== undefined && (
          <p
            className={cn(
              "mt-1 flex items-center text-xs font-medium",
              trend === 'up' && "text-green-600 dark:text-green-400",
              trend === 'down' && "text-red-600 dark:text-red-400",
              trend === 'neutral' && "text-muted-foreground"
            )}
          >
            {trend === 'up' && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === 'down' && <TrendingDown className="mr-1 h-3 w-3" />}
            {change > 0 ? '+' : ''}{change}%
            <span className="ml-1 text-muted-foreground">vs last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function PortfolioMetrics({ summary }: { summary: PortfolioSummary }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Value"
        value={`$${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<Wallet className="h-4 w-4 text-primary" />}
      />
      <StatCard
        title="Total Return"
        value={`$${summary.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={summary.totalGainLossPercent}
        trend={summary.totalGainLoss >= 0 ? 'up' : 'down'}
        icon={<PieChart className="h-4 w-4 text-primary" />}
      />
      <StatCard
        title="Day Change"
        value={`$${summary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={summary.dayChangePercent}
        trend={summary.dayChange >= 0 ? 'up' : 'down'}
        icon={summary.dayChange >= 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
      />
      <StatCard
        title="Positions"
        value="5"
        icon={<PieChart className="h-4 w-4 text-primary" />}
      />
    </div>
  );
}
