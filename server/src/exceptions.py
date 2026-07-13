class ServiceError(Exception):
    pass


class NotFoundError(ServiceError):
    pass


class ValidationError(ServiceError):
    pass


class RateLimitExceeded(ServiceError):
    pass
