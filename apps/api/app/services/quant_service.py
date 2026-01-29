"""
Quantitative calculations service
"""

import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class QuantService:
    """Service for quantitative portfolio calculations"""

    @staticmethod
    def calculate_returns(prices: List[float]) -> List[float]:
        """
        Calculate daily returns from price series

        Args:
            prices: List of prices (chronological order)

        Returns:
            List of daily returns (length = len(prices) - 1)
        """
        returns = []
        for i in range(1, len(prices)):
            if prices[i-1] != 0:
                ret = (prices[i] - prices[i-1]) / prices[i-1]
                returns.append(ret)
        return returns

    @staticmethod
    def calculate_volatility(returns: List[float], annualize: bool = True) -> float:
        """
        Calculate volatility (standard deviation of returns)

        Args:
            returns: List of daily returns
            annualize: If True, multiply by sqrt(252)

        Returns:
            Volatility as decimal (0.20 = 20%)
        """
        if not returns:
            return 0.0

        std = np.std(returns)

        if annualize:
            std *= np.sqrt(252)  # 252 trading days per year

        return float(std)

    @staticmethod
    def calculate_sharpe_ratio(
        returns: List[float],
        risk_free_rate: float = 0.03,
        periods_per_year: int = 252
    ) -> float:
        """
        Calculate Sharpe Ratio

        Formula: (Rp - Rf) / σp

        Args:
            returns: List of daily returns
            risk_free_rate: Annual risk-free rate (default 3%)
            periods_per_year: 252 for daily

        Returns:
            Sharpe ratio
        """
        if not returns:
            return 0.0

        # Convert annual RF to daily
        daily_rf = risk_free_rate / periods_per_year

        # Excess returns
        excess_returns = np.array(returns) - daily_rf

        # Annualized values
        avg_excess_return = excess_returns.mean() * periods_per_year
        std_dev = np.std(returns) * np.sqrt(periods_per_year)

        if std_dev == 0:
            return 0.0

        return float(avg_excess_return / std_dev)

    @staticmethod
    def calculate_sortino_ratio(
        returns: List[float],
        risk_free_rate: float = 0.03,
        periods_per_year: int = 252
    ) -> float:
        """
        Calculate Sortino Ratio (downside deviation only)

        Formula: (Rp - Rf) / σ_down

        Args:
            returns: List of daily returns
            risk_free_rate: Annual risk-free rate
            periods_per_year: Trading days per year

        Returns:
            Sortino ratio
        """
        if not returns:
            return 0.0

        daily_rf = risk_free_rate / periods_per_year
        excess_returns = np.array(returns) - daily_rf

        # Downside deviation (only negative returns)
        downside_returns = excess_returns[excess_returns < 0]

        if len(downside_returns) == 0:
            return 0.0

        downside_dev = downside_returns.std() * np.sqrt(periods_per_year)
        avg_excess_return = excess_returns.mean() * periods_per_year

        if downside_dev == 0:
            return 0.0

        return float(avg_excess_return / downside_dev)

    @staticmethod
    def calculate_max_drawdown(values: List[float]) -> float:
        """
        Calculate Maximum Drawdown

        Formula: max((Peak - Trough) / Peak)

        Args:
            values: List of portfolio values over time

        Returns:
            Maximum drawdown as decimal (0.20 = 20%)
        """
        if not values:
            return 0.0

        values_array = np.array(values)

        # Running maximum (peak)
        running_max = np.maximum.accumulate(values_array)

        # Drawdown at each point
        drawdown = (values_array - running_max) / running_max

        # Maximum drawdown
        mdd = drawdown.min()

        return abs(float(mdd))

    @staticmethod
    def calculate_beta(
        portfolio_returns: List[float],
        benchmark_returns: List[float]
    ) -> float:
        """
        Calculate beta vs benchmark using linear regression

        Formula: Cov(Rp, Rm) / Var(Rm)

        Args:
            portfolio_returns: Daily returns of portfolio
            benchmark_returns: Daily returns of benchmark

        Returns:
            Beta (slope of regression line)
        """
        if len(portfolio_returns) != len(benchmark_returns):
            raise ValueError("Portfolio and benchmark returns must have same length")

        if len(portfolio_returns) < 2:
            return 1.0  # Default beta

        # Linear regression: portfolio = alpha + beta * benchmark
        covariance = np.cov(portfolio_returns, benchmark_returns)[0][1]
        variance = np.var(benchmark_returns)

        if variance == 0:
            return 1.0

        beta = covariance / variance

        return float(beta)

    @staticmethod
    def calculate_var(
        returns: List[float],
        portfolio_value: float,
        confidence_level: float = 0.95
    ) -> float:
        """
        Calculate Historical Value at Risk

        Args:
            returns: Array of historical returns
            portfolio_value: Current portfolio value
            confidence_level: 0.95 for 95% VaR

        Returns:
            VaR amount (positive = potential loss)
        """
        if not returns:
            return 0.0

        # Percentile (5th percentile for 95% VaR)
        alpha = 1 - confidence_level
        var_percentile = np.percentile(returns, alpha * 100)

        # VaR in currency units
        var_amount = abs(var_percentile * portfolio_value)

        return float(var_amount)

    @staticmethod
    def calculate_twr(
        portfolio_values: List[float],
        cash_flows: Dict[int, float]
    ) -> float:
        """
        Calculate Time-Weighted Return

        Formula: ∏(1 + Ri) - 1

        Where Ri = (EMVi - BMVi - CFi) / (BMVi + CFi/2)

        Args:
            portfolio_values: List of portfolio values over time
            cash_flows: Dict mapping index to cash flow amount

        Returns:
            TWR as decimal
        """
        if not portfolio_values:
            return 0.0

        twr = 1.0
        bm = portfolio_values[0]

        for i in range(1, len(portfolio_values)):
            em = portfolio_values[i]
            cf = cash_flows.get(i, 0)

            # Sub-period return
            denominator = bm + cf/2
            if denominator != 0:
                r = (em - bm - cf) / denominator
            else:
                r = 0

            # Chain-link
            twr *= (1 + r)
            bm = em

        return float(twr - 1)

    @staticmethod
    def calculate_xirr(
        cash_flows: List[Tuple[datetime, float]],
        guess: float = 0.1
    ) -> float:
        """
        Calculate Money-Weighted Return (XIRR) using Newton-Raphson

        Args:
            cash_flows: List of (date, amount) tuples
            guess: Initial guess for IRR

        Returns:
            Annualized IRR as decimal
        """
        if len(cash_flows) < 2:
            return 0.0

        # Sort by date
        cash_flows = sorted(cash_flows, key=lambda x: x[0])

        # Convert dates to days from first date
        start_date = cash_flows[0][0]
        days = [(cf[0] - start_date).days for cf in cash_flows]
        amounts = [cf[1] for cf in cash_flows]

        # Newton-Raphson iteration
        rate = guess
        max_iterations = 100
        tolerance = 1e-6

        for _ in range(max_iterations):
            npv = 0.0
            d_npv = 0.0

            for i, (day, amount) in enumerate(zip(days, amounts)):
                factor = (1 + rate) ** (day / 365.0)
                npv += amount / factor
                d_npv -= (day / 365.0) * amount / (factor * (1 + rate))

            if abs(npv) < tolerance:
                break

            if d_npv == 0:
                break

            rate = rate - npv / d_npv

        return float(rate)
