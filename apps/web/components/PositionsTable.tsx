import { Position } from '@/lib/types';

interface PositionsTableProps {
  positions: Position[];
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-6 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          Current Positions
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Avg Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Current Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Gain/Loss
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {positions.map((position) => (
              <tr key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {position.symbol}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {position.name}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                  {position.quantity}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                  ${position.avgPrice.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                  ${position.currentPrice.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-gray-50">
                  ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 text-right text-sm font-medium ${
                  position.gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {position.gainLoss >= 0 ? '+' : ''}${position.gainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`whitespace-nowrap px-6 py-4 text-right text-sm font-medium ${
                  position.gainLossPercent >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {position.gainLossPercent >= 0 ? '+' : ''}{position.gainLossPercent.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
