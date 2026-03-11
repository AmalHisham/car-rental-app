import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  userName:{
    type:String
  },

  userEmail:{
    type:String
  },

  carId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Car",
    required:true
  },

  pickupCity:{
    type:String,
    required:true
  },

  dropCity:{
    type:String,
    required:true
  },

  startDate:{
    type:Date,
    required:true
  },

  endDate:{
    type:Date,
    required:true
  },

  totalDays:{
    type:Number
  },

  totalPrice:{
    type:Number
  },

  payment:{
    method:{
      type:String
    },
    status:{
      type:String,
      default:"SUCCESS"
    },
    paidAt:{
      type:Date,
      default:Date.now
    }
  },

  bookingStatus:{
    type:String,
    default:"CONFIRMED"
  }

},{timestamps:true})

export default mongoose.model("Booking",bookingSchema)