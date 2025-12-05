//src/middleware/role.js
function checkRole(allowedRoles = []) {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.role) {
                return res.status(403).json({ message: 'Access denied. User role not found.' });
            }

            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            next();

        } catch (error) {
            res.status(500).json({ message: 'Role verification error.' });
        }
    };
}

export default checkRole;
