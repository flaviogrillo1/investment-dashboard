'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '@/lib/types';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface PerformanceChartProps {
  data: ChartDataPoint[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 shadow-2xl dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
      <CardHeader className="relative overflow-hidden pb-4">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black text-gray-900 dark:text-white">
              Rendimiento del Portfolio
            </CardTitle>
            <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Trayectoria de crecimiento de 12 meses
            </p>
          </div>
          <div className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-3 shadow-xl">
            <TrendingUp className="h-6 w-6 text-white" />
            <div className="text-white">
              <div className="text-xs font-medium opacity-90">Crecimiento</div>
              <div className="text-xl font-black">+20.2%</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-2xl border-2 border-gray-200/50 bg-white/80 p-6 backdrop-blur-sm shadow-inner dark:border-gray-800/50 dark:bg-gray-900/80">
          <div style={{ height: '380px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation={2} result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid 
                  strokeDasharray="4 4" 
                  stroke="#e2e8f0" 
                  className="dark:stroke-gray-800"
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: 'none',
                    borderRadius: '16px',
                    color: '#f8fafc',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}
                  formatter={(value: number | undefined) =>
                    value !== undefined ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="url(#colorValue)"
                  strokeWidth={4}
                  fill="url(#colorValue)"
                  filter="url(#glow)"
                  activeDot={{ 
                    r: 8, 
                    fill: '#3b82f6',
                    stroke: '#fff',
                    strokeWidth: 3
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
