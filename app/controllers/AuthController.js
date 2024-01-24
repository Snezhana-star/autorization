import User from '../models/User.js'

// для проверки
class AuthController {
    getAllUsers(req, res) {
        User.find()
            .exec()
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    }

    register(req, res) {
        User.create(req.body)
            .then(createdUser => res.json(createdUser))
            .catch(err => res.status(500).json(err));
    };
}

// const getAllUsers = (req, res) => {
//     User.find()
//         .exec()
//         .then(users => res.json(users))
//         .catch(err => res.status(500).json(err));
// };

// const login = (req, res) => {
//     User.create(req.body)
//         .then(createdUser => res.json(createdUser))
//         .catch(err => res.status(500).json(err));
// };
export default new AuthController();