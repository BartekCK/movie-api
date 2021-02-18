import { Model, model, Schema, Document, HookNextFunction } from 'mongoose';
import { IMovie } from '../types';

export interface IMovieDocument extends Document, IMovie {
    userId: number;
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

movieSchema.pre<IMovieDocument>('save', async function (next: HookNextFunction) {
    const data = await Movie.find({ userId: this.userId }).exec();
    console.log(data);
    next();
});

export const Movie = model<IMovieDocument, IMovieModel>('movies', movieSchema);
