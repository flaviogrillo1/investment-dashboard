"""
Quantitative calculations endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic models
class PositionMetrics(BaseModel):
    ticker: str
    currentValue: float
    costBasis: float
    unrealizedPnL: float
    unrealizedPnLPercent: float
    dailyChange: float
    dailyChangePercent: float


class PortfolioMetricsRequest(BaseModel):
    positions: List[dict]  # Array of Position objects
    baseCurrency: str = "EUR"
    benchmark: str = "SPY"
    riskFreeRate: float = 0.03


class PortfolioMetricsResponse(BaseModel):
    totalValue: float
    dailyPnL: float
    dailyPnLPercent: float
    totalPnL: float
    totalPnLPercent: float
    sharpeRatio: Optional[float]
    sortinoRatio: Optional[float]
    beta: Optional[float]
    maxDrawdown: Optional[float]
    var95: Optional[float]
    twr: Optional[float]
    irr: Optional[float]


@router.post("/portfolio", response_model=PortfolioMetricsResponse)
async def calculate_portfolio_metrics(request: PortfolioMetricsRequest):
    """
    Calculate portfolio-level metrics

    Includes:
    - Total value, P&L
    - Sharpe/Sortino ratios
    - Beta vs benchmark
    - Max drawdown
    - VaR (95%)
    - TWR and IRR
    """
    from app.services.quant_service import QuantService

    positions = request.positions

    # Basic calculations
    total_value = sum(p.get("currentValue", 0) for p in positions)
    total_cost = sum(p.get("costBasis", 0) for p in positions)

    total_pnl = total_value - total_cost
    total_pnl_percent = (total_pnl / total_cost * 100) if total_cost > 0 else 0

    daily_pnl = sum(p.get("dailyChange", 0) * p.get("quantity", 0) for p in positions)
    daily_pnl_percent = (daily_pnl / total_value * 100) if total_value > 0 else 0

    # Advanced metrics (if historical data available)
    sharpe = None
    sortino = None
    beta = None
    max_dd = None
    var_95 = None
    twr = None
    irr = None

    # These require historical data - placeholder for now
    # TODO: Integrate with historical price fetching

    return PortfolioMetricsResponse(
        totalValue=total_value,
        dailyPnL=daily_pnl,
        dailyPnLPercent=daily_pnl_percent,
        totalPnL=total_pnl,
        totalPnLPercent=total_pnl_percent,
        sharpeRatio=sharpe,
        sortinoRatio=sortino,
        beta=beta,
        maxDrawdown=max_dd,
        var95=var_95,
        twr=twr,
        irr=irr,
    )


@router.post("/position/{ticker}")
async def calculate_position_metrics(ticker: str, position: dict):
    """
    Calculate position-level metrics

    Includes:
    - Returns (daily, weekly, monthly)
    - Volatility (30d, 90d)
    - Beta vs benchmark
    - VaR
    """
    # TODO: Implement position-level calculations
    return {
        "ticker": ticker,
        "volatility30d": None,
        "volatility90d": None,
        "beta": None,
        "var95": None,
        "maxDrawdown": None
    }


@router.post("/convert")
async def convert_currency(
    amount: float,
    from_currency: str,
    to_currency: str,
    cache_service
):
    """
    Convert amount between currencies using FX rates

    Uses yfinance FX pairs (EURUSD=X, etc.)
    """
    from app.services.yfinance_service import YFinanceService

    yf_service = YFinanceService(cache_service)
    rate = yf_service.get_fx_rate(from_currency, to_currency)

    if rate is None:
        raise HTTPException(
            status_code=404,
            detail=f"FX rate not found for {from_currency}/{to_currency}"
        )

    return {
        "amount": amount,
        "from": from_currency,
        "to": to_currency,
        "rate": rate,
        "result": amount * rate
    }
