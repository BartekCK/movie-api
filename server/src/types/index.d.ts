import { UserRole } from './enums';
import { Schema } from 'mongoose';

export type idType = string | Schema.Types.ObjectId | undefined;

export interface IMovie {
    title: string;
    released: Date;
    genre: string;
    director: string;
}

export interface IUser {
    userId: number;
    name: string;
    role: UserRole;
}

export interface IJwt extends IUser {
    iat: number;
    exp: number;
    iss: string;
    sub: string;
}

export interface RequestBody<T> extends Request {
    body: T;
    user: IUser;
}
