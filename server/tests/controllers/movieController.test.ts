import { expect } from 'chai';
import request from 'supertest';
import server from '../../src/server';
import { closeDbConnection, connectToDatabase } from '../../src/config/database';
import { API_MAIN_ROUTE } from '../../src/constants';
import { createToken, decodeToken } from '../../src/utils/tokenManage';
import { BasicUser } from '../../src/mock/users.mock';

describe('POST /movies', () => {
    before(async () => {
        await connectToDatabase();
    });

    it('checking default options', async () => {
        const token = createToken(BasicUser);
        const { body, status } = await request(server).get(`${API_MAIN_ROUTE}/movies`).auth(token, { type: 'bearer' });
    });

    after(async () => {
        await closeDbConnection();
    });
});
