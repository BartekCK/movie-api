import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';
import { IJwt, IUser, RequestBody } from '../types';
import { Movie } from '../models/Movie';
import { SystemError, UserRole } from '../types/enums';
import newCleanDateBuilder from '../utils/cleanDateBuilder';
import { MONTH_LIMIT_BASIC_USER } from '../constansts';

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
                try {
                    const user: IUser = { ...jwtPayload };
                    done(null, user);
                } catch (err) {
                    done(err);
                }
            },
        ),
    )
    .authenticate('jwt', { session: false });

export const checkRoles = async (req: RequestBody<any>, res: any, next: any) => {
    if (!req.user) {
        throw { name: SystemError.Unauthorized, message: SystemError.Unauthorized };
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
    next(new Error(`User ${name} with ${role} account can add only 5 movies on month`));
};
