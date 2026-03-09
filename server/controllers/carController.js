import Car from "../models/Car.js"

export const getCars = async (req,res) => {

    const cars = await Car.find({isDeleted : false})

    res.json(cars)
}

export const addCar = async (req,res) => {

    try {


        const car = new Car({
            model : req.body.model,
            type : req.body.type,
            pricePerDay : req.body.pricePerDay,
            image : req.file.filename
        })

        await car.save()

        res.status(201).json(car)
    }

    catch(err) {

        res.status(500).json({message : err.message})
    }

}

export const deleteCar = async (req,res) => {

    try {

        await Car.findByIdAndUpdate(req.params.id , {isDeleted : true})
        res.json({message : "Car deleted Successfully"})
    }

    catch(err) {
        res.status(500).json({message : err.message})
    }    
} 

export const getCarById = async (req,res) => {

    try {

        const car = await Car.findById(req.params.id)
        res.json(car)
    }

    catch(err) {

        res.status(500).json({message : err.message})
    }
}

export const updateCar = async (req,res) => {

    console.log(req.body)
    console.log(req.file)

    try {

        const updateData = {
            model : req.body.model,
            type : req.body.type,
            pricePerDay : req.body.pricePerDay
        }

        if(req.file) {
            updateData.image = req.file.filename
        }

        const car = await Car.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new : true}
        )

        res.json(car)
    }

    catch(err) {
        res.status(500).json({message : err.message})
    }
}