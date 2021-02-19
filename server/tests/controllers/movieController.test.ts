import { expect } from 'chai';
import request from 'supertest';
import server from '../../src/server';
import { API_MAIN_ROUTE } from '../../src/constants';
import { createToken } from '../../src/utils/tokenManage';
import { BasicUser } from '../../src/mock/users.mock';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { dbOptions } from '../../src/config/database';

describe('POST /movies', () => {
    let mongoServer: MongoMemoryServer;

    before(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, dbOptions);
    });

    it('checking default options', async () => {
        const token = createToken(BasicUser);
        const { body, status } = await request(server).get(`${API_MAIN_ROUTE}/movies`).auth(token, { type: 'bearer' });
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
});
