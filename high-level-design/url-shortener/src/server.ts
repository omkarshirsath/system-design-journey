import express from 'express';
import { UrlController } from './controllers/url.controller';

const app = express();
app.use(express.json());

app.post('/shorten', UrlController.shorten);
app.get('/:shortId', UrlController.redirect);

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`URL Shortener API listening on port ${port}`);
    });
}

export default app;
