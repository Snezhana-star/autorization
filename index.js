import express from 'express'
import mongoose from 'mongoose';
import User from "./User.js";
const PORT = 5000;
const DB_URL = 'mongodb+srv://cnega2002:Cne11051820@cluster0.fo5zlbj.mongodb.net/?retryWrites=true&w=majority'
const app = express()
app.use(express.json())
app.get('/',async (req, res) => {
    const {name, email} = req.body
    const user = await User.create({name, email})
    res.status(200).json('Сервер работаетc')

})
async function startApp(){
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, ()=> console.log('Сервер запущен на ' + PORT + ' порту'))

    }
    catch (error){
        console.log(error)
    }
}
startApp()