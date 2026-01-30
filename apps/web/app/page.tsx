import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Logo/Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-4xl dark:bg-blue-500">
          📈
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
          Investment Dashboard
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          Track your portfolio performance, monitor market trends, and make informed investment decisions.
          All in one powerful, easy-to-use dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
          >
            View Dashboard
          </Link>
          <Link
            href="/portfolio"
            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
          >
            Manage Portfolio
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 text-3xl">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Real-time Tracking
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Monitor your investments with live updates and detailed analytics
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 text-3xl">💹</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Performance Charts
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Visualize your portfolio growth with interactive charts and graphs
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 text-3xl">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Smart Insights
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Get actionable insights and recommendations for your investments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
