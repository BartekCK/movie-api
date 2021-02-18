import { Express } from 'express';

// routes
import movieRouter from '../routes/movie.route';

// constants
import { API_MAIN_ROUTE } from '../constants';

const defineRouting = (server: Express): void => {
    server.use(`${API_MAIN_ROUTE}/movies`, movieRouter);
};

export default defineRouting;
