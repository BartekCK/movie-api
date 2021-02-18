// types
import { idType, IMovie } from '../types';

export interface IMovieCreateDTO {
    title: string;
}

export interface IMovieDTO extends IMovie {
    _id: idType;
    userId: number;
    createdAt: Date;
}
