import Booking from "../models/Booking.js"
import Car from "../models/Car.js"


export const createBooking = async (req,res)=>{

  try{

    const { carId, pickupCity, dropCity, startDate, endDate, paymentMethod } = req.body

    const car = await Car.findById(carId)

    if(!car || car.isDeleted){
      return res.status(400).json({
        message:"Car not available"
      })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if(end <= start){
      return res.status(400).json({
        message:"Invalid booking dates"
      })
    }

    // 🔴 CHECK FOR DATE CONFLICT
    const existingBooking = await Booking.findOne({
      carId,
      bookingStatus: "CONFIRMED",
      startDate: { $lte: end },
      endDate: { $gte: start }
    })

    if(existingBooking){
      return res.status(400).json({
        message:"Car already booked for selected dates"
      })
    }

    const totalDays =
      Math.ceil((end - start) / (1000*60*60*24))

    const totalPrice = totalDays * car.pricePerDay

    const booking = new Booking({

      userId: req.user._id,
      userName: req.user.username,
      userEmail: req.user.email,

      carId,

      pickupCity,
      dropCity,

      startDate,
      endDate,

      totalDays,
      totalPrice,

      payment:{
        method: paymentMethod
      }

    })

    await booking.save()

    res.status(201).json(booking)

  }catch(err){

    res.status(500).json({message:err.message})

  }

}



export const getUserBookings = async (req,res)=>{

  try{

    const bookings = await Booking.find({
      userId:req.user._id
    }).populate("carId")

    res.json(bookings)

  }catch(err){

    res.status(500).json({message:err.message})

  }

}



export const getAllBookings = async (req,res)=>{

  try{

    const bookings = await Booking.find()
      .populate("carId")
      .populate("userId","username email")

    res.json(bookings)

  }catch(err){

    res.status(500).json({message:err.message})

  }

}

export const getBookingsByUserId = async (req,res)=>{

  try{

    const { userId } = req.params

    const bookings = await Booking.find({
      userId: userId
    }).populate("carId")

    res.json(bookings)

  }catch(err){

    res.status(500).json({message:err.message})

  }

}

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params

    const booking = await Booking.findById(id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // ✅ Only owner can cancel
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    // ✅ Prevent re-cancel
    if (booking.bookingStatus === "CANCELLED") {
      return res.status(400).json({ message: "Booking already cancelled" })
    }

    booking.bookingStatus = "CANCELLED"

    await booking.save()

    res.json({ message: "Booking cancelled successfully", booking })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}