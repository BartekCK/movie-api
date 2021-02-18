import { IMovie, IUser } from '../types';
import { SystemError } from '../types/enums';
import movieHelper from '../helpers/movieHelper';
import Movie, { IMovieDocument } from '../models/Movie';
import { IMovieDTO } from '../dto';

const movieService = {
    createNewBook: async (user: IUser, bookTitle?: string): Promise<IMovieDTO> => {
        if (!bookTitle) {
            throw { name: SystemError.BadRequest, message: `${user.name} you should add movie title` };
        }
        const movie: IMovie = await movieHelper.findMovieInOuterAPI(bookTitle);
        const movieDoc: IMovieDocument = new Movie({ userId: user.userId, ...movie });
        await movieDoc.save();
        return <IMovieDTO>movieDoc.toObject({ versionKey: false });
    },

    getAllBooks: (user: IUser) => {},
};

export default movieService;
