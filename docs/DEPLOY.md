# Investment Dashboard - Deployment Guide

## 🚀 Quick Deploy

### Prerequisites

- GitHub account with repo
- Vercel account (connect GitHub)
- Neon account (PostgreSQL)
- Upstash account (Redis)

### Step 1: Deploy Frontend (Vercel)

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOURUSERNAME/investment-dashboard.git
git push -u origin main

# 2. Deploy to Vercel
# Go to https://vercel.com/new
# Import your GitHub repo
# Vercel will auto-detect Next.js

# 3. Configure environment variables in Vercel:
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
DATABASE_URL=postgresql://<user>:<password>@<neon-host>/neondb?sslmode=require
REDIS_URL=<upstash-redis-url>
NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

### Step 2: Deploy Backend (Railway)

```bash
# 1. Go to https://railway.app/new
# 2. Select "Deploy from GitHub repo"
# 3. Choose your repo
# 4. Configure:

# Root directory: apps/api
# Start command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

# 5. Add environment variables:
DATABASE_URL=<same as Neon>
REDIS_URL=<same as Upstash>

# 6. Deploy!
# Railway will give you a URL like: https://your-api.railway.app
```

### Step 3: Setup Database

```bash
# 1. Create Neon account: https://neon.tech
# 2. Create new project
# 3. Get DATABASE_URL
# 4. Run migrations:

npx prisma generate
npx prisma db push

# 5. Seed demo data:
npm run db:seed
```

### Step 4: Setup Redis (Upstash)

```bash
# 1. Create Upstash account: https://upstash.com
# 2. Create new Redis database
# 3. Get REST API URL and token
# 4. Add to environment variables:
REDIS_URL=redis://default:password@host:port
```

### Step 5: Setup Google OAuth (NextAuth)

```bash
# 1. Go to https://console.cloud.google.com/
# 2. Create new project
# 3. Enable Google+ API
# 4. Create OAuth 2.0 credentials:
#    - Application type: Web application
#    - Authorized redirect URIs:
#      - http://localhost:3000/api/auth/callback/google
#      - https://your-app.vercel.app/api/auth/callback/google

# 5. Add to environment variables:
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

---

## 🔧 Local Development

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker & Docker Compose

### Setup

```bash
# 1. Clone repo
git clone https://github.com/YOURUSERNAME/investment-dashboard.git
cd investment-dashboard

# 2. Install dependencies
npm install
cd apps/api && pip install -r requirements.txt

# 3. Copy environment
cp .env.example .env
# Edit .env with your keys

# 4. Start databases (Docker)
docker-compose up -d postgres redis

# 5. Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# 6. Start dev servers
npm run dev

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API docs: http://localhost:8000/docs
```

---

## 📊 Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth secret | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App URL | `https://your-app.vercel.app` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | `GOCSPX-xxx` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
| `ALPHAVANTAGE_API_KEY` | Fallback data source | - |
| `FINNHUB_API_KEY` | Real-time data fallback | - |
| `RESEND_API_KEY` | Email alerts | - |
| `TELEGRAM_BOT_TOKEN` | Telegram alerts | - |

---

## 🐛 Troubleshooting

### yfinance Rate Limits

**Problem**: `YFRateLimitError: Too Many Requests`

**Solution**:
- Enable Redis caching (required)
- Reduce polling frequency
- Use longer TTL for history cache

### Vercel Build Failures

**Problem**: Build fails in Vercel

**Solution**:
```bash
# Clear Vercel cache
vercel env rm NEXTAUTH_SECRET
# Re-add and redeploy
```

### Railway Connection Issues

**Problem**: Can't connect to API

**Solution**:
- Check `PORT` environment variable (Railway sets this)
- Verify `DATABASE_URL` and `REDIS_URL`
- Check Railway logs

---

## 📈 Monitoring

### Vercel Analytics

- Dashboard: Vercel → Project → Analytics
- Metrics: Page views, unique visitors, top pages

### Railway Metrics

- Dashboard: Railway → Project → Metrics
- Metrics: CPU, memory, response time

### Upstash Redis

- Dashboard: Upstash → Redis Database
- Metrics: Commands, memory, hit rate

---

## 🔐 Security Checklist

- [ ] Never commit `.env` files
- [ ] Use `NEXTAUTH_SECRET` in production
- [ ] Enable SSL on database
- [ ] Use read-only database user when possible
- [ ] Rate limit public API endpoints
- [ ] Validate all user inputs
- [ ] Sanitize database queries (Prisma handles this)

---

## 🚀 Production Checklist

- [ ] All environment variables set
- [ ] Database migrations deployed
- [ ] Demo data removed (or labeled)
- [ ] Google OAuth callback URLs configured
- [ ] Redis caching enabled
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics enabled
- [ ] Custom domain configured
- [ ] SSL enabled
- [ ] Backup strategy in place

---

*Last updated: 2025-01-29*
