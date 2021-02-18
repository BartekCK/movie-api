import { Request, Response } from 'express';

const errorHandler = (curryFunc: any) => {
    return async (req: Request, res: Response, next: any) => {
        try {
            await curryFunc(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default errorHandler;
