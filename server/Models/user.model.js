import mongoose from "mongoose"
import jwt from "jsonwebtoken"

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

UserSchema.methods.generateAuthToken = function () {
  const payload = { _id: this._id, email: this.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

const User = new mongoose.model("user",UserSchema);
export default User