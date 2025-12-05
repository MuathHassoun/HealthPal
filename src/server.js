import app from './app.js';
import { connectDB, sequelize } from './config/db.js';
import logger from './config/logger.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

<<<<<<< HEAD
await sequelize.sync({ alter: true });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();
        logger.info('Database connected successfully');
        console.log('✅ Database connected successfully');

        // Sync models (if needed - be careful with this in production)
        // await sequelize.sync({ alter: true }); // Uncomment if you want to auto-sync models

        // Start listening
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

startServer();
>>>>>>> a57bf28 (hazem part medication)
