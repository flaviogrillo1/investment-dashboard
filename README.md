# Investment Dashboard

Professional investment portfolio dashboard with real-time market data, quantitative analytics, and multi-user support.

**Status**: 🚧 In Development - Core API ready, frontend in progress

---

## ✅ What's Done

### Backend (FastAPI + yfinance)
- ✅ FastAPI application structure
- ✅ yfinance integration with Redis caching
- ✅ Quote endpoints (single & batch)
- ✅ Historical data endpoints
- ✅ FX rate conversion
- ✅ Quant calculation endpoints (structure)
- ✅ Error handling & logging
- ✅ Vercel/Railway deployment configs

### Database (Prisma + PostgreSQL)
- ✅ Complete schema (User, Portfolio, Position, Transaction, Watchlist, Alert)
- ✅ NextAuth integration (Google OAuth)
- ✅ Seed file with demo data
- ✅ Multi-currency support (EUR/USD)
- ✅ Audit fields (createdAt, updatedAt)

### Documentation
- ✅ Complete deployment guide (Vercel + Railway)
- ✅ Quant calculations guide (formulas + Python code)
- ✅ Project plan & architecture
- ✅ Environment variables reference

### Project Structure
- ✅ Monorepo setup (apps/web + apps/api + packages/)
- ✅ Shared TypeScript types
- ✅ Docker Compose for local dev
- ✅ .gitignore & package.json configs

---

## 🚧 In Progress

### Frontend (Next.js + shadcn/ui)
- ⏳ Dashboard layout & navigation
- ⏳ Auth pages (NextAuth + Google)
- ⏳ Portfolio table & CRUD
- ⏳ Charts & visualizations (Recharts)
- ⏳ Real-time quotes display

### Quant Calculations
- ⏳ TWR implementation
- ⏳ IRR/XIRR implementation
- ⏳ Sharpe/Sortino ratios
- ⏳ Beta calculation
- ⏳ VaR & Max Drawdown

---

## 📋 What's Next

1. **Complete backend quant calculations** (2-3 hours)
2. **Build frontend dashboard pages** (3-4 hours)
3. **Implement CRUD forms** (2 hours)
4. **Test & fix bugs** (1-2 hours)
5. **Deploy to production** (1 hour)

**Estimated completion**: 8-12 hours of focused work

---

## 🚀 Quick Start (Local)

```bash
# Clone & install
git clone https://github.com/YOURUSERNAME/investment-dashboard.git
cd investment-dashboard
npm install
cd apps/api && pip install -r requirements.txt

# Start databases
docker-compose up -d postgres redis

# Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# Start dev servers
npm run dev
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API docs: http://localhost:8000/docs
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui, Recharts
- **Backend**: FastAPI, Python, yfinance
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Cache**: Upstash Redis
- **Auth**: NextAuth v5 (Google OAuth)
- **Deploy**: Vercel (frontend) + Railway (backend)

---

## 📊 Features

### Phase 1 (MVP)
- ✅ Auth (NextAuth + Google)
- ⏳ Portfolio CRUD
- ✅ Real-time quotes (yfinance)
- ⏳ Dashboard with KPIs
- ⏳ Holdings table
- ⏳ Basic charts

### Phase 2 (Core)
- ⏳ Transactions CRUD
- ⏳ Quant metrics (TWR, IRR, Sharpe, Beta, VaR)
- ⏳ Historical charts
- ⏳ News feed
- ⏳ Watchlist

### Phase 3 (Pro)
- ⏳ Alerts system (Cron + Email/Telegram)
- ⏳ Advanced analytics
- ⏳ Export to CSV/PDF
- ⏳ Mobile app (React Native)

---

## 📖 Documentation

- [Deployment Guide](./docs/DEPLOY.md) - Step-by-step Vercel/Railway deployment
- [Quant Guide](./docs/QUANT-GUIDE.md) - Calculation methodologies & formulas
- [Project Plan](./PROJECT-PLAN.md) - Architecture & roadmap

---

## 🔐 Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - App URL
- `REDIS_URL` - Upstash Redis
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth

---

## 📄 License

MIT

---

**Built by Spencer's team** 🤖 | Guardian 🛡️ | Casper 🏠 | Sage 📚 | Builder 🛠️ | Keeper 🧠

**Progress**: Backend 70% complete | Frontend 10% complete | Ready for frontend development
