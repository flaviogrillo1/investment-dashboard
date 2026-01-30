'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Position } from '@/lib/types';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PositionsTableProps {
  positions: Position[];
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-white via-gray-50/50 to-white shadow-2xl dark:from-gray-900 dark:via-gray-950/50 dark:to-gray-900">
      <CardHeader className="relative overflow-hidden pb-6">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
        
        <div className="relative">
          <CardTitle className="text-2xl font-black text-gray-900 dark:text-white">
            Posiciones Activas
          </CardTitle>
          <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
            Tus holdings de inversión actuales
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl dark:border-gray-800/50 dark:bg-gray-900/80">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200/80 bg-gradient-to-r from-gray-50 to-gray-100/80 dark:border-gray-800/80 dark:from-gray-900 dark:to-gray-950">
                  <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Símbolo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Cantidad
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Precio Prom
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Actual
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    P&L
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Cambio
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, idx) => (
                  <tr
                    key={position.id}
                    className="group border-b border-gray-100/80 transition-all duration-200 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:border-gray-800/50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3",
                          idx === 0 && "bg-gradient-to-br from-gray-900 to-gray-700",
                          idx === 1 && "bg-gradient-to-br from-red-500 to-red-600",
                          idx === 2 && "bg-gradient-to-br from-blue-600 to-blue-800",
                          idx === 3 && "bg-gradient-to-br from-orange-500 to-amber-600",
                          idx === 4 && "bg-gradient-to-br from-red-700 to-red-900"
                        )}>
                          {position.symbol.slice(0, 2)}
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {position.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {position.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-base font-bold text-gray-900 dark:text-white">
                        {position.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        ${position.avgPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-base font-black text-gray-900 dark:text-white">
                        ${position.currentPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-base font-black text-gray-900 dark:text-white">
                        ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className={cn(
                        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold shadow-lg",
                        position.gainLoss >= 0
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                      )}>
                        {position.gainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {position.gainLoss >= 0 ? '+' : ''}${position.gainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className={cn(
                        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold shadow-lg",
                        position.gainLossPercent >= 0
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                      )}>
                        {position.gainLossPercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {position.gainLossPercent >= 0 ? '+' : ''}{position.gainLossPercent.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
