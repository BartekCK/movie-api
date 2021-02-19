import { Router } from 'express';

// controllers
import movieController from '../controllers/movieController';

// middlewares
import { authBearerTokenMiddleware, checkRoles } from '../middlewares/auth';

// utils
import errorHandler from '../utils/errorHandler';

const movieRouter: Router = Router();

movieRouter.post('/', authBearerTokenMiddleware, checkRoles, errorHandler(movieController.createNewUserMoviePOST));
movieRouter.get('/', authBearerTokenMiddleware, errorHandler(movieController.allUserMoviesGET));

movieRouter.get('/test', (req, res) => {
    res.status(200).send('Udalo sie');
});

export default movieRouter;
