# Investment Dashboard API

## Health Check

This FastAPI application is running!

### Available Endpoints

- `GET /api/health` - Health check
- `GET /api/quotes/{ticker}` - Get stock quote
- `POST /api/quotes` - Batch quotes
- `POST /api/history` - Historical data
- `POST /api/calculations/portfolio` - Portfolio metrics
- `POST /api/calculations/position/{ticker}` - Position metrics

### Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `YFINANCE_DELAY` - Rate limiting delay (default: 0.5s)
