from collections import defaultdict, deque
from threading import Lock
from time import time
from typing import Deque, Dict, Tuple


class RateLimiter:
    def __init__(self, limit: int = 5, window_seconds: int = 60) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self._requests: Dict[str, Deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key: str) -> Tuple[bool, int]:
        with self._lock:
            now = time()
            bucket = self._requests[key]
            cutoff = now - self.window_seconds
            while bucket and bucket[0] <= cutoff:
                bucket.popleft()
            if len(bucket) < self.limit:
                bucket.append(now)
                return True, self.limit - len(bucket)
            return False, 0
