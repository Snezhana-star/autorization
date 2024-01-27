import {Router} from "express";
import * as AuthController from "../../app/controllers/AuthController.js"
import {authMiddleware} from "../../app/middleware/auth.js";



const router = new Router()

router.get('/users',authMiddleware, AuthController.getAllUsers)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-tokens', AuthController.refreshTokens)

export default router;
