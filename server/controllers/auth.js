const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    try {
        const accessToken = req.headers['authorization'];
        const token = accessToken && accessToken.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decodedToken.user_data.email;
        next ? next() : res.status(200).json({ message: 'Authorized' });
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authToken;