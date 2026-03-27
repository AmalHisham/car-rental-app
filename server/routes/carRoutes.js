import express from 'express'
import {
  getCars,
  addCar,
  deleteCar,
  getCarById,
  updateCar,
  getCarsByType
} from "../controllers/carController.js"

import upload from "../middleware/upload.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

const router = express.Router()

// Public routes
router.get("/", getCars)
router.get("/type/:typename", getCarsByType)
router.get("/:id", getCarById)

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), addCar)
router.delete("/:id", authMiddleware, adminMiddleware, deleteCar)
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), updateCar)

export default router