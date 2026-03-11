import express from "express"
import {
  createBooking,
  getUserBookings,
  getAllBookings
} from "../controllers/bookingController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()



router.post("/", authMiddleware, createBooking)

router.get("/user", authMiddleware, getUserBookings)

router.get("/", authMiddleware, getAllBookings)



export default router