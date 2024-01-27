import config from "../../config/app.js";
import jwt from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
import Token from '../models/Token.js'


export const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: config.jwt.tokens.access.type,
    };
    const options = {expiresIn: config.jwt.tokens.access.expiresIn};
    return jwt.sign(payload, config.jwt.secret, options);
};


export const generateRefreshToken = () => {
    const payload = {
        id: uuidv4(),
        type: config.jwt.tokens.refresh.type,
    };
    const options = {expiresIn: config.jwt.tokens.refresh.expiresIn};
    return {
        id: payload.id,
        token: jwt.sign(payload, config.jwt.secret, options),
    };
};


export const replaceRefreshToken = (tokenId, userId) =>
    Token.findOneAndDelete({userId})
        .exec()
        .then(() => Token.create({tokenId, userId}));


