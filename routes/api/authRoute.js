import {Router} from "express";
import AuthController from "../../app/controllers/AuthController.js";
const router = new Router()

router.get('/users', AuthController.getAllUsers)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

export default router;
