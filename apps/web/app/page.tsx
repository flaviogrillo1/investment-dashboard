import Link from 'next/link';
import { ArrowRight, BarChart3, LineChart, TrendingUp, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/[0.3] dark:bg-grid-slate-800/[0.3] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,0.6))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-3xl shadow-2xl shadow-blue-600/20">
              📈
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl lg:text-7xl">
              Investment
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {' '}Dashboard
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
              Track your portfolio performance in real-time. Get powerful insights,
              beautiful charts, and make smarter investment decisions.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30"
              >
                View Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-lg transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Manage Portfolio
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16">
              <div>
                <div className="text-4xl font-black text-gray-900 dark:text-gray-50">$57K+</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Value</div>
              </div>
              <div>
                <div className="text-4xl font-black text-gray-900 dark:text-gray-50">+20%</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Returns</div>
              </div>
              <div>
                <div className="text-4xl font-black text-gray-900 dark:text-gray-50">5</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">Active Positions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Everything you need to manage investments
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Powerful features designed for serious investors
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Real-time Tracking
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Monitor your investments with live updates and detailed analytics. Never miss a market move.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Performance Charts
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Visualize your portfolio growth with interactive charts and beautiful gradients.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Smart Insights
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Get actionable insights and intelligent recommendations to optimize your returns.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Lightning Fast
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Built on Next.js 16 with React 19. Blazing fast performance and instant page loads.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Bank-level Security
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Your data is encrypted and secure. We take privacy seriously.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg transition-transform group-hover:scale-110">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              Dark Mode
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Beautiful dark mode with perfect contrast. Easy on the eyes, day or night.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-16 text-center shadow-2xl sm:px-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to take control?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Start tracking your investments today. It's free and takes less than a minute.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
