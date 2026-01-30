"""
Quantitative calculations endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Tuple
from datetime import datetime, timedelta
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


class PositionMetricsRequest(BaseModel):
    ticker: str
    quantity: float
    avgCost: float
    currentPrice: float
    benchmark: str = "SPY"
    lookbackDays: int = 90


class PositionMetricsResponse(BaseModel):
    ticker: str
    currentValue: float
    costBasis: float
    unrealizedPnL: float
    unrealizedPnLPercent: float
    dailyChange: float
    dailyChangePercent: float
    volatility30d: Optional[float]
    volatility90d: Optional[float]
    beta: Optional[float]
    var95: Optional[float]
    maxDrawdown: Optional[float]


def get_cache_service():
    """Dependency to get cache service"""
    from app.services.cache_service import CacheService
    import redis
    import os

    redis_client = redis.from_url(
        os.getenv("REDIS_URL", "redis://localhost:6379"),
        decode_responses=True
    )
    return CacheService(redis_client)


@router.post("/portfolio", response_model=PortfolioMetricsResponse)
async def calculate_portfolio_metrics(
    request: PortfolioMetricsRequest,
    cache_service = Depends(get_cache_service)
):
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
    from app.services.yfinance_service import YFinanceService

    positions = request.positions
    quant_service = QuantService()
    yf_service = YFinanceService(cache_service)

    # Basic calculations
    total_value = sum(p.get("currentValue", 0) for p in positions)
    total_cost = sum(p.get("costBasis", 0) for p in positions)

    total_pnl = total_value - total_cost
    total_pnl_percent = (total_pnl / total_cost * 100) if total_cost > 0 else 0

    daily_pnl = sum(p.get("dailyChange", 0) * p.get("quantity", 0) for p in positions)
    daily_pnl_percent = (daily_pnl / total_value * 100) if total_value > 0 else 0

    # Advanced metrics (require historical data)
    sharpe = None
    sortino = None
    beta = None
    max_dd = None
    var_95 = None
    twr = None
    irr = None

    try:
        # Get historical data for the portfolio
        tickers = [p.get("ticker") for p in positions if p.get("ticker")]
        if not tickers:
            raise ValueError("No valid tickers in positions")

        # Fetch historical data for portfolio (1 year)
        portfolio_history = yf_service.get_history(
            request.benchmark,
            range="1y",
            interval="1d"
        )

        benchmark_history = yf_service.get_history(
            request.benchmark,
            range="1y",
            interval="1d"
        )

        if portfolio_history and benchmark_history:
            # Calculate returns
            portfolio_prices = [d["close"] for d in portfolio_history["data"]]
            benchmark_prices = [d["close"] for d in benchmark_history["data"]]

            portfolio_returns = quant_service.calculate_returns(portfolio_prices)
            benchmark_returns = quant_service.calculate_returns(benchmark_prices)

            if portfolio_returns:
                # Sharpe Ratio
                sharpe = quant_service.calculate_sharpe_ratio(
                    portfolio_returns,
                    request.riskFreeRate
                )

                # Sortino Ratio
                sortino = quant_service.calculate_sortino_ratio(
                    portfolio_returns,
                    request.riskFreeRate
                )

                # Max Drawdown
                max_dd = quant_service.calculate_max_drawdown(portfolio_prices)

                # VaR (95%)
                var_95 = quant_service.calculate_var(
                    portfolio_returns,
                    total_value,
                    0.95
                )

                # Beta
                if len(portfolio_returns) == len(benchmark_returns):
                    beta = quant_service.calculate_beta(
                        portfolio_returns,
                        benchmark_returns
                    )

            # TWR (using portfolio value series)
            twr = quant_service.calculate_twr(portfolio_prices, {})

    except Exception as e:
        logger.warning(f"Could not calculate advanced metrics: {e}")
        # Advanced metrics remain None if calculation fails

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


@router.post("/position/{ticker}", response_model=PositionMetricsResponse)
async def calculate_position_metrics(
    ticker: str,
    request: PositionMetricsRequest,
    cache_service = Depends(get_cache_service)
):
    """
    Calculate position-level metrics

    Includes:
    - Returns (daily, weekly, monthly)
    - Volatility (30d, 90d)
    - Beta vs benchmark
    - VaR
    - Max Drawdown
    """
    from app.services.quant_service import QuantService
    from app.services.yfinance_service import YFinanceService

    quant_service = QuantService()
    yf_service = YFinanceService(cache_service)

    # Basic position metrics
    current_value = request.quantity * request.currentPrice
    cost_basis = request.quantity * request.avgCost
    unrealized_pnl = current_value - cost_basis
    unrealized_pnl_percent = (unrealized_pnl / cost_basis * 100) if cost_basis > 0 else 0

    # Get historical quote for daily change
    quote = yf_service.get_quote(ticker)
    daily_change = quote.get("change", 0) if quote else 0
    daily_change_percent = quote.get("changePercent", 0) if quote else 0

    # Advanced metrics
    volatility_30d = None
    volatility_90d = None
    beta = None
    var_95 = None
    max_dd = None

    try:
        # Get historical data
        history_90d = yf_service.get_history(ticker, range="3mo", interval="1d")

        if history_90d and len(history_90d["data"]) >= 30:
            prices = [d["close"] for d in history_90d["data"]]
            returns = quant_service.calculate_returns(prices)

            if returns:
                # Volatility 90d
                volatility_90d = quant_service.calculate_volatility(returns, annualize=True)

                # Volatility 30d (last 30 days)
                if len(returns) >= 30:
                    returns_30d = returns[-30:]
                    volatility_30d = quant_service.calculate_volatility(returns_30d, annualize=True)

                # Max Drawdown
                max_dd = quant_service.calculate_max_drawdown(prices)

                # VaR (95%)
                var_95 = quant_service.calculate_var(returns, current_value, 0.95)

                # Beta vs benchmark
                benchmark_history = yf_service.get_history(request.benchmark, range="3mo", interval="1d")
                if benchmark_history and len(benchmark_history["data"]) >= len(returns):
                    benchmark_prices = [d["close"] for d in benchmark_history["data"][-len(returns):]]
                    benchmark_returns = quant_service.calculate_returns(benchmark_prices)

                    if len(returns) == len(benchmark_returns):
                        beta = quant_service.calculate_beta(returns, benchmark_returns)

    except Exception as e:
        logger.warning(f"Could not calculate advanced metrics for {ticker}: {e}")

    return PositionMetricsResponse(
        ticker=ticker,
        currentValue=current_value,
        costBasis=cost_basis,
        unrealizedPnL=unrealized_pnl,
        unrealizedPnLPercent=unrealized_pnl_percent,
        dailyChange=daily_change,
        dailyChangePercent=daily_change_percent,
        volatility30d=volatility_30d,
        volatility90d=volatility_90d,
        beta=beta,
        var95=var_95,
        maxDrawdown=max_dd
    )


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
