import request from 'supertest';
import app from '../src/server';
import db from '../src/infrastructure/db';
import redis from '../src/infrastructure/cache';

describe('URL Shortener API', () => {
    afterAll(async () => {
        // Cleanup resources
        await new Promise<void>((resolve, reject) => {
            db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await redis.quit();
    });

    let createdShortId: string;

    it('should create a short URL', async () => {
        const res = await request(app)
            .post('/shorten')
            .send({ originalUrl: 'https://example.com/test-path' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('shortUrl');
        expect(res.body).toHaveProperty('shortId');
        
        createdShortId = res.body.shortId;
    });

    it('should reject invalid URLs', async () => {
        const res = await request(app)
            .post('/shorten')
            .send({ originalUrl: 'not-a-valid-url' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid URL format');
    });

    it('should redirect to original URL via DB (Cache Miss)', async () => {
        const res = await request(app)
            .get(`/${createdShortId}`);

        expect(res.status).toBe(302);
        expect(res.header.location).toBe('https://example.com/test-path');
    });

    it('should redirect to original URL via Cache (Cache Hit)', async () => {
        // Since the previous request populated the cache, this should hit it
        const res = await request(app)
            .get(`/${createdShortId}`);

        expect(res.status).toBe(302);
        expect(res.header.location).toBe('https://example.com/test-path');
    });

    it('should return 404 for unknown short ID', async () => {
        const res = await request(app)
            .get('/unknown_id');

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('URL not found');
    });
});
