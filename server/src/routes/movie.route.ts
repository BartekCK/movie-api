import { Router } from 'express';
import movieController from '../controllers/movieController';
import { authBearerTokenMiddleware } from '../middlewares/auth';

const movieRouter: Router = Router();

movieRouter.post('/', authBearerTokenMiddleware, movieController.createNewUserMoviePOST);
movieRouter.get('/', authBearerTokenMiddleware, movieController.allUserMoviesGET);

export default movieRouter;
