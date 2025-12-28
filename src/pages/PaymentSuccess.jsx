import { Link } from "react-router-dom"
import "./PaymentSuccess.css"

export default function PaymentSuccess() {
  return (
    <div className="success-container">
      <h2>✅ Payment Successful</h2>
      <p>Your booking has been confirmed.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  )
}
