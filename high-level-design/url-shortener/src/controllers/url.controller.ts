import { Request, Response } from 'express';
import { z } from 'zod';
import { UrlService } from '../services/url.service';

const shortenSchema = z.object({
    originalUrl: z.string().url("Invalid URL format")
});

export class UrlController {
    static async shorten(req: Request, res: Response): Promise<void> {
        try {
            const parsed = shortenSchema.safeParse(req.body);
            if (!parsed.success) {
                res.status(400).json({ error: parsed.error.errors[0].message });
                return;
            }

            const shortId = await UrlService.shortenUrl(parsed.data.originalUrl);
            const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

            res.status(201).json({ shortUrl, shortId });
        } catch (error) {
            console.error("Shorten Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async redirect(req: Request, res: Response): Promise<void> {
        try {
            const { shortId } = req.params;
            
            if (!shortId || typeof shortId !== 'string') {
                res.status(400).json({ error: "Invalid shortId" });
                return;
            }

            const originalUrl = await UrlService.getOriginalUrl(shortId);

            if (!originalUrl) {
                res.status(404).json({ error: "URL not found" });
                return;
            }

            res.redirect(302, originalUrl);
        } catch (error) {
            console.error("Redirect Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
