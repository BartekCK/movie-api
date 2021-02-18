import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';
import dotenv from 'dotenv';
import { IJwt } from '../types';

dotenv.config();

/**
 * Passport verify JWT token
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
                    console.log(jwtPayload);
                    done(null, { temp: 'test' });
                } catch (err) {
                    done(err);
                }
            },
        ),
    )
    .authenticate('jwt', { session: false });
