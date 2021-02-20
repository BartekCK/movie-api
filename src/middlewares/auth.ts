import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';

// types
import { IJwt, IUser, RequestBody } from '../types';

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
    next();
};
