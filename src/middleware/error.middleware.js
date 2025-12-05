import logger from '../config/logger.js';
import { apiResponse } from '../utils/apiResponse.js';


export const errorHandler = (err, req, res, next) => {

    logger.error('Error occurred', {
        error: err.message,
        stack: err.stack,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userId: req.user?.id || 'anonymous'
    });


    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message);
        return apiResponse.badRequest(res, 'Validation error', errors);
    }


    if (err.name === 'SequelizeUniqueConstraintError') {
        return apiResponse.badRequest(res, 'Duplicate entry detected');
    }


    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return apiResponse.badRequest(res, 'Invalid reference to related record');
    }


    if (err.name === 'JsonWebTokenError') {
        return apiResponse.unauthorized(res, 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        return apiResponse.unauthorized(res, 'Token expired');
    }


    if (err.name === 'MulterError') {
        return apiResponse.badRequest(res, `File upload error: ${err.message}`);
    }


    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: process.env.NODE_ENV === 'development' ? err : {}
        });
    }


    return apiResponse.error(
        res,
        process.env.NODE_ENV === 'development'
            ? err.message
            : 'Internal server error',
        500
    );
};


export const notFoundHandler = (req, res, next) => {
    logger.warn('Route not found', {
        method: req.method,
        url: req.url,
        ip: req.ip
    });

    return apiResponse.notFound(res, `Route ${req.method} ${req.url} not found`);
};


export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
