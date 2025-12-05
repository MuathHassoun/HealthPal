

export const apiResponse = {

    success: (res, data = null, message = 'Success') => {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    },


    created: (res, data = null, message = 'Resource created successfully') => {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    },


    badRequest: (res, message = 'Bad request', errors = null) => {
        return res.status(400).json({
            success: false,
            message,
            errors
        });
    },


    unauthorized: (res, message = 'Unauthorized') => {
        return res.status(401).json({
            success: false,
            message
        });
    },


    forbidden: (res, message = 'Forbidden') => {
        return res.status(403).json({
            success: false,
            message
        });
    },


    notFound: (res, message = 'Resource not found') => {
        return res.status(404).json({
            success: false,
            message
        });
    },

    error: (res, message = 'Internal server error', statusCode = 500) => {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }
};