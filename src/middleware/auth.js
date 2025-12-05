//src/middleware/auth.js
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

export default (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key_here');

        if (process.env.NODE_ENV === 'test') {
            // eslint-disable-next-line no-console
            console.log('[auth] decoded token:', decoded);
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
