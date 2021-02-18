import { Request, Response } from 'express';
import { IUser, RequestBody } from '../types';
import { IBookCreateDTO } from '../dto';
import movieService from '../services/movieService';
import { HttpStatus } from '../types/enums';

const movieController = {
    createNewUserMoviePOST: async (req: RequestBody<IBookCreateDTO>, res: Response) => {
        await movieService.createNewBook(req.user, req.body.title);
        res.status(HttpStatus.Created).send('Hello from POST');
    },

    allUserMoviesGET: (req: Request, res: Response) => {
        res.send('Hello from GET');
    },
};

export default movieController;
