# Quantitative Finance Guide

## 1. yfinance Best Practices

### Rate Limits
- **Limit**: ~60 requests/minute for Yahoo Finance API
- **Strategy**: Cache aggressively (30s TTL for quotes, 5-30min for history)
- **Retry**: Exponential backoff on 429 errors
- **Avoid**: Rapid polling, batch requests with many tickers

### Data Reliability
- **Issue**: yfinance is unofficial, can be blocked or return stale data
- **Mitigation**:
  - Validate data (price changes >20% are suspicious)
  - Use multiple sources when possible
  - Have fallback (Alpha Vantage, Finnhub)
  - Cache to reduce calls

### Endpoints to Use
```python
import yfinance as yf

# Get ticker info
ticker = yf.Ticker("AAPL")
info = ticker.info  # Comprehensive info
fast_info = ticker.fast_info  # Quick access

# Historical data
hist = ticker.history(period="1mo", interval="1d")

# Latest price
ticker.history(period="1d")['Close'].iloc[-1]

# Multiple tickers (use loop, not batch)
tickers = ["AAPL", "MSFT", "GOOGL"]
data = {t: yf.Ticker(t).history(period="1d")['Close'].iloc[-1] for t in tickers}
```

### Caching Strategy
```python
import redis
import json
import hashlib

def cache_key(ticker):
    return f"quote:{ticker}"

def get_quote_cached(ticker, redis_client):
    # Check cache
    key = cache_key(ticker)
    cached = redis_client.get(key)
    if cached:
        return json.loads(cached)

    # Fetch from yfinance
    data = yf.Ticker(ticker).history(period="1d")
    price = data['Close'].iloc[-1]

    # Store in cache (30s TTL)
    redis_client.setex(key, 30, json.dumps({"price": price, "ts": now()}))

    return price
```

---

## 2. Quant Calculations

### Time-Weighted Return (TWR)

**Formula**:
$$TWR = \prod_{i=1}^{n} (1 + R_i) - 1$$

Where $R_i$ is the return for sub-period $i$.

**With cash flows**:
$$R_i = \frac{EMV_i - BMV_i - CF_i}{BMV_i + CF_i/2}$$

- $EMV_i$: Ending market value
- $BMV_i$: Beginning market value
- $CF_i$: Cash flow during period

**Python implementation**:
```python
def calculate_twr(portfolio_values, cash_flows):
    """
    Calculate Time-Weighted Return

    Args:
        portfolio_values: List of portfolio values over time
        cash_flows: Dict of {date: cash_flow_amount}

    Returns:
        TWR as decimal (0.10 = 10%)
    """
    twr = 1.0
    bm = portfolio_values[0]

    for i in range(1, len(portfolio_values)):
        em = portfolio_values[i]
        cf = cash_flows.get(i, 0)

        # Sub-period return
        r = (em - bm - cf) / (bm + cf/2) if (bm + cf/2) != 0 else 0

        # Chain-link
        twr *= (1 + r)
        bm = em

    return twr - 1
```

**For multiple positions**:
```python
def portfolio_twr(positions, transactions, start_date, end_date):
    """
    Calculate TWR for entire portfolio

    Steps:
    1. Get all transactions sorted by date
    2. Create sub-periods around cash flows
    3. Calculate return for each sub-period
    4. Chain-link returns
    """
    # Implementation requires date-based partitioning
    # around cash flow events
    pass
```

---

### Money-Weighted Return (IRR/XIRR)

**Formula**: Find $r$ such that:
$$\sum_{t=0}^{T} \frac{CF_t}{(1+r)^t} = 0$$

**Using pyxirr** (recommended):
```python
from pyxirr import xirr
from datetime import datetime

# Cash flows: [(date, amount), ...]
# Negative = outflow (buy), Positive = inflow (sell/dividend)
cash_flows = [
    (datetime(2024, 1, 1), -10000),  # Initial investment
    (datetime(2024, 2, 1), -5000),    # Additional buy
    (datetime(2024, 6, 1), 500),      # Dividend
    (datetime(2024, 12, 31), 18000),  # Current value
]

irr = xirr(cash_flows)
# Returns: 0.1234 (12.34% annual)
```

**Using numpy-financial**:
```python
import numpy_financial as npf

# For regular periodic cash flows
cash_flows = [-10000, -5000, 500, 18000]
irr = npf.irr(cash_flows)
```

**Edge cases**:
- Multiple IRR solutions (sign changes in CF)
- No solution (all positive or all negative)
- Very large dates range (convergence issues)

---

### Sharpe Ratio

**Formula**:
$$Sharpe = \frac{R_p - R_f}{\sigma_p}$$

- $R_p$: Portfolio return (annualized)
- $R_f$: Risk-free rate (annualized)
- $\sigma_p$: Portfolio standard deviation (annualized)

**Python**:
```python
import numpy as np

def sharpe_ratio(returns, risk_free_rate=0.03, periods_per_year=252):
    """
    Calculate Sharpe Ratio

    Args:
        returns: Array of daily returns
        risk_free_rate: Annual risk-free rate (default 3%)
        periods_per_year: 252 for daily, 52 for weekly

    Returns:
        Sharpe ratio
    """
    # Convert annual RF to daily
    daily_rf = risk_free_rate / periods_per_year

    # Excess returns
    excess_returns = returns - daily_rf

    # Annualized values
    avg_excess_return = excess_returns.mean() * periods_per_year
    std_dev = returns.std() * np.sqrt(periods_per_year)

    return avg_excess_return / std_dev
```

**Risk-free rate assumptions**:
- EUR: ECB deposit rate (~3-4%)
- USD: US Treasury bills (~5%)
- Use 10-year government bond as proxy

---

### Sortino Ratio

**Formula**:
$$Sortino = \frac{R_p - R_f}{\sigma_{down}}$$

Where $\sigma_{down}$ is downside deviation (only negative returns).

**Python**:
```python
def sortino_ratio(returns, risk_free_rate=0.03, periods_per_year=252):
    """
    Calculate Sortino Ratio (downside risk only)
    """
    daily_rf = risk_free_rate / periods_per_year
    excess_returns = returns - daily_rf

    # Downside deviation (only negative returns)
    downside_returns = excess_returns[excess_returns < 0]
    downside_dev = downside_returns.std() * np.sqrt(periods_per_year)

    avg_excess_return = excess_returns.mean() * periods_per_year

    return avg_excess_return / downside_dev
```

---

### Beta Calculation

**Formula**:
$$\beta = \frac{Cov(R_p, R_m)}{Var(R_m)}$$

**Using regression**:
```python
from scipy import stats

def calculate_beta(portfolio_returns, benchmark_returns):
    """
    Calculate beta vs benchmark

    Args:
        portfolio_returns: Daily returns of portfolio
        benchmark_returns: Daily returns of benchmark (e.g., SPY)

    Returns:
        beta (slope of regression line)
    """
    # Linear regression: portfolio = alpha + beta * benchmark
    beta, alpha, r_value, p_value, std_err = stats.linregress(
        benchmark_returns, portfolio_returns
    )

    return beta

# Example
import yfinance as yf

# Fetch data
portfolio_tickers = ["AAPL", "MSFT", "GOOGL"]
benchmark_ticker = "SPY"

# Get historical prices
data = yf.download(portfolio_tickers + [benchmark_ticker], period="1y")["Adj Close"]

# Calculate daily returns
returns = data.pct_change().dropna()

# Portfolio returns (equal weight)
portfolio_returns = returns[portfolio_tickers].mean(axis=1)
benchmark_returns = returns[benchmark_ticker]

# Calculate beta
beta = calculate_beta(portfolio_returns, benchmark_returns)
# Beta > 1: Higher volatility than market
# Beta < 1: Lower volatility than market
```

---

### Value at Risk (VaR)

**Historical Method** (chosen for implementation):
$$VaR_{\alpha} = \text{percentile}(returns, \alpha) \times PortfolioValue$$

For 95% VaR (5% worst case):
```python
import numpy as np

def historical_var(returns, portfolio_value, confidence_level=0.95):
    """
    Calculate Historical VaR

    Args:
        returns: Array of historical returns (daily)
        portfolio_value: Current portfolio value
        confidence_level: 0.95 for 95% VaR

    Returns:
        VaR amount (positive number = potential loss)
    """
    # Percentile (5th percentile for 95% VaR)
    alpha = 1 - confidence_level
    var_percentile = np.percentile(returns, alpha * 100)

    # VaR in currency units
    var_amount = abs(var_percentile * portfolio_value)

    return var_amount

# Example
returns = [-0.02, -0.01, 0.01, 0.02, -0.03, 0.01, ...]  # Daily returns
portfolio_value = 25000  # EUR
var_95 = historical_var(returns, portfolio_value, confidence_level=0.95)
# Interpretation: 95% confident daily loss won't exceed var_95
```

**Parametric VaR** (alternative):
```python
from scipy.stats import norm

def parametric_var(returns, portfolio_value, confidence_level=0.95):
    """
    Calculate Parametric VaR (assumes normal distribution)
    """
    mean = returns.mean()
    std = returns.std()

    # Z-score for confidence level
    z_score = norm.ppf(1 - confidence_level)

    # VaR
    var = (mean - z_score * std) * portfolio_value

    return abs(var)
```

**Recommendation**: Use historical VaR (more robust, no distribution assumptions).

---

### Max Drawdown

**Formula**:
$$MDD = \frac{Peak - Trough}{Peak}$$

**Python**:
```python
def max_drawdown(portfolio_values):
    """
    Calculate Maximum Drawdown

    Args:
        portfolio_values: Array of portfolio values over time

    Returns:
        Max drawdown as decimal (0.20 = 20% drop)
    """
    values = np.array(portfolio_values)

    # Running maximum (peak)
    running_max = np.maximum.accumulate(values)

    # Drawdown at each point
    drawdown = (values - running_max) / running_max

    # Maximum drawdown
    mdd = drawdown.min()

    return abs(mdd)

# Example
values = [10000, 10500, 10200, 9800, 11000, 10800, 12000]
mdd = max_drawdown(values)
# Returns: 0.0667 (6.67% max drop from 10500 to 9800)
```

---

## 3. Currency Conversion

### Using yfinance
```python
def get_fx_rate(base_currency, quote_currency):
    """
    Get FX rate from yfinance

    Examples:
        EURUSD=X → 1.09 (1 EUR = 1.09 USD)
        EURGBP=X → 0.86 (1 EUR = 0.86 GBP)
    """
    if base_currency == quote_currency:
        return 1.0

    pair = f"{base_currency}{quote_currency}=X"
    ticker = yf.Ticker(pair)
    data = ticker.history(period="1d")

    if data.empty:
        raise ValueError(f"FX pair {pair} not found")

    return data['Close'].iloc[-1]

# Examples
eur_usd = get_fx_rate("EUR", "USD")  # 1 EUR in USD
usd_eur = get_fx_rate("USD", "EUR")  # 1 USD in EUR

# Convert portfolio value
usd_portfolio = 25000
eur_value = usd_portfolio * usd_eur
```

### Caching Strategy
```python
def get_fx_rate_cached(base, quote, redis_client):
    """
    FX rates change less frequently than stock prices
    Cache: 1 hour TTL
    """
    key = f"fx:{base}:{quote}"

    # Check cache
    cached = redis_client.get(key)
    if cached:
        return float(cached)

    # Fetch
    rate = get_fx_rate(base, quote)

    # Cache for 1 hour
    redis_client.setex(key, 3600, str(rate))

    return rate
```

### Handling Missing Data
```python
def safe_convert(amount, from_currency, to_currency, redis_client):
    """
    Convert currency with fallbacks
    """
    try:
        rate = get_fx_rate_cached(from_currency, to_currency, redis_client)
        return amount * rate
    except Exception as e:
        # Fallback 1: Inverse rate
        try:
            rate_inv = 1.0 / get_fx_rate_cached(to_currency, from_currency, redis_client)
            return amount * rate_inv
        except:
            # Fallback 2: Use hardcoded rate (last resort)
            hardcoded_rates = {
                ("EUR", "USD"): 1.09,
                ("USD", "EUR"): 0.92,
            }
            if (from_currency, to_currency) in hardcoded_rates:
                return amount * hardcoded_rates[(from_currency, to_currency)]

            raise ValueError(f"Cannot convert {from_currency} to {to_currency}")
```

---

## 4. Portfolio Value Calculation

### Multi-Currency Portfolio
```python
def calculate_portfolio_value(positions, base_currency="EUR", redis_client=None):
    """
    Calculate total portfolio value in base currency

    Args:
        positions: List of Position objects
        base_currency: Target currency (EUR or USD)
        redis_client: Redis client for FX caching

    Returns:
        Total value in base currency
    """
    total = 0.0

    for pos in positions:
        # Position value in its own currency
        pos_value = pos.quantity * pos.currentPrice

        # Convert to base currency
        if pos.currency == base_currency:
            total += pos_value
        else:
            rate = get_fx_rate_cached(pos.currency, base_currency, redis_client)
            total += pos_value * rate

    return total
```

---

## 5. Assumptions & Edge Cases

### Assumptions
1. **Risk-free rate**: 3% annual (ECB deposit rate for EUR, 10Y Treasury for USD)
2. **Trading days**: 252 per year
3. **Benchmark**: SPY for USD portfolios, ^GDAXI for EUR
4. **VaR confidence**: 95% (industry standard)
5. **Lookback period**: 1 year for volatility/beta calculations

### Edge Cases
1. **New positions** (<30 days): Use industry average volatility
2. **Illiquid stocks**: Skip beta calculation, use sector beta
3. **Multiple currencies**: Convert all to base currency before calculations
4. **Corporate actions**: Adjust for splits/dividends in price history
5. **Missing data**: Use last available price, flag for review

---

## 6. Testing

### Unit Tests
```python
def test_twr():
    values = [100, 110, 105, 115, 120]
    flows = {1: 10, 3: -5}
    twr = calculate_twr(values, flows)
    assert abs(twr - 0.20) < 0.01  # ~20% return

def test_sharpe():
    returns = np.array([0.01, 0.02, -0.01, 0.03, 0.01])
    sharpe = sharpe_ratio(returns, 0.03)
    assert sharpe > 0  # Positive Sharpe

def test_max_dd():
    values = [100, 120, 110, 130, 90, 100]
    mdd = max_drawdown(values)
    assert abs(mdd - 0.307) < 0.01  # ~30.7% max drop
```

---

*Generated by Spencer's team | Sage 📚 | 2025-01-29*
