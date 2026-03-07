import mongoose from "mongoose";

const carSchema = new mongoose.Schema({

    model: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    pricePerDay: {
        type: Number,
        required: true
    },

    image: {
        type: String   // file path from multer
    },

    isDeleted : {
        type : Boolean,
        default : false
    }

})

export default mongoose.model("Car", carSchema)