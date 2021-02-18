import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';
import { IJwt, IUser } from '../types';

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
