import React from "react"
import BookingContext from "../context/BookingContext"
import { Navigate, useNavigate } from "react-router-dom"
import "./Checkout.css"

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

  if (!selectedCar) {
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

    if ((!cardNumber || !expiry || !cvv || !name) && !upi) {
      alert("Enter Card details or UPI ID")
      return
    }

    setLoading(true)

    setTimeout(() => {
      resetBooking()
      navigate("/payment-success")
    }, 2000)
  }

  return (
    <div className="page">
      <h2>Checkout</h2>

      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-summary">
          <h3>Booking Details</h3>
          <p>{pickupCity} → {dropCity}</p>
          <p>{startDate} to {endDate}</p>
          <p>{totalDays} days</p>

          <hr />

          <h3>Car</h3>
          <img src={selectedCar.image} alt={selectedCar.model} />
          <p>{selectedCar.model}</p>
          <p>₹{selectedCar.pricePerDay} / day</p>

          <hr />

          <h2>Total: ₹{totalPrice}</h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-payment">
          <h3>Payment Details</h3>

          <form onSubmit={handlePayment}>
            <input
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

            <p style={{ textAlign: "center" }}>OR</p>

            <input
              placeholder="UPI ID"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
