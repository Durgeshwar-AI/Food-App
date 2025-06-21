import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    "name":{
        type:String,
        required: true,
    },
    "email":{
        type:String,
        required: true,
        unique:true,
    },
    "password":{
        type:String,
        required: true,
    },
    "phone":{
        type:String,
        required:true,
        unique:true
    }
})

const User = new mongoose.model("user",UserSchema);
export default User