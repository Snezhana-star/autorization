import mongoose from "mongoose";
import config from "./app.js";
import {app} from '../index.js'

const start = async function startApp() {
    try {
        await mongoose.connect(config.mongoUrl)
        app.listen(config.appPort, () => console.log('Сервер запущен на ' + config.appPort + ' порту'))

    } catch (error) {
        console.log(error)
    }
}

export default start