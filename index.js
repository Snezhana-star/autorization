import express from 'express'
// import mongoose from 'mongoose';
// import config from './config/app.js'
import router from './routes/api/authRoute.js'
import start from './config/db.js'

export const app = express()
app.use(express.json())
app.use('/api/auth', router)
start()
// async function startApp() {
//     try {
//         await mongoose.connect(config.mongoUrl)
//         app.listen(config.appPort, () => console.log('Сервер запущен на ' + config.appPort + ' порту'))
//
//     } catch (error) {
//         console.log(error)
//     }
// }

