# 🚀 Backend Deployment Instructions

## Status: ✅ Ready for Deployment

El backend API está completamente configurado y listo para desplegar en Railway.

---

## 📋 Pre-requisitos

1. **Cuenta en Railway** [https://railway.app/](https://railway.app/)
2. **Cuenta en Neon** (PostgreSQL) [https://neon.tech/](https://neon.tech/)
3. **Cuenta en Upstash** (Redis) [https://upstash.com/](https://upstash.com/)

---

## 🚀 Paso a Paso

### 1. Desplegar Backend en Railway

1. Ir a [https://railway.app/new](https://railway.app/new)
2. Click en "Deploy from GitHub repo"
3. Seleccionar `flaviogrillo1/investment-dashboard`
4. Configurar:
   - **Root directory**: `apps/api`
   - **Start command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Dockerfile path**: `Dockerfile`

5. Añadir variables de entorno:
   ```bash
   DATABASE_URL=<neon-postgres-url>
   REDIS_URL=<upstash-redis-url>
   YFINANCE_DELAY=0.5
   ```

6. Click en "Deploy"

### 2. Crear Base de Datos en Neon

1. Ir a [https://neon.tech/](https://neon.tech/)
2. Crear nuevo proyecto
3. Copiar connection string
4. Añadir a Railway como `DATABASE_URL`

### 3. Crear Redis en Upstash

1. Ir a [https://upstash.com/](https://upstash.com/)
2. Crear nuevo Redis database
3. Copiar REST API URL
4. Añadir a Railway como `REDIS_URL`

### 4. Actualizar Frontend

Una vez el backend esté desplegado, actualizar la variable de entorno en Vercel:

```bash
NEXT_PUBLIC_API_URL=https://tu-backend-railway.railway.app
```

---

## ✅ Verificación

```bash
# Health check
curl https://tu-backend.railway.app/health

# Debe retornar:
{
  "status": "healthy",
  "redis": "connected"
}
```

---

## 📊 Proyecto Actual

**Completado**: 80%
- ✅ Frontend: https://web-nu-nine-56.vercel.app
- ⏳ Backend: Pendiente de deployment
- ✅ GitHub: https://github.com/flaviogrillo1/investment-dashboard

---

## 🤖 Auto-generado por Spencer

Commit actual: `fb2ff22`
Fecha: 2026-01-30
