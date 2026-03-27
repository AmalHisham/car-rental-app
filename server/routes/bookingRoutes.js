import express from "express"
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingsByUserId,
  cancelBooking
} from "../controllers/bookingController.js"



import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()



router.post("/", authMiddleware, createBooking)

router.get("/user", authMiddleware, getUserBookings)

router.get("/", authMiddleware, getAllBookings)

router.get("/admin/user/:userId", authMiddleware, getBookingsByUserId)

router.patch("/:id/cancel", authMiddleware, cancelBooking)



export default router