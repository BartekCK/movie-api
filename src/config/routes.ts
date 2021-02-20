import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
// routes
import movieRouter from '../routes/movie.route';

// constants
import { API_MAIN_ROUTE } from '../constants';

// json
import swaggerDocument from '../swagger.json';

const defineRouting = (server: Express): void => {
    server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    server.use(`${API_MAIN_ROUTE}/movies`, movieRouter);
};

export default defineRouting;
