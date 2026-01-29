// Shared TypeScript types for Investment Dashboard

// ============================================
// COMMON
// ============================================

export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY';

export type AssetType =
  | 'EQUITY'
  | 'ETF'
  | 'CRYPTO'
  | 'FUND'
  | 'BOND'
  | 'COMMODITY'
  | 'OTHER';

export type TransactionType =
  | 'BUY'
  | 'SELL'
  | 'DIVIDEND'
  | 'FEE'
  | 'DEPOSIT'
  | 'WITHDRAWAL';

export type AlertType =
  | 'PRICE_TARGET'
  | 'PERCENT_CHANGE'
  | 'DROPS_BELOW'
  | 'RISES_ABOVE';

// ============================================
// PORTFOLIO
// ============================================

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  baseCurrency: Currency;
  benchmark: string;
  riskFreeRate: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// POSITION
// ============================================

export interface Position {
  id: string;
  portfolioId: string;
  ticker: string;
  name?: string;
  assetType: AssetType;
  currency: Currency;
  quantity: number;
  avgCost: number;
  broker?: string;
  tags: string[];
  notes?: string;

  // Calculated fields
  currentPrice?: number;
  currentValue?: number;
  costBasis?: number;
  unrealizedPnL?: number;
  unrealizedPnLPercent?: number;
  weight?: number;

  // Performance metrics
  dailyChange?: number;
  dailyChangePercent?: number;
  volatility30d?: number;
  volatility90d?: number;
  beta?: number;

  lastPriceUpdate?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// TRANSACTION
// ============================================

export interface Transaction {
  id: string;
  positionId?: string;
  portfolioId: string;
  type: TransactionType;
  date: string;
  quantity: number;
  price: number;
  currency: Currency;
  fees: number;
  notes?: string;
  totalValue: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// WATCHLIST
// ============================================

export interface Watchlist {
  id: string;
  portfolioId: string;
  ticker: string;
  name?: string;
  notes?: string;
  addedAt: string;

  // Calculated fields
  currentPrice?: number;
  dailyChange?: number;
  dailyChangePercent?: number;
  lastPriceUpdate?: string;
}

// ============================================
// ALERT
// ============================================

export interface Alert {
  id: string;
  portfolioId: string;
  ticker?: string;
  type: AlertType;
  condition: string; // JSON string
  targetPrice?: number;
  targetChangePercent?: number;
  active: boolean;
  triggered: boolean;
  triggeredAt?: string;
  notified: boolean;
  notificationSentAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// MARKET DATA
// ============================================

export interface Quote {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  currency: Currency;
  timestamp: string;
}

export interface HistoricalData {
  ticker: string;
  data: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

export interface NewsItem {
  id: string;
  ticker: string;
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

// ============================================
// PORTFOLIO METRICS
// ============================================

export interface PortfolioMetrics {
  totalValue: number;
  dailyPnL: number;
  dailyPnLPercent: number;
  totalPnL: number;
  totalPnLPercent: number;
  dividendYield?: number;
  volatility30d?: number;
  volatility90d?: number;
  maxDrawdown?: number;
  sharpeRatio?: number;
  sortinoRatio?: number;
  beta?: number;
  var95?: number; // Value at Risk 95%
  twr?: number; // Time-Weighted Return
  irr?: number; // Money-Weighted Return (XIRR)
}

// ============================================
// API REQUESTS/RESPONSES
// ============================================

export interface GetQuotesRequest {
  tickers: string[];
}

export interface GetQuotesResponse {
  quotes: Quote[];
  errors?: {
    ticker: string;
    error: string;
  }[];
}

export interface GetHistoryRequest {
  ticker: string;
  range: '1d' | '5d' | '1mo' | '6mo' | '1y' | '5y';
  interval?: '1m' | '5m' | '1h' | '1d';
}

export interface CreatePositionRequest {
  ticker: string;
  quantity: number;
  avgCost: number;
  currency: Currency;
  name?: string;
  assetType?: AssetType;
  broker?: string;
  tags?: string[];
  notes?: string;
}

export interface UpdatePositionRequest {
  quantity?: number;
  avgCost?: number;
  notes?: string;
  tags?: string[];
}

export interface CreateTransactionRequest {
  positionId?: string;
  ticker?: string; // If positionId not provided
  type: TransactionType;
  date: string;
  quantity: number;
  price: number;
  currency: Currency;
  fees?: number;
  notes?: string;
}
