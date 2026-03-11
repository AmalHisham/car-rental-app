import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import asyncHandler from "../middleware/asyncHandler.js"
import { registerSchema, loginSchema } from "../validators/authValidator.js"



export const register = asyncHandler(async (req,res)=>{

  const { error } = registerSchema.validate(req.body)

  if(error){
    throw new Error(error.details[0].message)
  }

  const { username,email,password } = req.body

  const existingUser = await User.findOne({email})

  if(existingUser){
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password,10)

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  res.status(201).json({
    message:"User registered successfully"
  })

})



export const login = asyncHandler(async (req,res)=>{

  const { error } = loginSchema.validate(req.body)

  if(error){
    throw new Error(error.details[0].message)
  }

  const { email,password } = req.body

  const user = await User.findOne({email}).select("+password")

  if(!user){
    throw new Error("Invalid email or password")
  }

  if(user.isDeleted){
    throw new Error("Account deleted")
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    throw new Error("Invalid email or password")
  }

  const token = jwt.sign(
    { id:user._id },
    process.env.JWT_SECRET,
    { expiresIn:"7d" }
  )

  res.json({
    token,
    user:{
      id:user._id,
      username:user.username,
      email:user.email,
      profileImg:user.profileImg
    }
  })

})