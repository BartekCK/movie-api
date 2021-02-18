import { Request, Response } from 'express';

const movieController = {
    createNewUserMoviePOST: (req: Request, res: Response) => {
        res.send('Hello from POST');
    },

    allUserMoviesGET: (req: Request, res: Response) => {
        res.send('Hello from GET');
    },
};

export default movieController;
