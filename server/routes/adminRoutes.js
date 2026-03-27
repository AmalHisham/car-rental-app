import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

import {
  getAllUsers,
  getUserById
} from "../controllers/adminController.js"

const router = express.Router()

router.get("/users", authMiddleware, adminMiddleware, getAllUsers)

router.get("/users/:id", authMiddleware, adminMiddleware, getUserById)

export default router