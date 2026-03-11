import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

import carRoutes from "./routes/carRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"

import { errorHandler } from "./middleware/errorMiddleware.js"



dotenv.config()
connectDB()

const app = express()

app.use("/uploads", express.static("uploads"))

app.use(cors())
app.use(express.json())

app.use("/api/cars", carRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/bookings", bookingRoutes)

app.use(errorHandler)

app.get("/", (req,res)=>{
    res.send("API Running")
})

const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})