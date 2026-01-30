"""
FastAPI application for Investment Dashboard
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import redis
import os

from app.api import quotes, history, calculations
from app.services.cache_service import CacheService

# Redis client
redis_client = redis.from_url(
    os.getenv("REDIS_URL", "redis://localhost:6379"),
    decode_responses=True
)

cache_service = CacheService(redis_client)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events"""
    # Startup
    print("🚀 Investment Dashboard API starting...")
    print(f"📊 Redis connected: {os.getenv('REDIS_URL', 'redis://localhost:6379')}")
    yield
    # Shutdown
    print("👋 Investment Dashboard API shutting down...")


app = FastAPI(
    title="Investment Dashboard API",
    description="API for managing investment portfolios and market data",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://web-nu-nine-56.vercel.app",
        os.getenv("NEXT_PUBLIC_API_URL", "http://localhost:3000"),
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(quotes.router, prefix="/api/quotes", tags=["Market Data"])
app.include_router(history.router, prefix="/api/history", tags=["Market Data"])
app.include_router(calculations.router, prefix="/api/calculations", tags=["Quant"])


@app.get("/")
async def root():
    return {
        "message": "Investment Dashboard API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    try:
        # Test Redis
        redis_client.ping()
        return {
            "status": "healthy",
            "redis": "connected"
        }
    except Exception as e:
        return {
            "status": "degraded",
            "redis": f"disconnected: {str(e)}"
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
