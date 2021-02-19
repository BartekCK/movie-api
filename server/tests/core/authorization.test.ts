import { expect } from 'chai';
import request from 'supertest';

// server
import server from '../../src/server';

// constants
import { API_MAIN_ROUTE } from '../../src/constants';

// utils
import { createToken } from '../../src/utils/tokenManage';

// mock
import { BasicUser } from '../../src/mock/users.mock';

describe('Test auth with bearer token', () => {
    const makeRequest = async (token: string): Promise<{ status: number }> => {
        return request(server).get(`${API_MAIN_ROUTE}/movies`).auth(token, { type: 'bearer' });
    };

    it('Should be unauthorized for lack of bearer token', async () => {
        const { status } = await request(server).get(`${API_MAIN_ROUTE}/movies`);
        expect(status).equal(401);
    });

    it('Should be unauthorized because of an expired token', async () => {
        const token = createToken(BasicUser, 0);
        const { status } = await makeRequest(token);
        expect(status).equal(401);
    });

    it('Should be unauthorized because of wrong secret key', async () => {
        const token = createToken(BasicUser, 100, 'testsecret');
        const { status } = await makeRequest(token);
        expect(status).equal(401);
    });
});
