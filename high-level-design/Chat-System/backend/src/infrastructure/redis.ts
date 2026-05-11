import Redis from 'ioredis';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Auto-enable TLS if the URL contains rediss:// or if it's an Upstash endpoint
const useTls = redisUrl.startsWith('rediss://') || redisUrl.includes('upstash.io');

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  enableOfflineQueue: true,
  tls: useTls ? { rejectUnauthorized: false } : undefined,
  retryStrategy: (times) => {
    if (times > 3) return null;
    return Math.min(times * 100, 3000);
  },
});

redis.on('connect', () => logger.info('Redis Connected Successfully'));
redis.on('error', (err) => {
  if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
    logger.warn(`Redis connection failed to ${redisUrl}. Ensure your REDIS_URL is correct. Online status tracking will be limited.`);
  } else {
    logger.error('Redis Error:', err);
  }
});
