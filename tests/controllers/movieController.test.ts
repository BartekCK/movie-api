import { expect } from 'chai';
import request from 'supertest';
import { MongoMemoryServer, MongoBinary } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// server
import { server } from '../../src/server';

// constants
import { API_MAIN_ROUTE } from '../../src/constants';

// utils
import { createToken } from '../../src/utils/tokenManage';

// mock
import { BasicUser, PremiumUser } from '../../src/mock/users.mock';

// config
import { dbOptions } from '../../src/config/database';

// services
import movieService from '../../src/services/movieService';

// types
import { IMovieDTO } from '../../src/dto';
import { IUser } from '../../src/types';

describe('Http actions on /movies', () => {
    let mongoServer: MongoMemoryServer;

    const movieTitle: string = 'Avatar';

    const makeGetApiCall = async <T>(user: IUser): Promise<{ body: T; status: number }> => {
        const token = createToken(user);
        return request(server).get(`${API_MAIN_ROUTE}/movies`).auth(token, { type: 'bearer' });
    };

    const makePostApiCall = async <T>(user: IUser, title?: string): Promise<{ body: T; status: number }> => {
        const token = createToken(user);
        return request(server).post(`${API_MAIN_ROUTE}/movies`).send({ title }).auth(token, { type: 'bearer' });
    };

    const addUserMoviesIntoDb = async (user: IUser, movies: string[]): Promise<void> => {
        await Promise.all(
            movies.map(async (movie: string) => {
                await movieService.createNewMovie(user, movie);
            }),
        );
    };

    before(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, dbOptions);
    });

    it('Should not found user movie and return 404 status', async () => {
        const { body, status } = await makeGetApiCall(BasicUser);
        expect(status).equal(404);
        expect(body).to.have.property('message');
    });

    it('Should return 400 status (bad request) when user send request without title', async () => {
        const { status } = await makePostApiCall<IMovieDTO>(BasicUser);
        expect(status).equal(400);
    });

    it('Should add user movie', async () => {
        const { body, status } = await makePostApiCall<IMovieDTO>(BasicUser, movieTitle);
        expect(body).to.have.property('_id');
        expect(body).to.have.property('userId');
        expect(body).to.have.property('title').equal(movieTitle);
        expect(body).to.have.property('released');
        expect(body).to.have.property('genre');
        expect(body).to.have.property('director');
        expect(status).equal(201);
    });

    it('Should get all user movies', async () => {
        await addUserMoviesIntoDb(BasicUser, [movieTitle]);
        const { body, status } = await makeGetApiCall<IMovieDTO[]>(BasicUser);
        expect(status).equal(200);
        expect(body.length).equal(1);
    });

    it('Should forbidden adding the same movie for user and return 409 status (conflict)', async () => {
        await addUserMoviesIntoDb(BasicUser, [movieTitle]);
        const { status } = await makePostApiCall(BasicUser, movieTitle);
        expect(status).equal(409);
    });

    it('Should not allow add more then 5 movies basic user and return forbidden', async function () {
        this.timeout(5000);
        const movies: string[] = ['Avatar', 'Joker', 'Parasite', 'The Godfather', 'La Dolce Vita'];
        await addUserMoviesIntoDb(BasicUser, movies);

        const { status } = await makePostApiCall(BasicUser, 'The Dark Knight');
        expect(status).equal(403);

        const userMovies: IMovieDTO[] = await movieService.getAllUserMovies(BasicUser.userId);
        expect(userMovies.length).equal(5);
    });

    it('Should allow add more then 5 movies premium user', async function () {
        this.timeout(5000);
        const movies: string[] = ['Joker', 'Parasite', 'The Godfather', 'La Dolce Vita', 'The Dig', 'Jaws'];
        await addUserMoviesIntoDb(PremiumUser, movies);

        const { status } = await makePostApiCall(PremiumUser, 'The Dark Knight');
        expect(status).equal(201);

        const userMovies: IMovieDTO[] = await movieService.getAllUserMovies(PremiumUser.userId);
        expect(userMovies.length).equal(7);
    });

    afterEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    after(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
        server.close();
    });
});
