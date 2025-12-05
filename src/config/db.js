import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './env.js';

let sequelize;
if (DB_CONFIG.dialect && DB_CONFIG.dialect === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: DB_CONFIG.storage || ':memory:',
        logging: false,
        pool: {
            max: 1,
            min: 1,
            idle: 10000
        }
    });
} else {
    sequelize = new Sequelize(
        DB_CONFIG.DATABASE,
        DB_CONFIG.USER,
        DB_CONFIG.PASSWORD,
        {
            host: DB_CONFIG.HOST,
            dialect: DB_CONFIG.DIALECT || 'mysql',
            logging: false
        }
    );
}

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected via Sequelize');
    } catch (error) {
        console.error('Database Connection failed:', error.message);
        process.exit(1);
    }
};

export { sequelize, connectDB };
