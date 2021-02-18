import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import defineRouting from './config/routes';
dotenv.config();

const server: Express = express();

const PORT: number | string = process.env.PORT || 8080;

defineRouting(server);
connectToDatabase();

server.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
