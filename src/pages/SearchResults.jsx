import React from "react"
import BookingContext from "../context/BookingContext"
import carsData from "../data/carsData"
import { useNavigate } from "react-router-dom"

import "./SearchResults.css"   

export default function SearchResults() {
  const {
    pickupCity,
    dropCity,
    startDate,
    endDate,
    totalDays,
    setSelectedCar
  } = React.useContext(BookingContext)

  const [query, setQuery] = React.useState("")

  const filteredCars = carsData.filter((car) => 
      car.model.toLowerCase().includes(query.toLowerCase()) )


  const navigate = useNavigate()

  return (
    <div className="page">
      <h2 className="search-title">Available Cars</h2>

      <p>{pickupCity} → {dropCity}</p>
      <p>{startDate} to {endDate} ({totalDays} days)</p>

      <hr />

      <input
      type="text"
      placeholder="Search by model"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="car-search"
      />

      
      
      <div className="cars-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.model} />

            <h3>{car.model}</h3>
            <p>₹{car.pricePerDay} / day</p>
            <p>Total: ₹{car.pricePerDay * totalDays}</p>

            <button
              onClick={() => {
                setSelectedCar(car)
                navigate("/checkout")
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
