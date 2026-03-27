import React from "react"

const BookingContext = React.createContext()

export function BookingProvider({ children }) {

  // ✅ Load from localStorage initially
  const [pickupCity, setPickupCity] = React.useState(
    localStorage.getItem("pickupCity") || ""
  )

  const [dropCity, setDropCity] = React.useState(
    localStorage.getItem("dropCity") || ""
  )

  const [startDate, setStartDate] = React.useState(
    localStorage.getItem("startDate") || ""
  )

  const [endDate, setEndDate] = React.useState(
    localStorage.getItem("endDate") || ""
  )

  const [selectedCar, setSelectedCar] = React.useState(
    JSON.parse(localStorage.getItem("selectedCar")) || null
  )

  // ✅ Calculate totalDays
  const totalDays = React.useMemo(() => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)

    const diff = end - start
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0
  }, [startDate, endDate])

  // ✅ Save to localStorage whenever values change
  React.useEffect(() => {
    localStorage.setItem("pickupCity", pickupCity)
    localStorage.setItem("dropCity", dropCity)
    localStorage.setItem("startDate", startDate)
    localStorage.setItem("endDate", endDate)
  }, [pickupCity, dropCity, startDate, endDate])

  React.useEffect(() => {
    if (selectedCar) {
      localStorage.setItem("selectedCar", JSON.stringify(selectedCar))
    }
  }, [selectedCar])

  const isBookingValid =
    !!pickupCity &&
    !!dropCity &&
    !!startDate &&
    !!endDate &&
    totalDays > 0

  // ✅ Reset + clear storage
  function resetBooking() {
    setPickupCity("")
    setDropCity("")
    setStartDate("")
    setEndDate("")
    setSelectedCar(null)

    localStorage.removeItem("pickupCity")
    localStorage.removeItem("dropCity")
    localStorage.removeItem("startDate")
    localStorage.removeItem("endDate")
    localStorage.removeItem("selectedCar")
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
        resetBooking,
        selectedCar,
        setSelectedCar,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export default BookingContext