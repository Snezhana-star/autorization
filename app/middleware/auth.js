import jwt from 'jsonwebtoken'
import config from "../../config/app.js";

//для ограничения доступа по токену, добавляется в роуты
export const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({message: 'Token not provided'});
        return;
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, config.jwt.secret);
        if (payload.type !== 'access') {
            res.status(401).json({message: 'Invalid token'})
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).json({message: 'Token expired'})
            return;
        }
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({message: 'Invalid token'})
        }
    }
    next();
}