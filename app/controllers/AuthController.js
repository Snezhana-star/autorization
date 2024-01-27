import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "../../config/app.js";
import * as authHelper from '../helpers/authHelper.js'
import Token from '../models/Token.js'

// список всех пользователей для проверки

export const getAllUsers = (req, res) => {
    User.find()
        .exec()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
}

export const register = (req, res) => {
    //const {name, surname, middlename, email, username, password} = req.body
    // const hashPassword = bcrypt.hashSync(password, 7)
    //{name, surname, middlename, email, username, password: hashPassword}
    User.create(req.body)
        .then(createdUser => res.json(createdUser))
        .catch(err => res.status(500).json(err));
}
// export const register = (req, res) => {
//     const { name, surname, middlename, email, username, password } = req.body;
//     const hashPassword = bcrypt.hashSync(password, 7);
//
//     const verificationToken = authHelper.generateVerificationToken();
//
//     User.create({ name, surname, middlename, email, username, password: hashPassword, verificationToken })
//         .then(createdUser => {
//             // Отправка письма для подтверждения
//             sendVerificationEmail(createdUser.email, verificationToken);
//
//             res.json(createdUser);
//         })
//         .catch(err => res.status(500).json(err));
// };


export const updateTokens = (userId) => {
    const accessToken = authHelper.generateAccessToken(userId)
    const refreshToken = authHelper.generateRefreshToken()
    return authHelper.replaceRefreshToken(refreshToken.id, userId)
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token,
        }))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });

}


export const refreshTokens = (req, res) => {
    const {refreshToken} = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, config.jwt.secret)
        if (payload.type !== 'refresh') {
            res.status(400).json({message: 'Invalid token'})
            return;
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({message: 'Token expired'})
            return;
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({message: 'Invalid token'})
            return;
        }
    }
    Token.findOne({tokenId: payload.id})
        .exec()
        .then((token) => {
            if (token === null) {
                throw new Error('Invalid token')
            }
            return updateTokens(token.userId)
        })
        .then(tokens => res.json(tokens))
        .catch(err => res.status(400).json(err))
}

export const login = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
        .exec()
        .then((user) => {
            if (!user) {
                res.status(401).json({message: 'User does not exis'});
            }
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                updateTokens(user._id).then(tokens => res.json(tokens))
            }
        })
        .catch(err => res.status(500).json(err))
}





