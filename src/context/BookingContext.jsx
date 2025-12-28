import React from "react"

const BookingContext = React.createContext()

export function BookingProvider({children}){

    const [pickupCity, setPickupCity] = React.useState("")
    const [dropCity, setDropCity] = React.useState("")
    const [startDate, setStartDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("")

    const totalDays = React.useMemo(() => {
        if (!startDate || !endDate) return 0

        const start = new Date(startDate)
        const end = new Date(endDate)

        const diff = end - start
        return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0
    }, [startDate, endDate])


    const isBookingValid =
        pickupCity &&
        dropCity &&
        startDate &&
        endDate &&
        totalDays > 0

    
    function resetBooking() {
        setPickupCity("")
        setDropCity("")
        setStartDate("")
        setEndDate("")
    }
    

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
            setEndDate,
            totalDays,
            isBookingValid,
            resetBooking
        }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContext