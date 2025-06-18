import mongoose, { model } from "mongoose";

const orderSchema = mongoose.Schema({
    "userName":{
        type:String,
        required:true,
    },
    "phone":{
        type:String,
        required:true,
    },
    "food":{
        type:Array,
        required:true,
    },
    "payment":{
        type:String,
        required:true,
    },
    "amount":{
        type:Number,
        required:true,
    },
    "additional":{
        type:"String",
        required:false,
    }
})

const Order = new mongoose.model("order",orderSchema)
export default Order