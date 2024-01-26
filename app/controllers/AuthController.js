import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "../../config/app.js";
// список всех пользователей для проверки
class AuthController {
    getAllUsers(req, res) {
        User.find()
            .exec()
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    }

    register(req, res) {
        const {name, surname, middlename, email, username, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 7)
        User.create({name, surname, middlename, email, username, password: hashPassword})
            .then(createdUser => res.json(createdUser))
            .catch(err => res.status(500).json(err));
    };

    login(req, res) {
        const {email, password} = req.body;
        User.findOne({email})
            .exec()
            .then((user) => {
                if (!user) {
                    res.status(401).json({message: 'User does not exis'});
                }
                const passwordIsValid = bcrypt.compareSync(password, user.password);
                if (passwordIsValid) {
                    const token = jwt.sign(user._id.toString(), config.jwtSecret);
                    res.json({token});
                }
            })
            .catch(err => res.status(500).json(err))
    };
}


export default new AuthController();