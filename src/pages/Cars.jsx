import React from "react"
import CarCard from "../components/cars/carCard"
import CitySearch from "../components/common/citySearch"
import carsData from "../data/carsData"
import BookingContext from "../context/BookingContext"
import SearchForm from "../components/booking/SearchForm"

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
      } = React.useContext(BookingContext);
      

    return (
        <div>
            <h2>Booking Details</h2>

            <div>
                <CitySearch label = "Pickup city" onSelectCity={setPickupCity}/>
                <p>Selected: {pickupCity}</p>
            </div>

            <div>
                <CitySearch label = "Drop city" onSelectCity={setDropCity}/>
                <p>Selected: {dropCity}</p>
            </div>

            <div>
                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div>
                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
             
            
            <SearchForm/>

            {/* <h1>Available Cars</h1>
            {carsData.map((item) => <CarCard key = {item.id} car = {item}/>)} */}

        </div>

    )
}