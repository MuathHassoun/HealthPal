// src/app.js
import express from 'express';
import educationRoutes from './routes/education.js';
import alertRoutes from './routes/alerts.js';
import supportSessionRoutes from './routes/supportSession.js';

const app = express();
app.use(express.json());

app.use('/api/education', educationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/mental-support', supportSessionRoutes);

export default app;
