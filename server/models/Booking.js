import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    carId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Car"
    },

    pickupCity:String,
    dropCity:String,

    startDate:Date,
    endDate:Date,

    totalDays:Number,
    totalPrice:Number,

    payment:{
        method:String,
        status:String,
        paidAt:Date
    },

    bookingStatus:{
        type:String,
        default:"CONFIRMED"
    }

},
{timestamps:true}
)

export default mongoose.model("Booking", bookingSchema)