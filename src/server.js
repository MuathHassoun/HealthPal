// src/server.js
import app from './app.js';
import { connectDB, sequelize } from './config/db.js';
import { DataTypes } from 'sequelize';

await connectDB();
const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
});

await sequelize.sync({ alter: true });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
