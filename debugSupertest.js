import request from 'supertest';
import app from './src/app.js';

(async ()=>{
  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'user2@example.com', password: '123456' });
  console.log('status', res.status);
  console.log('body', res.body);
})();