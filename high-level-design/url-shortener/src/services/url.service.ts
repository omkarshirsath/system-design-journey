import { dbRun, dbGet } from '../infrastructure/db';
import redis from '../infrastructure/cache';
import { encodeBase62 } from '../utils/base62';

export class UrlService {
    /**
     * Shortens a URL: saves to DB, gets ID, generates base62 short_id, updates DB
     */
    static async shortenUrl(originalUrl: string): Promise<string> {
        // 1. Insert into DB to get Auto-Increment ID
        const result = await dbRun(
            `INSERT INTO urls (original_url) VALUES (?)`,
            [originalUrl]
        );
        const autoId = result.lastID;

        // 2. Generate Base62 short_id
        const shortId = encodeBase62(autoId);

        // 3. Update DB with short_id
        await dbRun(
            `UPDATE urls SET short_id = ? WHERE id = ?`,
            [shortId, autoId]
        );

        return shortId;
    }

    /**
     * Retrieves the original URL from Cache, then DB if miss.
     */
    static async getOriginalUrl(shortId: string): Promise<string | null> {
        // 1. Check Redis Cache
        const cacheKey = `url:${shortId}`;
        const cachedUrl = await redis.get(cacheKey);

        if (cachedUrl) {
            // Optional: asynchronously update click count
            this.incrementClickCount(shortId).catch(console.error);
            return cachedUrl;
        }

        // 2. Cache Miss -> Check DB
        const row = await dbGet<{ original_url: string }>(
            `SELECT original_url FROM urls WHERE short_id = ?`,
            [shortId]
        );

        if (!row) {
            return null;
        }

        // 3. Store in Cache for future hits (TTL: 24h)
        await redis.set(cacheKey, row.original_url, 'EX', 86400);

        // Optional: asynchronously update click count
        this.incrementClickCount(shortId).catch(console.error);

        return row.original_url;
    }

    private static async incrementClickCount(shortId: string): Promise<void> {
        await dbRun(`UPDATE urls SET click_count = click_count + 1 WHERE short_id = ?`, [shortId]);
    }
}
