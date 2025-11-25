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

describe('Support Sessions Endpoints', () => {
    let sessionId;

    it('should create a support session', async () => {
        const res = await request(app)
            .post('/api/mental-support')
            .send({
                patient_id: 1,
                counselor_id: 2,
                type: 'chat',
                date: new Date(),
                status: 'scheduled'
            });
        sessionId = res.body.id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('type', 'chat');
    });

    it('should get all sessions', async () => {
        const res = await request(app).get('/api/mental-support');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get session by id', async () => {
        const res = await request(app).get(`/api/mental-support/${sessionId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', sessionId);
    });

    it('should update session', async () => {
        const res = await request(app)
            .put(`/api/mental-support/${sessionId}`)
            .send({ status: 'done' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'done');
    });

    it('should delete session', async () => {
        const res = await request(app).delete(`/api/mental-support/${sessionId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Session deleted successfully');
    });
});
