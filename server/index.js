import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { registerRoutes } from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

await registerRoutes(httpServer, app);

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

