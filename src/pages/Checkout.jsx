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
    selectedCar,
    resetBooking
 } = React.useContext(BookingContext)



if(!selectedCar) {
    return <Navigate to="/" replace />
}

const totalPrice = selectedCar.pricePerDay * totalDays

const [cardNumber, setCardNumber] = React.useState("")
const [expiry, setExpiry] = React.useState("")
const [cvv, setCvv] = React.useState("")
const [name, setName] = React.useState("")
const [upi, setUpi] = React.useState("")

const [loading, setLoading] = React.useState(false)
const navigate = useNavigate()

function handlePayment(e) {
    e.preventDefault()

    if((!cardNumber || !expiry || !cvv || !name) && !upi) {
        alert("Enter Card details or UPI ID")
        return
    }

    setLoading(true)

    setTimeout(() => {
        setLoading(false)
        resetBooking()
        navigate("/payment-success")

    }, 2000);
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
        <img src={selectedCar.image}
             alt= {selectedCar.model}
             style = {{width : "250px", height : "160px", objectFit : "cover"}}
             />
        <p>{selectedCar.model}</p>
        <p>{selectedCar.pricePerDay} / day</p>

        <hr/>

        <h2>Total: ₹{totalPrice}</h2>

        <button>Confirm Booking</button>

        <h3>Payment Details</h3>

        <form onSubmit={handlePayment}>

            <input 
            type="text" 
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            />
            
            <input
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            />

            <input
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            />

            <input
            placeholder="Card Holder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <p>OR</p>

            <input
            type="text"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Processing" : "Pay Now"}
            </button>

        </form>
    </div>
)

}