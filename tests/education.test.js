import request from 'supertest';
import app from '../src/app.js';
import { sequelize } from '../src/config/db.js';

jest.setTimeout(20000);
beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Education Endpoints', () => {
    let articleId;

    it('should create a new article', async () => {
        const res = await request(app)
            .post('/api/education/articles')
            .send({ title: 'Test Article', content: 'Some content' });
        articleId = res.body.id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Test Article');
    });

    it('should get all articles', async () => {
        const res = await request(app).get('/api/education/articles');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get article by id', async () => {
        const res = await request(app).get(`/api/education/articles/${articleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', articleId);
    });

    it('should update article', async () => {
        const res = await request(app)
            .put(`/api/education/articles/${articleId}`)
            .send({ title: 'Updated Article' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Article');
    });

    it('should delete article', async () => {
        const res = await request(app).delete(`/api/education/articles/${articleId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Article deleted successfully');
    });
});
