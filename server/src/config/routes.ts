import movieRouter from '../routes/movie.route';
import { Express } from 'express';

const API_MAIN_ROUTE: string = '/api/v1';

const defineRouting = (server: Express): void => {
    server.use(`${API_MAIN_ROUTE}/movies`, movieRouter);
};

export default defineRouting;
