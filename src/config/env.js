// env.js
const isTest = process.env.NODE_ENV === 'test';

export const DB_CONFIG = isTest
    ? {
            dialect: 'sqlite',
            // Use shared in-memory SQLite to allow multiple connections in the same process
            storage: 'file::memory:?cache=shared'
        }
    : {
            HOST: 'mysql-healthpal.alwaysdata.net',
            USER: 'healthpal',
            PASSWORD: 'nlLs0fpY2d',
            DATABASE: 'healthpal_db',
            DIALECT: 'mysql'
        };

export const APP_CONFIG = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key_here'
};
