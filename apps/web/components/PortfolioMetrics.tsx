'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight } from 'lucide-react';
import { PortfolioSummary } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  gradient?: string;
}

function StatCard({ title, value, change, icon, trend, gradient = 'from-blue-500 to-blue-600' }: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:from-gray-900 dark:to-gray-950">
      {/* Gradient accent */}
      <div className={cn(
        "absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity",
        gradient
      )} />
      
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3",
          gradient
        )}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          {value}
        </div>
        {change !== undefined && (
          <div className="mt-3 flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-md",
              trend === 'up' && "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
              trend === 'down' && "bg-gradient-to-r from-red-500 to-rose-500 text-white",
              trend === 'neutral' && "bg-gray-200 text-gray-700 dark:bg-gray-800"
            )}>
              {trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3" />}
              {change > 0 ? '+' : ''}{change}%
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">vs mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PortfolioMetrics({ summary }: { summary: PortfolioSummary }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Valor Total"
        value={`$${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<Wallet className="h-5 w-5" />}
        gradient="from-blue-500 to-blue-600"
      />
      <StatCard
        title="Retorno Total"
        value={`$${summary.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={summary.totalGainLossPercent}
        trend={summary.totalGainLoss >= 0 ? 'up' : 'down'}
        icon={<PieChart className="h-5 w-5" />}
        gradient="from-purple-500 to-purple-600"
      />
      <StatCard
        title="Cambio Diario"
        value={`$${summary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={summary.dayChangePercent}
        trend={summary.dayChange >= 0 ? 'up' : 'down'}
        icon={summary.dayChange >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
        gradient="from-green-500 to-emerald-600"
      />
      <StatCard
        title="Posiciones"
        value="5"
        icon={<PieChart className="h-5 w-5" />}
        gradient="from-orange-500 to-amber-600"
      />
    </div>
  );
}
