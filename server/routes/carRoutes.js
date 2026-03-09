import express from 'express'
import {getCars, addCar, deleteCar, getCarById, updateCar} from "../controllers/carController.js"
import upload from "../middleware/upload.js"


const router = express.Router()

router.get("/", getCars)

router.post("/", upload.single("image"), addCar)

router.delete("/:id", deleteCar)

router.get("/:id", getCarById)

router.put("/:id", upload.single("image"), updateCar)

export default router
