"""
yfinance service with caching and error handling
"""

import yfinance as yf
import logging
from typing import Optional, Dict, List
from datetime import datetime, timedelta
from .cache_service import CacheService

logger = logging.getLogger(__name__)


class YFinanceService:
    """Service for fetching market data from yfinance with caching"""

    def __init__(self, cache_service: CacheService):
        self.cache = cache_service

    def get_quote(self, ticker: str) -> Optional[Dict]:
        """
        Get current quote for a ticker

        Returns:
            Dict with: price, change, changePercent, currency, timestamp
        """
        # Check cache
        cached = self.cache.get_quote(ticker)
        if cached:
            logger.debug(f"Cache hit: {ticker}")
            return cached

        # Fetch from yfinance
        try:
            ticker_obj = yf.Ticker(ticker)
            hist = ticker_obj.history(period="2d")  # Get 2 days to calculate change

            if hist.empty:
                logger.error(f"No data for {ticker}")
                return None

            # Latest data
            latest = hist.iloc[-1]
            previous = hist.iloc[-2] if len(hist) > 1 else hist.iloc[-1]

            price = latest['Close']
            prev_close = previous['Close']

            change = price - prev_close
            change_percent = (change / prev_close) * 100 if prev_close != 0 else 0

            # Detect currency from ticker
            currency = self._detect_currency(ticker)

            data = {
                "ticker": ticker,
                "price": float(price),
                "change": float(change),
                "changePercent": float(change_percent),
                "currency": currency,
                "timestamp": datetime.now().isoformat()
            }

            # Cache for 30s
            self.cache.set_quote(ticker, data)

            return data

        except Exception as e:
            logger.error(f"Error fetching quote for {ticker}: {e}")
            return None

    def get_quotes_batch(self, tickers: List[str]) -> Dict[str, Optional[Dict]]:
        """
        Get quotes for multiple tickers

        Returns:
            Dict mapping ticker to quote data (None if error)
        """
        results = {}

        for ticker in tickers:
            results[ticker] = self.get_quote(ticker)

        return results

    def get_history(
        self,
        ticker: str,
        range: str = "1mo",
        interval: str = "1d"
    ) -> Optional[Dict]:
        """
        Get historical data for a ticker

        Args:
            ticker: Stock ticker
            range: 1d, 5d, 1mo, 6mo, 1y, 5y
            interval: 1m, 5m, 1h, 1d

        Returns:
            Dict with ticker and array of OHLCV data
        """
        # Check cache
        cached = self.cache.get_history(ticker, range, interval)
        if cached:
            logger.debug(f"Cache hit: {ticker} {range} {interval}")
            return cached

        # Fetch from yfinance
        try:
            ticker_obj = yf.Ticker(ticker)
            hist = ticker_obj.history(period=range, interval=interval)

            if hist.empty:
                logger.error(f"No history for {ticker} {range} {interval}")
                return None

            # Convert to list of dicts
            data = []
            for date, row in hist.iterrows():
                data.append({
                    "date": date.isoformat(),
                    "open": float(row['Open']),
                    "high": float(row['High']),
                    "low": float(row['Low']),
                    "close": float(row['Close']),
                    "volume": int(row['Volume'])
                })

            result = {
                "ticker": ticker,
                "data": data
            }

            # Cache with dynamic TTL
            self.cache.set_history(ticker, range, interval, result)

            return result

        except Exception as e:
            logger.error(f"Error fetching history for {ticker}: {e}")
            return None

    def get_info(self, ticker: str) -> Optional[Dict]:
        """Get comprehensive ticker info"""
        try:
            ticker_obj = yf.Ticker(ticker)
            info = ticker_obj.info

            if not info:
                return None

            # Extract relevant fields
            return {
                "ticker": ticker,
                "name": info.get("longName"),
                "marketCap": info.get("marketCap"),
                "pe": info.get("trailingPE"),
                "eps": info.get("epsTrailingTwelveMonths"),
                "dividendYield": info.get("dividendYield"),
                "beta": info.get("beta"),
                "sector": info.get("sector"),
                "industry": info.get("industry"),
                "currency": info.get("currency"),
                "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh"),
                "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow"),
            }

        except Exception as e:
            logger.error(f"Error fetching info for {ticker}: {e}")
            return None

    def get_fx_rate(self, base: str, quote: str) -> Optional[float]:
        """
        Get FX rate between two currencies

        Args:
            base: Base currency (EUR, USD, etc.)
            quote: Quote currency (EUR, USD, etc.)

        Returns:
            Exchange rate (amount of quote per 1 base)
        """
        if base == quote:
            return 1.0

        # Check cache
        cached = self.cache.get_fx_rate(base, quote)
        if cached:
            logger.debug(f"Cache hit: FX {base}/{quote}")
            return cached

        # Fetch from yfinance
        try:
            pair = f"{base}{quote}=X"
            ticker_obj = yf.Ticker(pair)
            hist = ticker_obj.history(period="1d")

            if hist.empty:
                logger.error(f"No FX data for {pair}")
                return None

            rate = float(hist['Close'].iloc[-1])

            # Cache for 1 hour
            self.cache.set_fx_rate(base, quote, rate)

            return rate

        except Exception as e:
            logger.error(f"Error fetching FX rate {base}/{quote}: {e}")
            return None

    def _detect_currency(self, ticker: str) -> str:
        """
        Detect currency from ticker suffix

        Examples:
            AAPL → USD
            ASML.ASX → EUR (Amsterdam)
            7203.T → JPY (Tokyo)
        """
        # Mapping of exchanges to currencies
        exchange_currency = {
            ".TO": "CAD",  # Toronto
            ".T": "JPY",   # Tokyo
            ".DE": "EUR",  # Xetra
            ".PA": "EUR",  # Paris
            ".AM": "EUR",  # Amsterdam
            ".L": "GBP",   # London
        }

        for suffix, currency in exchange_currency.items():
            if ticker.endswith(suffix):
                return currency

        # Default to USD
        return "USD"
