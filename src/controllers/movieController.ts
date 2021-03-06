import { Response } from 'express';

// services
import movieService from '../services/movieService';

// types
import { HttpStatus } from '../types/enums';
import { RequestBody } from '../types';
import { IMovieCreateDTO, IMovieDTO } from '../dto';

const movieController = {
    createNewUserMoviePOST: async (req: RequestBody<IMovieCreateDTO>, res: Response) => {
        const newMovie: IMovieDTO = await movieService.createNewMovie(req.user, req.body.title);
        res.status(HttpStatus.Created).send(newMovie);
    },

    allUserMoviesGET: async (req: RequestBody<any>, res: Response) => {
        const { userId } = req.user;
        const movies: IMovieDTO[] = await movieService.getAllUserMovies(userId);
        res.status(HttpStatus.OK).send(movies);
    },
};

export default movieController;
