# 🔧 Vercel Deployment Fix

## Issue: "No Next.js version detected"

El problema era que Vercel estaba intentando construir desde el root del monorepo en lugar de desde `apps/web`.

## ✅ Solution Applied

### 1. Added `apps/web/vercel.json`
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXTAUTH_URL": "https://investment-dashboard.vercel.app"
  }
}
```

### 2. Updated `apps/web/package.json`
Added `"engines": { "node": ">=18.0.0" }` to avoid auto-upgrade warnings.

### 3. Commits pushed
- Submodule: `c389d6a` - fix: Configure Vercel to deploy from apps/web
- Main repo: `298d880` - fix: Update web submodule with Vercel configuration

## 🚀 Next Steps for Vercel

1. Go to Vercel dashboard
2. Open project settings
3. **Root Directory**: Set to `apps/web`
4. **Build Command**: `npm run build`
5. **Output Directory**: `.next`
6. Trigger new deployment

## ✅ Verification

After these changes, Vercel should:
- ✅ Detect Next.js 16.1.6
- ✅ Build successfully
- ✅ Deploy to production

---

**Status**: Fixed and pushed to GitHub
**Commit**: 298d880
**Date**: 2026-01-30 01:08 UTC
