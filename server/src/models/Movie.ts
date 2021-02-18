import { Document, model, Model, Schema } from 'mongoose';

// types
import { IMovie } from '../types';

export interface IMovieDocument extends Document, IMovie {
    userId: number;
    createdAt: Date;
}

export interface IMovieModel extends Model<IMovieDocument> {}

const movieSchema = new Schema(
    {
        userId: {
            type: Number,
        },
        title: {
            type: String,
            trim: true,
        },
        released: {
            type: Date,
            trim: true,
        },
        genre: { type: String, trim: true },
        director: { type: String, trim: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
);

export const Movie = model<IMovieDocument, IMovieModel>('movies', movieSchema);
