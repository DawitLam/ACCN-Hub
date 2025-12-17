// Simple in-memory rate limiter
// For production, use Redis-based solution like express-rate-limit with Redis store

const requestCounts = new Map();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (now - value.resetTime > 3600000) {
      requestCounts.delete(key);
    }
  }
}, 3600000);

const rateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests, please try again later'
  } = options;

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requestCounts.has(key)) {
      requestCounts.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return next();
    }

    const requestData = requestCounts.get(key);

    if (now > requestData.resetTime) {
      requestData.count = 1;
      requestData.resetTime = now + windowMs;
      return next();
    }

    if (requestData.count >= max) {
      return res.status(429).json({
        success: false,
        message
      });
    }

    requestData.count++;
    next();
  };
};

// Stricter rate limit for auth routes (TEMPORARILY DISABLED for testing)
const authRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Increased from 5 to 1000 for testing
  message: 'Too many login attempts, please try again after 15 minutes'
});

// Standard rate limit for API routes
const apiRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100
});

module.exports = { authRateLimiter, apiRateLimiter };
