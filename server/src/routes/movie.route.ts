import { Router } from 'express';
import movieController from '../controllers/movieController';
import { authBearerTokenMiddleware, checkRoles } from '../middlewares/auth';
import errorHandler from '../utils/errorHandler';

const movieRouter: Router = Router();

movieRouter.post('/', authBearerTokenMiddleware, checkRoles, errorHandler(movieController.createNewUserMoviePOST));
movieRouter.get('/', authBearerTokenMiddleware, errorHandler(movieController.allUserMoviesGET));

export default movieRouter;
