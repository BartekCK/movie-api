import { Router } from 'express';
import movieController from '../controllers/movieController';
import { authBearerTokenMiddleware } from '../middlewares/auth';
import errorHandler from '../utils/errorHandler';

const movieRouter: Router = Router();

movieRouter.post(
    '/',
    authBearerTokenMiddleware,
    errorHandler(movieController.createNewUserMoviePOST),
);
movieRouter.get(
    '/',
    authBearerTokenMiddleware,
    errorHandler(movieController.allUserMoviesGET),
);

export default movieRouter;
