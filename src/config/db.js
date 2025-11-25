import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './env.js';

const sequelize = new Sequelize(
    DB_CONFIG.DATABASE,
    DB_CONFIG.USER,
    DB_CONFIG.PASSWORD,
    {
        host: DB_CONFIG.HOST,
        dialect: DB_CONFIG.DIALECT,
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL connected via Sequelize');
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
};

export { sequelize, connectDB };
