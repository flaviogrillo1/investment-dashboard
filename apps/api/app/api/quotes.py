"""
Market data endpoints: quotes
"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import logging

from app.services.yfinance_service import YFinanceService
from app.services.cache_service import CacheService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic models
class QuoteRequest(BaseModel):
    tickers: List[str]


class QuoteResponse(BaseModel):
    ticker: str
    price: float
    change: float
    changePercent: float
    currency: str
    timestamp: str


class QuoteError(BaseModel):
    ticker: str
    error: str


class QuotesBatchResponse(BaseModel):
    quotes: List[QuoteResponse]
    errors: List[QuoteError]


@router.post("/", response_model=QuotesBatchResponse)
async def get_quotes(
    request: QuoteRequest,
    cache_service: CacheService
) -> QuotesBatchResponse:
    """
    Get current quotes for multiple tickers

    Caches quotes for 30 seconds to reduce yfinance API calls.
    """
    yf_service = YFinanceService(cache_service)

    quotes = []
    errors = []

    # Fetch quotes (with caching)
    results = yf_service.get_quotes_batch(request.tickers)

    for ticker, data in results.items():
        if data:
            quotes.append(QuoteResponse(**data))
        else:
            errors.append(QuoteError(
                ticker=ticker,
                error="Failed to fetch quote"
            ))

    return QuotesBatchResponse(quotes=quotes, errors=errors)


@router.get("/{ticker}", response_model=QuoteResponse)
async def get_quote(
    ticker: str,
    cache_service: CacheService
) -> QuoteResponse:
    """
    Get current quote for a single ticker
    """
    yf_service = YFinanceService(cache_service)
    data = yf_service.get_quote(ticker)

    if not data:
        raise HTTPException(status_code=404, detail=f"Quote not found for {ticker}")

    return QuoteResponse(**data)


@router.get("/{ticker}/info")
async def get_ticker_info(
    ticker: str,
    cache_service: CacheService
):
    """
    Get comprehensive ticker information

    Includes: market cap, P/E, EPS, dividend yield, beta, sector, etc.
    """
    yf_service = YFinanceService(cache_service)
    info = yf_service.get_info(ticker)

    if not info:
        raise HTTPException(status_code=404, detail=f"Info not found for {ticker}")

    return info
