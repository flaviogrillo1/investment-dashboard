# Investment Dashboard - Project Plan

## 📊 Overview

Professional investment portfolio dashboard with real-time market data, quantitative analytics, and multi-user support.

**Target**: Flavio's personal investment management
**Stack**: Next.js 14 + FastAPI + PostgreSQL + yfinance
**Deploy**: Vercel (frontend) + Vercel Python/Railway (backend)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge                          │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 (App Router)                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Dashboard  │  │    Auth     │  │    CRUD     │        │
│  │   Pages     │  │  (NextAuth) │  │   Forms     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                │                │                 │
│         └────────────────┴────────────────┘                 │
│                          │                                 │
│                          ▼                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              API Routes (Next.js)                    │  │
│  │  /api/quotes, /api/history, /api/news, /api/portfolio│  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  FastAPI Microservice (Vercel Python / Railway)            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  yfinance   │  │    Redis    │  │  Calculations│        │
│  │  Integration│  │   (Upstash) │  │   (Quant)    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  PostgreSQL (Neon) + Prisma ORM                             │
│  Users | Portfolios | Positions | Transactions | Watchlist │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Monorepo Structure

```
investment-dashboard/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   └── login/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/          # Main dashboard
│   │   │   │   ├── portfolio/          # Holdings list
│   │   │   │   ├── ticker/[ticker]/    # Ticker detail
│   │   │   │   ├── transactions/       # CRUD
│   │   │   │   ├── watchlist/          # Watchlist
│   │   │   │   └── settings/           # User config
│   │   │   └── api/                    # API routes
│   │   ├── components/
│   │   │   ├── ui/                     # shadcn/ui
│   │   │   ├── dashboard/              # Dashboard components
│   │   │   ├── portfolio/              # Portfolio tables
│   │   │   └── charts/                 # Recharts wrappers
│   │   └── lib/
│   │       ├── db/                     # Prisma client
│   │       ├── auth/                   # NextAuth config
│   │       └── utils/                  # Helpers
│   │
│   └── api/                     # FastAPI backend
│       ├── app/
│       │   ├── main.py
│       │   ├── api/
│       │   │   ├── quotes.py
│       │   │   ├── history.py
│       │   │   ├── news.py
│       │   │   └── calculations.py
│       │   ├── services/
│       │   │   ├── yfinance_service.py
│       │   │   ├── cache_service.py
│       │   │   └── quant_service.py
│       │   └── models/
│       │       └── schemas.py
│       ├── requirements.txt
│       └── vercel.json                # Vercel Python config
│
├── packages/
│   ├── db/                           # Prisma schema
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── seed.ts
│   ├── types/                        # Shared types
│   │   └── index.ts
│   └── config/                       # Shared config
│
├── docs/
│   ├── QUANT-GUIDE.md               # Sage's research
│   ├── DEPLOY.md                    # Deployment guide
│   └── API.md                       # API documentation
│
├── .env.example
├── docker-compose.yml               # Local development
└── README.md
```

---

## 🧮 Quant Calculations

### Implemented Metrics

1. **Portfolio-Level**
   - Total Value (base currency: EUR/USD)
   - Daily P&L (abs + %)
   - Total P&L vs Cost Basis
   - Time-Weighted Return (TWR)
   - Money-Weighted Return (IRR/XIRR)
   - Sharpe Ratio
   - Sortino Ratio
   - Max Drawdown
   - Value at Risk (VaR) - Historical method
   - Beta (vs benchmark: SPY default, configurable)

2. **Position-Level**
   - Current Value
   - Cost Basis
   - Unrealized P&L
   - Weight in portfolio
   - Daily change (%)
   - Volatility (30d, 90d)

### Methodology

**TWR**: Chain-link returns with cash flows at period boundaries
**IRR**: XIRR solver using scipy/numpy_financial
**Sharpe**: (Rp - Rf) / σp (daily → annualized)
**Beta**: Cov(Rp, Rm) / Var(Rm) using regression
**VaR**: 5th percentile of historical returns (1-year lookback)
**Max DD**: max((peak - trough) / peak)

All calculations documented in `docs/QUANT-GUIDE.md`

---

## 🔄 Data Flow

### 1. User adds position
```
Frontend → API Route → Prisma → PostgreSQL
          ↓
    Trigger recalculation
          ↓
    Fetch quote (yfinance) → Cache (Redis)
          ↓
    Update metrics → Return to frontend
```

### 2. Dashboard loads
```
Frontend → API Route → Prisma (get all positions)
          ↓
    Batch fetch quotes → Check cache
          ↓
    Cache miss → yfinance → Store in Redis (TTL 30s)
          ↓
    Calculate metrics → Return
```

### 3. Historical data
```
Frontend → API Route → Check cache (TTL 5-30min)
          ↓
    Cache miss → yfinance history → Store
          ↓
    Calculate returns/drawdown → Return
```

---

## 🔐 Auth & Multi-User

**Provider**: NextAuth v5 (beta)
**OAuth**: Google

```
User Table (Prisma):
- id (UUID, primary key)
- email (unique)
- name
- image (avatar)
- createdAt
- updatedAt

Portfolio (one per user or multiple):
- id
- userId (foreign key)
- name
- baseCurrency (EUR/USD)
- benchmark (SPY/MSCI World)
- riskFreeRate

Isolation: All queries filter by userId
```

---

## 🚀 Deployment

### Vercel (Next.js)
```bash
# Connect GitHub repo
# Auto-detect Next.js
# Environment variables:
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<random>
DATABASE_URL=postgresql://<neon-url>
REDIS_URL=<upstash-url>
NEXT_PUBLIC_API_URL=https://<api-url>
```

### FastAPI Backend
**Option A**: Vercel Python (serverless)
```python
# vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/api/app/main.py",
      "use": "@vercel/python"
    }
  ]
}
```

**Option B**: Railway/Render (Docker)
```yaml
# docker-compose.yml for production
services:
  api:
    build: ./apps/api
    ports: ["8000:8000"]
    env_file: .env
```

### Database
**Neon** (recommended)
```bash
# Create account
# Create project
# Get DATABASE_URL
# Run: npx prisma migrate deploy
```

---

## 📊 Features

### Phase 1 (MVP)
- ✅ Auth (NextAuth + Google)
- ✅ Portfolio CRUD
- ✅ Real-time quotes (yfinance)
- ✅ Dashboard with KPIs
- ✅ Holdings table
- ✅ Basic charts (Equity curve, Allocation)

### Phase 2 (Core)
- ✅ Transactions CRUD
- ✅ Quant metrics (TWR, IRR, Sharpe, Beta, VaR)
- ✅ Historical charts
- ✅ News feed (RSS)
- ✅ Watchlist
- ✅ Multi-currency (EUR/USD)

### Phase 3 (Pro)
- ⏳ Alerts system (Cron + Email/Telegram)
- ⏳ Advanced analytics
- ⏳ Export to CSV/PDF
- ⏳ Mobile app (React Native)

---

## 🎨 UI/UX

**Design**: Professional fintech, minimal
**Dark mode**: Yes (default)
**Responsive**: Mobile-first
**Components**: shadcn/ui
**Charts**: Recharts
**Tables**: TanStack Table + React Query for caching

---

## 📝 Next Steps

1. ✅ **Builder**: Creating scaffold (in progress)
2. ✅ **Sage**: Researching quant calculations (in progress)
3. ⏳ **Builder + Sage**: Implement FastAPI + yfinance
4. ⏳ **Builder**: NextAuth + Prisma schema
5. ⏳ **Builder**: Frontend dashboard pages
6. ⏳ **Sage + Builder**: Quant calculations integration
7. ⏳ **Sage**: Deployment documentation

---

*Project initiated: 2025-01-29 by Spencer's team*
