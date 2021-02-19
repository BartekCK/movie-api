// helpers
import movieHelper from '../helpers/movieHelper';

// models
import { IMovieDocument, Movie } from '../models/Movie';

// classes
import { CustomError } from '../utils/CustomError';

// types
import { IMovie, IUser } from '../types';
import { SystemError } from '../types/enums';
import { IMovieDTO } from '../dto';

const movieService = {
    createNewMovie: async (user: IUser, movieTitle?: string): Promise<IMovieDTO> => {
        if (!movieTitle) {
            throw new CustomError(SystemError.BadRequest, `${user.name} you should add movie title`);
        }
        const movie: IMovie = await movieHelper.findMovieInOuterAPI(movieTitle);
        const movieDoc: IMovieDocument = new Movie({ userId: user.userId, ...movie });
        await movieDoc.save();
        return movieHelper.mapMovieDocumentToDto(movieDoc);
    },

    getAllUserMovies: async (userId: number): Promise<IMovieDTO[]> => {
        const movies: IMovieDocument[] = await Movie.find({ userId }).select('-createdAt').exec();
        if (movies.length === 0) {
            throw new CustomError(SystemError.NotFound, `User by Id ${userId} don't have any movies`);
        }
        return movies.map(movieHelper.mapMovieDocumentToDto);
    },
};

export default movieService;
