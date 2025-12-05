import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './config/logger.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

// Import routes
import educationRoutes from './routes/education.js';
import alertRoutes from './routes/alerts.js';
import supportSessionRoutes from './routes/supportSession.js';
import consultationRoutes from './routes/consultation.js';
import userRoutes from './routes/user.js';
import medicationRoutes from './routes/medication.routes.js';

const app = express();

// ============ MIDDLEWARE ============

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || process.env.CORS_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging with Morgan + Winston
if (process.env.NODE_ENV === 'production') {
    // Production: log only errors
    app.use(morgan('combined', {
        skip: (req, res) => res.statusCode < 400,
        stream: logger.stream
    }));
} else {
    // Development: log all requests
    app.use(morgan('dev', { stream: logger.stream }));
}

// Custom request logger
app.use((req, res, next) => {
    logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
});

// ============ TEST / HEALTH ============

app.get('/test-error', (req, res) => {
    throw new Error("TEST ERROR");
});

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'HealthPal API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to HealthPal API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            medicines: '/api/medicines',
            equipment: '/api/equipment',
            matching: '/api/matching',
            education: '/api/education',
            alerts: '/api/alerts',
            mentalSupport: '/api/mental-support'
        }
    });
});

// ============ ROUTES ============

app.use('/api/education', educationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/mental-support', supportSessionRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/users', userRoutes);
app.use('/api', medicationRoutes);

// ============ ERROR HANDLING ============

app.use(notFoundHandler); // 404 handler
app.use(errorHandler);    // Global error handler

export default app;
