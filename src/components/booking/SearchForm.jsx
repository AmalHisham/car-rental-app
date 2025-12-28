import React from "react"
import BookingContext from "../../context/BookingContext"
import { useNavigate } from "react-router-dom"

export default function SearchForm() {

    const {isBookingValid} = React.useContext(BookingContext)
    const navigate = useNavigate()

    function handleSearch() {
        navigate("/search-results")
    }

    return (
        <div>
            <button onClick={handleSearch} disabled={!isBookingValid}>Search</button>
        </div>
    )
}