import Link from 'next/link';
import { ArrowRight, BarChart3, LineChart, TrendingUp, Shield, Zap, Rocket, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-slate-200/[0.4] dark:bg-grid-slate-800/[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/[0.4] dark:bg-grid-slate-800/[0.3]" />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto mb-12 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 text-5xl shadow-2xl shadow-blue-600/30">
              📈
            </div>

            {/* Heading */}
            <h1 className="text-6xl font-black tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-8xl">
              Investment
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Dashboard
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300 sm:text-2xl">
              Monitoriza el rendimiento de tu portfolio en tiempo real. Obtén insights poderosos, gráficos hermosos y toma decisiones de inversión inteligentes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-3xl hover:shadow-blue-600/40"
              >
                Ver Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-300 bg-white px-10 py-5 text-lg font-bold text-gray-800 shadow-xl transition-all hover:border-gray-400 hover:bg-gray-50 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Gestionar Portfolio
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-10 sm:gap-20">
              <div className="transform transition-transform hover:scale-105">
                <div className="text-5xl font-black text-gray-900 dark:text-white">$57K+</div>
                <div className="mt-3 text-base font-bold text-gray-700 dark:text-gray-300">Valor Portfolio</div>
              </div>
              <div className="transform transition-transform hover:scale-105">
                <div className="text-5xl font-black text-gray-900 dark:text-white">+20%</div>
                <div className="mt-3 text-base font-bold text-gray-700 dark:text-gray-300">Retorno Total</div>
              </div>
              <div className="transform transition-transform hover:scale-105">
                <div className="text-5xl font-black text-gray-900 dark:text-white">5</div>
                <div className="mt-3 text-base font-bold text-gray-700 dark:text-gray-300">Posiciones Activas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Todo lo que necesitas para gestionar inversiones
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
            Características potentes diseñadas para inversores serios
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group transform overflow-hidden rounded-3xl border-2 border-gray-200/80 bg-white p-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-4xl dark:border-gray-800/80 dark:bg-gray-900">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <LineChart className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Tracking en Tiempo Real
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Monitorea tus inversiones con actualizaciones en vivo y analytics detallados. Nunca te pierdas un movimiento del mercado.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group transform overflow-hidden rounded-3xl border-2 border-gray-200/80 bg-white p-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-4xl dark:border-gray-800/80 dark:bg-gray-900">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Gráficos de Rendimiento
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Visualiza el crecimiento de tu portfolio con gráficos interactivos y gradientes hermosos.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group transform overflow-hidden rounded-3xl border-2 border-gray-200/80 bg-white p-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-4xl dark:border-gray-800/80 dark:bg-gray-900">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Smart Insights
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Obtén insights accionables y recomendaciones inteligentes para optimizar tus retornos.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group transform overflow-hidden rounded-3xl border-2 border-gray-200/80 bg-white p-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-4xl dark:border-gray-800/80 dark:bg-gray-900">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Ultra Rápido
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Construido con Next.js 16 y React 19. Performance extrema y loads instantáneos.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group transform overflow-hidden rounded-3xl border-2 border-gray-200/80 bg-white p-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-4xl dark:border-gray-800/80 dark:bg-gray-900">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Seguridad Bancaria
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Tus datos están encriptados y seguros. Tomamos la privacidad muy en serio.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group transform overflow-hidden rounded-3xl border-2 border-gray-200/80 bg-white p-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-4xl dark:border-gray-800/80 dark:bg-gray-900">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              Dark Mode
            </h3>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Modo oscuro hermoso con contraste perfecto. Cómodo día y noche.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-10 py-24 text-center shadow-3xl sm:px-20">
          <Rocket className="mx-auto mb-8 h-20 w-20 text-white/90" />
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            ¿Listo para tomar el control?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
            Comienza a rastrear tus inversiones hoy. Es gratis y toma menos de un minuto.
          </p>
          <Link
            href="/dashboard"
            className="mt-12 inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-12 py-6 text-lg font-bold text-blue-700 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
          >
            Comenzar Ahora
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
