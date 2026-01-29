"""
Cache service using Redis
"""

import redis
import json
import logging
from typing import Optional, Any
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)


class CacheService:
    """Redis cache service with TTL management"""

    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        try:
            value = self.redis.get(key)
            if value:
                return json.loads(value)
        except Exception as e:
            logger.warning(f"Cache get error: {e}")
        return None

    def set(self, key: str, value: Any, ttl_seconds: int = 30) -> bool:
        """Set value in cache with TTL"""
        try:
            serialized = json.dumps(value, default=str)
            self.redis.setex(key, ttl_seconds, serialized)
            return True
        except Exception as e:
            logger.warning(f"Cache set error: {e}")
            return False

    def delete(self, key: str) -> bool:
        """Delete key from cache"""
        try:
            self.redis.delete(key)
            return True
        except Exception as e:
            logger.warning(f"Cache delete error: {e}")
            return False

    def get_quote(self, ticker: str) -> Optional[dict]:
        """Get cached quote (30s TTL)"""
        return self.get(f"quote:{ticker}")

    def set_quote(self, ticker: str, data: dict) -> bool:
        """Cache quote (30s TTL)"""
        return self.set(f"quote:{ticker}", data, ttl_seconds=30)

    def get_history(self, ticker: str, range: str, interval: str) -> Optional[dict]:
        """Get cached history (5-30min TTL based on range)"""
        return self.get(f"history:{ticker}:{range}:{interval}")

    def set_history(self, ticker: str, range: str, interval: str, data: dict) -> bool:
        """Cache history with dynamic TTL"""
        # Longer TTL for longer ranges
        ttl_map = {
            "1d": 300,      # 5 min
            "5d": 900,      # 15 min
            "1mo": 1800,    # 30 min
            "6mo": 3600,    # 1 hour
            "1y": 7200,     # 2 hours
            "5y": 14400,    # 4 hours
        }
        ttl = ttl_map.get(range, 1800)
        return self.set(f"history:{ticker}:{range}:{interval}", data, ttl_seconds=ttl)

    def get_fx_rate(self, base: str, quote: str) -> Optional[float]:
        """Get cached FX rate (1h TTL)"""
        return self.get(f"fx:{base}:{quote}")

    def set_fx_rate(self, base: str, quote: str, rate: float) -> bool:
        """Cache FX rate (1h TTL)"""
        return self.set(f"fx:{base}:{quote}", rate, ttl_seconds=3600)
