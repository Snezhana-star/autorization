import express from 'express'
import router from './routes/api/authRoute.js'
import start from './config/db.js'


export const app = express()
app.use(express.json())
app.use('/api/auth', router)
start()

