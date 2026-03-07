import express from 'express'
import {getCars, addCar} from "../controllers/carController.js"


const router = express.Router()

router.get("/", getCars)

router.post("/", upload.single("image"), addCar)

export default router
