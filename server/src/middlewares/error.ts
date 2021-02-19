import { Request, Response } from 'express';

// types
import { HttpStatus, SystemError } from '../types/enums';

const errorMiddleware = (err: any, req: Request, res: Response, next: any) => {
    const { message, type } = err;
    switch (true) {
        case type === SystemError.Conflict:
            return res.status(HttpStatus.Conflict).send({ message });

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
