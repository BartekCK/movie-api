import { IMovie, IUser } from '../types';
import { SystemError } from '../types/enums';
import movieHelper from '../helpers/movieHelper';
import { IMovieDocument, Movie } from '../models/Movie';
import { IMovieDTO } from '../dto';

const movieService = {
    createNewMovie: async (user: IUser, bookTitle?: string): Promise<IMovieDTO> => {
        if (!bookTitle) {
            throw { name: SystemError.BadRequest, message: `${user.name} you should add movie title` };
        }
        const movie: IMovie = await movieHelper.findMovieInOuterAPI(bookTitle);
        const movieDoc: IMovieDocument = new Movie({ userId: user.userId, ...movie });
        await movieDoc.save();
        return <IMovieDTO>movieDoc.toObject({ versionKey: false });
    },

    getAllUserMovies: async (userId: number): Promise<IMovieDTO[]> => {
        const movies: IMovieDocument[] = await Movie.find({ userId }).select('-__v -createdAt').exec();
        if (movies.length === 0) {
            throw { name: SystemError.NotFound, message: `User by Id ${userId} don't have any movies` };
        }
        return movies.map((movie: IMovieDocument) => ({ ...movie.toObject() } as IMovieDTO));
    },
};

export default movieService;
