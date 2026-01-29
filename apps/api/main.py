"""
Investment Dashboard API
FastAPI application for managing investment portfolios, positions, and market data.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Investment Dashboard API",
    description="API for managing investment portfolios and market data",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Investment Dashboard API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


# Include routers (to be added)
# app.include_router(portfolios.router, prefix="/api/portfolios", tags=["portfolios"])
# app.include_router(positions.router, prefix="/api/positions", tags=["positions"])
# app.include_router(market.router, prefix="/api/market", tags=["market"])
