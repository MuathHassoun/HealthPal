import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import { DataTypes } from 'sequelize';

import educationRoutes from './routes/education.js';
import alertRoutes from './routes/alerts.js';
import supportSessionRoutes from './routes/supportSession.js';

const app = express();
app.use(express.json());

await connectDB(); // Connect to MySQL

// Example User model
const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
});

// Sync database
await sequelize.sync({ alter: true });

// Routes
app.use('/api/education', educationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/mental-support', supportSessionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
