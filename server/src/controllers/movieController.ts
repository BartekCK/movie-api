import { Request, Response } from 'express';
import { RequestBody } from '../types';
import { IMovieCreateDTO, IMovieDTO } from '../dto';
import movieService from '../services/movieService';
import { HttpStatus } from '../types/enums';

const movieController = {
    createNewUserMoviePOST: async (req: RequestBody<IMovieCreateDTO>, res: Response) => {
        const newMovie: IMovieDTO = await movieService.createNewBook(req.user, req.body.title);
        res.status(HttpStatus.Created).send(newMovie);
    },

    allUserMoviesGET: (req: Request, res: Response) => {
        res.send('Hello from GET');
    },
};

export default movieController;
