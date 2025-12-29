import React from "react"
import CitySearch from "../components/common/citySearch"
import BookingContext from "../context/BookingContext"
import SearchForm from "../components/booking/SearchForm"
import "./Cars.css"
import CarCard from "../components/cars/CarCard"
import carsData from "../data/carsData"

export default function Cars() {

  const {
    pickupCity,
    setPickupCity,
    dropCity,
    setDropCity,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = React.useContext(BookingContext)

  return (
    <div className="page">

      <div className="booking-container">

        <h2 className="booking-title">Booking Details</h2>

        <div className="booking-grid">

          <div className="booking-field">
            <CitySearch label="Pickup city" onSelectCity={setPickupCity} />
            {pickupCity && (
              <span className="selected-text">
                Selected: {pickupCity}
              </span>
            )}
          </div>

          <div className="booking-field">
            <CitySearch label="Drop city" onSelectCity={setDropCity} />
            {dropCity && (
              <span className="selected-text">
                Selected: {dropCity}
              </span>
            )}
          </div>

          <div className="booking-field">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="booking-field">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

        </div>

        <div className="search-btn">
          <SearchForm />
        </div>

      </div>

      {/* <h1>Available Cars</h1> {carsData.map((item) => <CarCard key = {item.id} car = {item}/>)} */}
    </div>
  )
}

