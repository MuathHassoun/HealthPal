//src/app.js
import express from 'express';
import cors from 'cors';
import educationRoutes from './routes/education.js';
import alertRoutes from './routes/alerts.js';
import supportSessionRoutes from './routes/supportSession.js';
import consultionRoutes from './routes/consultation.js';
import userRoutes from './routes/user.js';

const app = express();

// Enable CORS for frontend communication
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/api/education', educationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/mental-support', supportSessionRoutes);
app.use('/api/consultations', consultionRoutes);
app.use('/api/users', userRoutes);
export default app;