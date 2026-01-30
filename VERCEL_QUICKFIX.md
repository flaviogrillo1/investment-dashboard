# ⚡ Vercel Quick Fix

## One-Minute Solution

The error "No Next.js version detected" happens because Vercel is looking at the **root** of the monorepo, but Next.js is in `apps/web`.

---

## 🔧 Fix (30 seconds)

1. Open: https://vercel.com/flaviogrillo1s-projects/investment-dashboard/settings/general
2. Scroll to **"Root Directory"**
3. Change: `./` → `apps/web`
4. Click **Save**
5. Deployment will trigger automatically

---

## ✅ Done!

Vercel will now:
- Detect Next.js 16.1.6
- Build successfully
- Deploy your app

---

**Still stuck?** See VERCEL_DIAGNOSIS.md for full details.
