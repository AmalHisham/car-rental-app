import React from "react";
import BookingContext from "../context/BookingContext";
import { Navigate, replace, useNavigate } from "react-router-dom";

export default function Checkout() {

 const {
    pickupCity,
    dropCity,
    startDate,
    endDate,
    totalDays,
    selectedCar
 } = React.useContext(BookingContext)

const totalPrice = selectedCar.pricePerDay * totalDays

if(!selectedCar) {
    return <Navigate to="/" replace />
}

return (
    <div>
        <h2>Checkout</h2>

        <h3>Booking details</h3>

        <p>{pickupCity} → {dropCity}</p>
        <p>{startDate} to {endDate}</p>
        <p>{totalDays} days</p>

        <hr/>

        <h3>Car</h3>
        <p>{selectedCar.model}</p>
        <p>{selectedCar.pricePerDay} / day</p>

        <hr/>

        <h2>Total: ₹{totalPrice}</h2>

        <button>Confirm Booking</button>
    </div>
)

}