import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
import BookingContext from "../context/BookingContext"
import { createBooking } from "../services/bookingService";
import AuthContext from "../context/AuthContext"
import "./Checkout.css"

/* helpers for bookings storage */
function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || []
}

function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings))
}

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

  const { user } = React.useContext(AuthContext)
  const navigate = useNavigate()

  if (!selectedCar) {
    return <Navigate to="/" replace />
  }

  const totalPrice = selectedCar.pricePerDay * totalDays

  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvv, setCvv] = React.useState("")
  const [cardName, setCardName] = React.useState("")
  const [upi, setUpi] = React.useState("")
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [loading, setLoading] = React.useState(false)

  function handlePayment(e) {
    e.preventDefault()

    if (
      paymentMethod === "card" &&
      (!cardNumber || !expiry || !cvv || !cardName)
    ) {
      alert("Please enter all card details")
      return
    }

    if (paymentMethod === "upi" && !upi) {
      alert("Please enter UPI ID")
      return
    }

    setLoading(true)

    setTimeout(async () => {
      const booking = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
    
        car: selectedCar,
        pickupCity,
        dropCity,
        startDate,
        endDate,
        totalDays,
        totalPrice,
    
        payment: {
          method: paymentMethod.toUpperCase(),
          status: "SUCCESS",
          paidAt: new Date().toISOString(),
        },
    
        bookingStatus: "CONFIRMED",
        createdAt: new Date().toISOString(),
      };
    
      await createBooking(booking);
    
      resetBooking();
      navigate("/payment-success");
    }, 2000);
  }




  return (
    <div className="page">
      <div className="container">
        <div className="checkout-header">
          <h1 className="checkout-title">Complete Your Booking</h1>
          <div className="secure-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="checkout-container">
          {/* Booking Summary */}
          <div className="checkout-summary">
            <div className="summary-section">
              <h3 className="section-heading">Trip Details</h3>
              <div className="trip-info-checkout">
                <div className="info-row">
                  <div className="info-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="10" r="3"/>
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                    </svg>
                    <span>Route</span>
                  </div>
                  <div className="info-value">{pickupCity} → {dropCity}</div>
                </div>

                <div className="info-row">
                  <div className="info-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>Duration</span>
                  </div>
                  <div className="info-value">{startDate} - {endDate}</div>
                </div>

                <div className="info-row">
                  <div className="info-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>Total Days</span>
                  </div>
                  <div className="info-value-highlight">{totalDays} {totalDays === 1 ? 'day' : 'days'}</div>
                </div>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-section">
              <h3 className="section-heading">Selected Vehicle</h3>
              <div className="car-summary">
                <div className="car-image-checkout">
                  <img src={selectedCar.image} alt={selectedCar.model} />
                </div>
                <div className="car-info-checkout">
                  <h4 className="car-name">{selectedCar.model}</h4>
                  <div className="car-price-info">
                    <span className="price-per-day">₹{selectedCar.pricePerDay} / day</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-section">
              <h3 className="section-heading">Price Breakdown</h3>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Car rental ({totalDays} {totalDays === 1 ? 'day' : 'days'})</span>
                  <span>₹{selectedCar.pricePerDay * totalDays}</span>
                </div>
                <div className="price-row">
                  <span>Service fee</span>
                  <span className="free-badge">Free</span>
                </div>
              </div>
            </div>

            <div className="total-section">
              <div className="total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="checkout-payment">
            <h3 className="section-heading">Payment Method</h3>

            <div className="payment-method-tabs">
              <button
                className={`method-tab ${paymentMethod === "card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("card")}
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <span>Card</span>
              </button>
              <button
                className={`method-tab ${paymentMethod === "upi" ? "active" : ""}`}
                onClick={() => setPaymentMethod("upi")}
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>UPI</span>
              </button>
            </div>

            <form onSubmit={handlePayment} className="payment-form">
              {paymentMethod === "card" && (
                <div className="card-form">
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <div className="input-with-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="form-input"
                        maxLength="19"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="form-input"
                        maxLength="5"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="form-input"
                        maxLength="3"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <div className="input-with-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="upi-form">
                  <div className="form-group">
                    <label className="form-label">UPI ID</label>
                    <div className="input-with-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="upi-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span>You'll be redirected to your UPI app to complete the payment</span>
                  </div>
                </div>
              )}

              <button type="submit" className="pay-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>Pay ₹{totalPrice}</span>
                  </>
                )}
              </button>
            </form>

            <div className="security-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}