import { Router } from 'express';
import movieController from '../controllers/movieController';

const movieRouter: Router = Router();

movieRouter.post('/', movieController.createNewUserMoviePOST);
movieRouter.get('/', movieController.allUserMoviesGET);

export default movieRouter;
