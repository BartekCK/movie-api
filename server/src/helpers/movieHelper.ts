import axios from 'axios';
import { SystemError } from '../types/enums';
import { IMovie } from '../types';

const movieHelper = {
    findMovieInOuterAPI: async (title: string): Promise<IMovie> => {
        const API_KEY_OMDb: string | undefined = process.env.API_KEY_OMDB;
        const EXTERNAL_API_URL: string | undefined = process.env.EXTERNAL_API_URL;

        if (!API_KEY_OMDb) {
            throw { name: SystemError.EnvError, message: ' Declare OMDb API key' };
        }
        if (!EXTERNAL_API_URL) {
            throw { name: SystemError.EnvError, message: ' Define external API URL' };
        }

        const { data } = await axios.get(EXTERNAL_API_URL, {
            params: { apikey: `${API_KEY_OMDb}`, t: title },
        });

        if (data.hasOwnProperty('Response') && data.Response === 'False') {
            throw { name: SystemError.NotFound, message: data.Error };
        }

        const { Title, Released, Genre, Director } = data;
        return { title: Title, released: Released, genre: Genre, director: Director };
    },
};

export default movieHelper;
