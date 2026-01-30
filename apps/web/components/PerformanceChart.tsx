'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '@/lib/types';

interface PerformanceChartProps {
  data: ChartDataPoint[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
        Portfolio Performance
      </h2>
      <div className="mt-6" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
              labelStyle={{ color: '#9CA3AF' }}
              formatter={(value: number | undefined) => 
                value !== undefined ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''
              }
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
