from fastapi import Request, HTTPException
from datetime import datetime, timedelta
from collections import defaultdict
import asyncio

class RateLimiter:
    """Simple in-memory rate limiter"""
    
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
        self.lock = asyncio.Lock()
    
    async def check_rate_limit(self, client_id: str):
        """Check if client has exceeded rate limit"""
        async with self.lock:
            now = datetime.now()
            minute_ago = now - timedelta(minutes=1)
            
            # Remove old requests
            self.requests[client_id] = [
                req_time for req_time in self.requests[client_id]
                if req_time > minute_ago
            ]
            
            # Check if limit exceeded
            if len(self.requests[client_id]) >= self.requests_per_minute:
                raise HTTPException(
                    status_code=429,
                    detail="Rate limit exceeded. Please try again later."
                )
            
            # Add current request
            self.requests[client_id].append(now)

# Global rate limiter instance
rate_limiter = RateLimiter()

async def rate_limit_dependency(request: Request):
    """Dependency to apply rate limiting"""
    client_id = request.client.host
    await rate_limiter.check_rate_limit(client_id)
