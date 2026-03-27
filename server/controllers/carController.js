import Car from "../models/Car.js"

// 🔍 GET ALL CARS (Search + Filter)
export const getCars = async (req, res) => {
  try {
    const { search, type } = req.query;

    const filter = {
      isDeleted: false,
      ...(search && { model: { $regex: search, $options: "i" } }),
      ...(type && type !== "ALL" && { type })
    };

    const cars = await Car.find(filter);

    res.json(cars);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ➕ ADD CAR
export const addCar = async (req, res) => {
  try {
    const car = new Car({
      model: req.body.model,
      type: req.body.type,
      pricePerDay: req.body.pricePerDay,
      image: req.file ? req.file.filename : null // ✅ safe fallback
    });

    await car.save();

    res.status(201).json(car);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ❌ DELETE CAR (Soft Delete)
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully", car });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🚗 GET CARS BY TYPE
export const getCarsByType = async (req, res) => {
  try {
    const cars = await Car.find({
      type: req.params.typename,
      isDeleted: false
    });

    res.json(cars);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔎 GET CAR BY ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car || car.isDeleted) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✏️ UPDATE CAR
export const updateCar = async (req, res) => {
  try {
    const updateData = {
      model: req.body.model,
      type: req.body.type,
      pricePerDay: req.body.pricePerDay,
      ...(req.file && { image: req.file.filename }) // ✅ clean conditional
    };

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};