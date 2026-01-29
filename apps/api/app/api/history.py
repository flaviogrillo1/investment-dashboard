"""
Market data endpoints: historical data
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
import logging

from app.services.yfinance_service import YFinanceService
from app.services.cache_service import CacheService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic models
class HistoryRequest(BaseModel):
    ticker: str
    range: Literal["1d", "5d", "1mo", "6mo", "1y", "5y"] = "1mo"
    interval: Literal["1m", "5m", "1h", "1d"] = "1d"


@router.post("/")
async def get_history(
    request: HistoryRequest,
    cache_service: CacheService
):
    """
    Get historical OHLCV data for a ticker

    Caches data with TTL based on range:
    - 1d: 5 min
    - 5d: 15 min
    - 1mo: 30 min
    - 6mo: 1 hour
    - 1y: 2 hours
    - 5y: 4 hours
    """
    yf_service = YFinanceService(cache_service)
    data = yf_service.get_history(
        request.ticker,
        range=request.range,
        interval=request.interval
    )

    if not data:
        raise HTTPException(
            status_code=404,
            detail=f"Historical data not found for {request.ticker}"
        )

    return data
