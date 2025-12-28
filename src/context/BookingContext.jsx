import React from "react"

const BookingContext = React.createContext()

export function BookingProvider({children}){

    const [pickupCity, setPickupCity] = React.useState("")
    const [dropCity, setDropCity] = React.useState("")
    const [startDate, setStartDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("")

    return (
        <BookingContext.Provider
        value={{
            pickupCity,
            setPickupCity,
            dropCity,
            setDropCity,
            startDate,
            setStartDate,
            endDate,
            setEndDate
        }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContext