<<<<<<< HEAD
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
=======
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
import medicationRoutes from './routes/medication.routes.js';

const app = express();
>>>>>>> a57bf28 (hazem part medication)

app.get('/test-error', (req, res) => {
    throw new Error("TEST ERROR");
});


// ============ MIDDLEWARE ============

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
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

// ============ ROUTES ============

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'HealthPal API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root endpoint
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

// API routes
app.use('/api/education', educationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/mental-support', supportSessionRoutes);
<<<<<<< HEAD
app.use('/api/consultations', consultionRoutes);
app.use('/api/users', userRoutes);
=======
app.use('/api', medicationRoutes);

// ============ ERROR HANDLING ============

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

>>>>>>> a57bf28 (hazem part medication)
export default app;