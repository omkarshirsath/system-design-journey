import Redis from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';

// Load from global .env
dotenv.config({ path: path.resolve(__dirname, '../../../../../.env') });

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    console.warn("REDIS_URL not found in .env. Falling back to localhost.");
}

const redis = new Redis(redisUrl || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        return Math.min(times * 50, 2000);
    }
});

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

export default redis;
