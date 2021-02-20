import { Document, HookNextFunction, model, Model, Schema } from 'mongoose';

// types
import { IMovie } from '../types';
import { CustomError } from '../utils/CustomError';
import { SystemError } from '../types/enums';

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
    { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

movieSchema.pre<IMovieDocument>('save', async function (next: HookNextFunction) {
    const movie = await Movie.findOne({ userId: this.userId, title: this.title }).exec();
    if (!movie) {
        return next();
    }
    next(new CustomError(SystemError.Conflict, `User with id ${this.userId} has this movie in his collection`));
});

export const Movie = model<IMovieDocument, IMovieModel>('movies', movieSchema);
