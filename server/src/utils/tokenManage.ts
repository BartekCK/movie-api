import jwt from 'jsonwebtoken';

// classes
import { CustomError } from './CustomError';

// types
import { SystemError } from '../types/enums';
import { IUser } from '../types';

export const createToken = (user: IUser, expiresIn?: number, secret?: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new CustomError(SystemError.EnvError, 'Declare JWT_SECRET');
    }
    return jwt.sign(user, secret || process.env.JWT_SECRET, {
        issuer: 'https://www.netguru.com/',
        subject: `${user.userId}`,
        expiresIn: expiresIn ?? 30 * 60,
    });
};
