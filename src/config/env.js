// env.js
export const DB_CONFIG = {
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
