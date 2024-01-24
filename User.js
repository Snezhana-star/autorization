import mongoose from 'mongoose';


const User = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxLength: 255},
    surname: {type: String, required: true, minlength: 2, maxLength: 255},
    middlename: {type: String, required: false, minlength: 2, maxLength: 255},
    email: {type: String, required: true, minlength: 2, maxLength: 255},
    username: {type: String, required: false, minlength: 2, maxLength: 15},
    password: {type: String, required: true,},
    is_confirmed : {type:Boolean, default:false}
})

export default mongoose.model('User',User)