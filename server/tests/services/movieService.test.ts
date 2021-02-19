import { expect } from 'chai';

// mock
import { BasicUser } from '../../src/mock/users.mock';

// services
import movieService from '../../src/services/movieService';

describe('Test movie service', () => {
    it('Should catch error when movie title is undefined', async () => {
        try {
            await movieService.createNewMovie(BasicUser);
        } catch (e) {
            expect(e).to.be.an('error');
            expect(e.message).equal(`${BasicUser.name} you should add movie title`);
        }
    });
});
