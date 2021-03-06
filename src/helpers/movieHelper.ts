import axios from 'axios';

// classes
import { CustomError } from '../utils/CustomError';

// types
import { SystemError } from '../types/enums';
import { IMovie } from '../types';
import { IMovieDocument } from '../models/Movie';
import { IMovieDTO } from '../dto';

const movieHelper = {
    findMovieInOuterAPI: async (title: string): Promise<IMovie> => {
        const API_KEY_OMDb: string | undefined = process.env.API_KEY_OMDB;
        const EXTERNAL_API_URL: string | undefined = process.env.EXTERNAL_API_URL;

        if (!API_KEY_OMDb) {
            throw new CustomError(SystemError.EnvError, 'Declare OMDb API key');
        }
        if (!EXTERNAL_API_URL) {
            throw new CustomError(SystemError.EnvError, 'Define external API URL');
        }

        const { data } = await axios.get(EXTERNAL_API_URL, {
            params: { apikey: `${API_KEY_OMDb}`, t: title },
        });

        if (data.hasOwnProperty('Response') && data.Response === 'False') {
            throw new CustomError(SystemError.NotFound, data.Error);
        }

        const { Title, Released, Genre, Director } = data;
        return { title: Title, released: Released, genre: Genre, director: Director };
    },

    mapMovieDocumentToDto: (movieDoc: IMovieDocument): IMovieDTO => {
        return <IMovieDTO>{ ...movieDoc.toObject({ versionKey: false }), createdAt: undefined };
    },
};

export default movieHelper;
