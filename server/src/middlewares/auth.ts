import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';

// models
import { Movie } from '../models/Movie';

// utils
import newCleanDateBuilder from '../utils/cleanDateBuilder';

// constants
import { MONTH_LIMIT_BASIC_USER } from '../constants';

// classes
import { CustomError } from '../utils/CustomError';

// types
import { IJwt, IUser, RequestBody } from '../types';
import { SystemError, UserRole } from '../types/enums';

dotenv.config();

/**
 * Passport verify JWT token. It checks right away exp
 */
export const authBearerTokenMiddleware = passport
    .use(
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            async (jwtPayload: IJwt, done: VerifiedCallback) => {
                const user: IUser = { ...jwtPayload };
                done(null, user);
            },
        ),
    )
    .authenticate('jwt', { session: false });

export const checkRoles = async (req: RequestBody<any>, res: any, next: any) => {
    if (!req.user) {
        next(new CustomError(SystemError.Unauthorized, SystemError.Unauthorized));
    }
    const newMovieCreateDate: Date = new Date(Date.now());
    const start: Date = newCleanDateBuilder(newMovieCreateDate);
    newMovieCreateDate.setMonth(newMovieCreateDate.getMonth() + 1);
    const end: Date = newCleanDateBuilder(newMovieCreateDate);

    const { userId, role, name } = req.user;
    if (role === UserRole.Premium) {
        return next();
    }

    const numberOfUserMovies: number = await Movie.find({ userId, createdAt: { $gte: start, $lt: end } })
        .count()
        .exec();

    if (numberOfUserMovies < MONTH_LIMIT_BASIC_USER) {
        return next();
    }

    next(new CustomError(SystemError.Forbidden, `User ${name} with ${role} account can add only 5 movies on month`));
};
