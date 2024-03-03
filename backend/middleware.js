const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
      
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            // Handle invalid token
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            // Handle expired token
            return res.status(401).json({ message: 'Token expired' });
        } else {
            // Handle other errors
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = {
    authMiddleware
};
