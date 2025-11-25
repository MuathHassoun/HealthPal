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

describe('Alerts Endpoints', () => {
    let alertId;

    it('should create an alert', async () => {
        const res = await request(app)
            .post('/api/alerts')
            .send({ title: 'Test Alert', description: 'Alert description' });
        alertId = res.body.id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Test Alert');
    });

    it('should get all alerts', async () => {
        const res = await request(app).get('/api/alerts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get alert by id', async () => {
        const res = await request(app).get(`/api/alerts/${alertId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', alertId);
    });

    it('should update alert', async () => {
        const res = await request(app)
            .put(`/api/alerts/${alertId}`)
            .send({ title: 'Updated Alert' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Alert');
    });

    it('should delete alert', async () => {
        const res = await request(app).delete(`/api/alerts/${alertId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Alert deleted successfully');
    });
});
