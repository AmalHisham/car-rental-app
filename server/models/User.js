import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    minlength: 3
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  profileImg: {
    type: String,
    default: null
  },

  profileThumbImg: {
    type: String,
    default: null
  },

  accountCreatedDate: {
    type: Date,
    default: Date.now
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

})

export default mongoose.model("User", userSchema)