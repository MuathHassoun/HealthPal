import request from 'supertest';
import app from './src/app.js';

(async ()=>{
  const login = await request(app).post('/api/users/login').send({ email: 'user2@example.com', password: '123456' });
  console.log('login status', login.status, 'token', login.body.token);
  const token = login.body.token;
  const res = await request(app)
    .post('/api/consultations')
    .set('Authorization', `Bearer ${token}`)
    .send({ doctor_id:1, patient_id:2, type:'chat', date:'2025-11-28T10:00:00', notes:'Follow up' });
  console.log('create status', res.status, 'body', res.body);
})();