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

