import fetch from 'node-fetch';
import app from './src/app.js';
import http from 'http';

const server = http.createServer(app);
server.listen(0, async () => {
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/api/users/login`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'user2@example.com', password: '123456' })
    });
    const body = await res.json();
    console.log('status', res.status);
    console.log('body', body);
  } catch (e) {
    console.error(e);
  } finally {
    server.close();
  }
});
