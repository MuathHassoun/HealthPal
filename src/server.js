import app from './app.js';
import { connectDB, sequelize } from './config/db.js';
import logger from './config/logger.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();
        logger.info('Database connected successfully');
        console.log('✅ Database connected successfully');

        // Sync models (optional in production)
        await sequelize.sync({ alter: true });

        // Start server
        app.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
            console.log(`💊 Medicines API: http://localhost:${PORT}/api/medicines`);
            console.log(`🏥 Equipment API: http://localhost:${PORT}/api/equipment`);
        });
    } catch (error) {
        logger.error('Failed to start server', { error: error.message });
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// Start the server
startServer();
