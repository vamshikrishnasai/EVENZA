const mongoose = require('mongoose');

const bookingSchema=new mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Events",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    selectedSeats:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["pending","completed"],
        default:"pending",
    },
    bookingStatus:{
        type:String,
        enum:["confirmed","cancelled"],
        default:"confirmed",
    },
    bookingDate:{
        type:Date,
        default:Date.now,
    },
});

const bookingModel=mongoose.model("Bookings",bookingSchema);
module.exports=bookingModel;