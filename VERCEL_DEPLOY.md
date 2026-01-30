# 🔧 Vercel Deployment Instructions

## ⚠️ Important: Root Directory Configuration

Due to the monorepo structure, you **MUST** configure Vercel to build from the `apps/web` directory.

### Steps:

1. Go to: https://vercel.com/flaviogrillo1s-projects/settings
2. Scroll to **"Root Directory"**
3. Enter: `apps/web`
4. Click **"Save"**
5. Trigger a new deployment

## Why?

The project is a monorepo with:
- `apps/web` - Next.js frontend ← **This is what we deploy**
- `apps/api` - FastAPI backend (deployed separately to Railway)
- `packages/db` - Shared Prisma schema

Vercel needs to know to only build the frontend, not the entire monorepo.

## ✅ Verification

After setting Root Directory to `apps/web`, Vercel should:
- ✅ Detect Next.js 16.1.6
- ✅ Build successfully
- ✅ Deploy to production

## 📊 Current Status

- **GitHub**: https://github.com/flaviogrillo1/investment-dashboard
- **Frontend**: Should deploy from `apps/web`
- **Backend**: Deploy separately to Railway (see DEPLOYMENT_TODO.md)

---

**Last updated**: 2026-01-30 01:12 UTC
**Commit**: 521f0bc
