import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import defineRouting from './config/routes';
import errorMiddleware from './middlewares/error';
import morgan from 'morgan';

dotenv.config();

const server: Express = express();

const PORT: number | string = process.env.PORT || 8080;

server.use(morgan('combined'));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

defineRouting(server);
connectToDatabase();

server.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`APP MODE ${process.env.NODE_ENV}`);
    console.log(`App started on port ${PORT}`);
});

export default server;
