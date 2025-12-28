import { Link } from "react-router-dom"

export default function PaymentSuccess() {

    return (
        <>
        <h2> ✅ Payment Succesfull</h2>
        <p>Your booking has been confirmed.</p>
        <Link to="/">Go back to Home</Link>
        </>
    )
}