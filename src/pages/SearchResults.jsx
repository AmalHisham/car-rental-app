import React from "react"
import BookingContext from "../context/BookingContext"
import carsData from "../data/carsData"

export default function SearchResults() {
  const {
    pickupCity,
    dropCity,
    startDate,
    endDate,
    totalDays
  } = React.useContext(BookingContext)

  return (
    <div>
      <h2>Available Cars</h2>

      <p>{pickupCity} → {dropCity}</p>
      <p>{startDate} to {endDate} ({totalDays} days)</p>

      <hr />

      {carsData.map(car => (
        <div key={car.id}>
          <img src={car.image}
             alt= {car.model}
             style = {{width : "250px", height : "160px", objectFit : "cover"}}
             />
          <h3>{car.model}</h3>
          <p>₹{car.pricePerDay} / day</p>
          <p>Total: ₹{car.pricePerDay * totalDays}</p>
          <button>Select</button>
        </div>
      ))}
    </div>
  )
}
