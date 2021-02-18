import { IUser } from '../types';
import { SystemError } from '../types/enums';

const movieService = {
    createNewBook: (user: IUser, bookTitle?: string) => {
        if (!bookTitle) {
            throw { name: SystemError.BadRequest, message: `${user.name} you should add movie title` };
        }
        console.log(bookTitle);
    },

    getAllBooks: (user: IUser) => {},
};

export default movieService;
