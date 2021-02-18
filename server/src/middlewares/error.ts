import { Response, Request } from 'express';
import { SystemError } from '../types/enums';

const errorMiddleware = (err: any, req: Request, res: Response, next: any) => {
    const { message, name } = err;
    switch (true) {
        case name === SystemError.EnvError:
            return res.status(500).send({ message });

        case name === SystemError.NotFound:
            return res.status(400).send({ message });

        case name === SystemError.Forbidden:
            return res.status(403).send({ message });

        case name === SystemError.Unauthorized:
            return res.status(401).send({ message });

        default:
            res.status(500).send({ message });
    }
};

export default errorMiddleware;
