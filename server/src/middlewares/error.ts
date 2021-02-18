import { Request, Response } from 'express';
import { HttpStatus, SystemError } from '../types/enums';

const errorMiddleware = (err: any, req: Request, res: Response, next: any) => {
    const { message, name } = err;
    switch (true) {
        case name === SystemError.EnvError:
            return res.status(HttpStatus.InternalServerError).send({ message });

        case name === SystemError.NotFound:
            return res.status(HttpStatus.NotFound).send({ message });

        case name === SystemError.Forbidden:
            return res.status(HttpStatus.Forbidden).send({ message });

        case name === SystemError.Unauthorized:
            return res.status(HttpStatus.Unauthorized).send({ message });

        case name === SystemError.BadRequest:
            return res.status(HttpStatus.BadRequest).send({ message });

        default:
            res.status(HttpStatus.InternalServerError).send({ message });
    }
};

export default errorMiddleware;
