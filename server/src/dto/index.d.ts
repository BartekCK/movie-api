import { IMovie } from '../types';

export interface IMovieCreateDTO {
    title: string;
}

export interface IMovieDTO extends IMovie {
    "_id": string
    "userId": number,
    "createdAt": string
    "updatedAt": string
}
