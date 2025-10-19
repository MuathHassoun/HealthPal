import express from 'express';
import { connectDB, sequelize } from './config/db.js';

const app = express();
app.use(express.json());

await connectDB();

import { DataTypes } from 'sequelize';
const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
});

await sequelize.sync({ alter: true });
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
