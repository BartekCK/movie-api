import { Request, Response } from 'express';
import { HttpStatus, SystemError } from '../types/enums';

const errorMiddleware = (err: any, req: Request, res: Response, next: any) => {
    const { message, type } = err;
    switch (true) {
        case type === SystemError.EnvError:
            return res.status(HttpStatus.InternalServerError).send({ message });

        case type === SystemError.NotFound:
            return res.status(HttpStatus.NotFound).send({ message });

        case type === SystemError.Forbidden:
            return res.status(HttpStatus.Forbidden).send({ message });

        case type === SystemError.Unauthorized:
            return res.status(HttpStatus.Unauthorized).send({ message });

        case type === SystemError.BadRequest:
            return res.status(HttpStatus.BadRequest).send({ message });

        default:
            res.status(HttpStatus.InternalServerError).send({ message });
    }
};

export default errorMiddleware;
