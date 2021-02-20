import express, { Express } from 'express';
import http from 'http';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// config
import { connectToDatabase } from './config/database';

// routes
import defineRouting from './config/routes';

// middlewares
import errorMiddleware from './middlewares/error';

const app: Express = express();

const PORT: number | string = process.env.PORT || 8080;

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

defineRouting(app);

if (process.env.NODE_ENV !== 'test') {
    connectToDatabase();
}

app.use(errorMiddleware);

export const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`APP MODE ${process.env.NODE_ENV}`);
    console.log(`App started on port ${PORT}`);
});
