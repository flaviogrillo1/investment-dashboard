'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Position } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PositionsTableProps {
  positions: Position[];
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Current Positions</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Your active investment holdings
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Symbol
                </th>
                <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Quantity
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Avg Price
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Value
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  P&L
                </th>
                <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, idx) => (
                <tr
                  key={position.id}
                  className="group border-b border-gray-100 dark:border-gray-800/50 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-md">
                        {position.symbol.slice(0, 2)}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-50">
                        {position.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {position.name}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {position.quantity}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ${position.avgPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                      ${position.currentPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-50">
                      ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        position.gainLoss >= 0
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {position.gainLoss >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {position.gainLoss >= 0 ? '+' : ''}${position.gainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        position.gainLossPercent >= 0
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {position.gainLossPercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {position.gainLossPercent >= 0 ? '+' : ''}{position.gainLossPercent.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
