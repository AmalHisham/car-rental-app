import React from "react";
import { useParams } from "react-router-dom";
import { getBookingsByUser } from "../../services/bookingService";

export default function UserDetails() {

    const {id} = useParams()
    const [bookings, setBookings] = React.useState([])

    React.useEffect(() => {
        getBookingsByUser(id).then(setBookings)
    },[id])

    return (

        <>

        <h2>User Bookings</h2>

        {bookings.length === 0 &&  <p>No Bookings</p>}

        {bookings.map(b => (
        <div key={b.id} style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}>
          <p><b>Car:</b> {b.car.model}</p>
          <p><b>Route:</b> {b.pickupCity} → {b.dropCity}</p>
          <p><b>Duration:</b> {b.startDate} - {b.endDate}</p>
          <p><b>Total:</b> ₹{b.totalPrice}</p>
          <p><b>Payment:</b> {b.payment.status} ({b.payment.method})</p>
          <p><b>Status:</b> {b.bookingStatus}</p>
        </div>
      ))}
    
        </>
    )

    
}