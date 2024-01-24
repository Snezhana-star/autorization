// const users = require('../../app/controllers/AuthController.js');
//
// module.exports = (app) => {
//     app.get('/users', users.getAllUsers);
//     app.post('/users', users.register);
// }

import {Router} from "express";
import AuthController from "../../app/controllers/AuthController.js";
const router = new Router()

router.get('/users', AuthController.getAllUsers)
router.post('/register', AuthController.register)
// router.post('/login')

export default router;
